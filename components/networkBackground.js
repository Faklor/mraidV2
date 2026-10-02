class NetworkBackground extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.timeSeconds = 0;
        this.lastFrameTime = 0;
        
        // === НАСТРОЙКИ МАТРИЦЫ ===
        this.config = {
            spacing: 95.16,           
            rotationX: -82.98,        
            rotationY: 45.72,         
            rotationZ: -3.6,          
            perspective: 496.8,       
            dotSize: 3,               
            lineOpacity: 0.4,         
            lineWidth: 1.5,           
            dotGlow: 21.15,              
            speed: 0.2,               // Базовая скорость (умножается внутри)
            
            offsetY: -100,            
            offsetX: -1000,           
            gridBuffer: 8             
        };

        this.resizeObserver = null;
        this.width = 0;
        this.height = 0;
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 0;
                    pointer-events: none;
                    background: #0D0D0F;
                    overflow: hidden;
                }
                canvas {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            </style>
            <canvas id="network-canvas"></canvas>
        `;

        this.canvas = this.shadowRoot.getElementById('network-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.initMatrix();
        this.startAnimation();
        
        this.resizeObserver = new ResizeObserver(() => {
            this.initMatrix();
        });
        this.resizeObserver.observe(this);
    }

    initMatrix() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.getBoundingClientRect();
        
        this.width = rect.width;
        this.height = rect.height;
        
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.scale(dpr, dpr);
    }

    project3D(x, y, z, centerX, centerY) {
        const radX = (this.config.rotationX * Math.PI) / 180;
        const radY = (this.config.rotationY * Math.PI) / 180;
        const radZ = (this.config.rotationZ * Math.PI) / 180;
        
        let y1 = y * Math.cos(radX) - z * Math.sin(radX);
        let z1 = z * Math.cos(radX) + y * Math.sin(radX);
        
        let x2 = x * Math.cos(radY) - z1 * Math.sin(radY);
        let z2 = z1 * Math.cos(radY) + x * Math.sin(radY);
        
        let x3 = x2 * Math.cos(radZ) - y1 * Math.sin(radZ);
        let y3 = y1 * Math.cos(radZ) + x2 * Math.sin(radZ);
        
        const scale = this.config.perspective / (this.config.perspective + z2);
        
        return {
            x: centerX + x3 * scale,
            y: centerY + y3 * scale,
            scale: scale,
            z: z2
        };
    }

    animate(timestamp = 0) {
        if (!this.ctx) return;
        
        const rawDelta = (timestamp - this.lastFrameTime) / 1000;
        this.lastFrameTime = timestamp;
        this.timeSeconds += rawDelta;
        
        const { ctx } = this;
        const w = this.width;
        const h = this.height;
        const centerX = w / 2;
        const centerY = h / 2;

        ctx.clearRect(0, 0, w, h);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const spacing = this.config.spacing;
        const buffer = this.config.gridBuffer;
        
        const cols = Math.ceil(w / spacing) + buffer;
        const rows = Math.ceil(h / spacing) + buffer;
        
        const gridWidth = cols * spacing;
        const gridHeight = rows * spacing;
        
        const offsetX = (w - gridWidth) / 2 + this.config.offsetX;
        const offsetY = (h - gridHeight) / 2 + this.config.offsetY; 
        
        const projectedPoints = [];

        // === ШАГ 1: ВЫЧИСЛЯЕМ ПОЗИЦИИ И АНИМАЦИЮ ===
        for (let row = 0; row < rows; row++) {
            projectedPoints[row] = [];
            for (let col = 0; col < cols; col++) {
                const x = offsetX + col * spacing;
                const y = offsetY + row * spacing;
                
                const projected = this.project3D(x, y, 0, centerX, centerY);
                
                if (projected.scale <= 0) {
                    projectedPoints[row][col] = null;
                    continue;
                }
                
                // Генерируем уникальные, но стабильные параметры для каждой точки
                const seed = row * 12.9898 + col * 78.233;
                const randomPhase = Math.abs(Math.sin(seed) * 43758.5453) % 1;
                
                // 1. ОЧЕНЬ МЕДЛЕННО и МАЛО (прыжок всего 3-8 пикселей)
                const randomSpeed = 0.08 + randomPhase * 0.12; // Очень медленно
                const randomAmp = 3 + randomPhase * 5;          // Амплитуда 3-8px
                
                const phase = this.timeSeconds * randomSpeed * 5 + randomPhase * Math.PI * 2;
                const lift = Math.sin(phase) * randomAmp * projected.scale;
                
                // 2. ЯРКОСТЬ и РАЗМЕР зависят от высоты (0 = самый низ, 1 = самый верх)
                const heightFactor = (Math.sin(phase) + 1) / 2; 
                
                const isHot = randomPhase > 0.85; // 15% точек "горячие"
                // Внизу тусклые (0.2), наверху яркие (0.6). Горячие еще ярче.
                const intensity = isHot ? (0.5 + 0.5 * heightFactor) : (0.2 + 0.4 * heightFactor);
                
                // Размер: внизу 70% от нормы, наверху 100%
                const sizeMult = 0.7 + (0.3 * heightFactor);
                
                projectedPoints[row][col] = {
                    x: projected.x,
                    y: projected.y + lift,
                    scale: projected.scale,
                    intensity: intensity,
                    sizeMult: sizeMult,
                    isHot: isHot
                };
            }
        }

        // === ШАГ 2: РИСУЕМ ЛИНИИ (с эффектом освещения от точек) ===
        ctx.lineWidth = this.config.lineWidth * 0.8;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const current = projectedPoints[row][col];
                if (!current || current.scale <= 0) continue;
                
                // Горизонтальная линия
                if (col < cols - 1 && projectedPoints[row][col + 1]) {
                    const next = projectedPoints[row][col + 1];
                    if (next && next.scale > 0) {
                        // Создаем градиент вдоль линии
                        const gradient = ctx.createLinearGradient(current.x, current.y, next.x, next.y);
                        
                        // Вычисляем "силу света" от каждой точки (0.2 - 1.0)
                        const lightA = current.intensity;
                        const lightB = next.intensity;
                        
                        // Начало линии (у точки A) - красное свечение
                        gradient.addColorStop(0, `rgba(255, 0, 52, ${0.15 + 0.5 * lightA})`);
                        // Середина линии - почти черная
                        gradient.addColorStop(0.5, `rgba(30, 30, 30, ${0.05 + 0.1 * ((lightA + lightB) / 2)})`);
                        // Конец линии (у точки B) - красное свечение
                        gradient.addColorStop(1, `rgba(255, 0, 52, ${0.15 + 0.5 * lightB})`);
                        
                        ctx.strokeStyle = gradient;
                        ctx.beginPath();
                        ctx.moveTo(current.x, current.y);
                        ctx.lineTo(next.x, next.y);
                        ctx.stroke();
                    }
                }
                
                // Вертикальная линия
                if (row < rows - 1 && projectedPoints[row + 1][col]) {
                    const next = projectedPoints[row + 1][col];
                    if (next && next.scale > 0) {
                        const gradient = ctx.createLinearGradient(current.x, current.y, next.x, next.y);
                        
                        const lightA = current.intensity;
                        const lightB = next.intensity;
                        
                        gradient.addColorStop(0, `rgba(255, 0, 52, ${0.15 + 0.5 * lightA})`);
                        gradient.addColorStop(0.5, `rgba(30, 30, 30, ${0.05 + 0.1 * ((lightA + lightB) / 2)})`);
                        gradient.addColorStop(1, `rgba(255, 0, 52, ${0.15 + 0.5 * lightB})`);
                        
                        ctx.strokeStyle = gradient;
                        ctx.beginPath();
                        ctx.moveTo(current.x, current.y);
                        ctx.lineTo(next.x, next.y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        // === ШАГ 3: РИСУЕМ ТОЧКИ (ПОВЕРХ линий, СУПЕР КРАСНЫЕ) ===
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const p = projectedPoints[row][col];
                if (!p || p.scale <= 0) continue;
                
                const baseSize = Math.max(0.1, this.config.dotSize * p.scale * p.sizeMult);
                const glow = Math.max(0.1, this.config.dotGlow * p.scale * p.intensity);
                
                // Градиент СУПЕР КРАСНОГО цвета
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
                if (p.isHot) {
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 * p.intensity})`); // Белое горячее ядро
                    gradient.addColorStop(0.2, `rgba(255, 50, 50, ${0.8 * p.intensity})`); // Ярко-красный
                    gradient.addColorStop(1, 'rgba(255, 0, 52, 0)');
                } else {
                    gradient.addColorStop(0, `rgba(255, 100, 100, ${0.6 * p.intensity})`); // Светло-красный центр
                    gradient.addColorStop(0.4, `rgba(255, 0, 52, ${0.3 * p.intensity})`); // Красный
                    gradient.addColorStop(1, 'rgba(255, 0, 52, 0)');
                }
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
                ctx.fill();
                
                // Маленькая белая точка в самом центре (эффект "горит")
                ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * p.intensity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, baseSize * 0.4, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        this.animationId = requestAnimationFrame((t) => this.animate(t));
    }

    startAnimation() {
        this.lastFrameTime = performance.now();
        this.animate();
    }

    // === ПУБЛИЧНЫЕ МЕТОДЫ (для UI панели) ===
    setSpacing(value) { this.config.spacing = Math.max(40, Math.min(300, value)); }
    setRotationX(value) { this.config.rotationX = value; }
    setRotationY(value) { this.config.rotationY = value; }
    setRotationZ(value) { this.config.rotationZ = value; }
    setPerspective(value) { this.config.perspective = Math.max(200, Math.min(2000, value)); }
    setGridBuffer(value) { this.config.gridBuffer = Math.max(2, Math.min(15, value)); }
    setOffsetY(value) { this.config.offsetY = value; }
    setOffsetX(value) { this.config.offsetX = value; }
    setLineWidth(value) { this.config.lineWidth = value; }

    disconnectedCallback() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        if (this.resizeObserver) this.resizeObserver.disconnect();
    }
}

customElements.define('network-background', NetworkBackground);