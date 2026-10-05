import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

class NetworkBackground extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.isPaused = false;
        this.time = 0;
        this.animationId = null;
        
        this.config = {
            spacing: 40,             
            rotationX: -60.48,          
            rotationY: 2.88,           
            rotationZ: -134.28,            
            dotSize: 36.729,              
            maxLift: 3,
            speed: 0.5,             
            
            offsetY: -200,             
            offsetX: -430,           
            gridWidth: 25,           
            gridHeight: 15,
            gridZ: -10,             
            
            lineWidth: 2,            
            lineBrightness: 1.5,     
            coreBrightness: 1.3,
            
            redGlowSize: 0.8,        
            redGlowIntensity: 1,  
            
            baseColor: '#da0404', 
            
            vignetteInner: 15,   // где начинается затемнение (0-100%)
            vignetteOuter: 65,   // где почти полностью тёмный (0-100%)
            vignetteFeather: 10, // плавность перехода (0-50%)

            phoneModelPath: 'assets/models/IPHONE-15-PRO-MAX.glb',
            phoneScale: 270.0,
            phonePosX: 16.4,
            phonePosY: 10,
            phonePosZ: 65,
            phoneRotX: 0,
            phoneRotY: -90,
            phoneRotZ: 0,
            
            cameraOffsetX: 0.06,
            cameraOffsetY: 0,
            cameraOffsetZ: 0,

            playableJsonUrl: 'https://dashboard.mraid.io/portfolio.json',
            inactivityTimeout: 30000,
            // frameWidth: 200,
            // frameHeight: 360,

            // frameWidth: 540,  
            // frameHeight: 980,
            frameWidth: 740,  
            frameHeight: 1180,

            screenOffsetX: 0,
            screenOffsetY: 0,
            screenOffsetZ: 0,
            
            statusBarHeight: 20,
            homeBarHeight: 25,
            uiOffsetZ: 0.02,
            uiGap: 17,  

            phoneAnimSpeedX: 0.1,
            phoneAnimSpeedY: 0.1,
            phoneAnimSpeedZ: 0.1,
            
            
            phoneAnimBiasX: 0,     // постоянный наклон вперёд
            phoneAnimBiasY: -20,   // постоянный поворот на бок
            phoneAnimBiasZ: 10,    // постоянный завал

            phoneAnimAmpX: 2,      // маленькие колебания (было 0)
            phoneAnimAmpY: 5,      // маленькие колебания (было -20!)
            phoneAnimAmpZ: 2,      // маленькие колебания (было 10)
        };

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.cssRenderer = null;
        this.points = null;
        this.lines = null;
        this.phoneModel = null;
        this.glassMesh = null;
        this.screenObject = null;
        this.statusBarObject = null;
        this.homeBarObject = null;
        this.playableIframe = null;
        this.loader = null;
        this.resizeObserver = null;
        
        this.linePositions = null;
        this.lineColors = null;
        this.phases = [];
        this.isHotArr = [];
        
        this.playablesData = [];
        this.inactivityTimer = null;
        this.currentPlayableUrl = '';
        
        this.screenN = null;
        this.screenUp = null;
        this.screenRight = null;
        this.screenLocalCenter = null;
        this.glassParentScale = null;
        this.screenW = 0;
        this.screenH = 0;
    }

    hexToRgb(hex) {
        if (!hex || typeof hex !== 'string') return { r: 0.9, g: 0.067, b: 0.125 };
        const cleanHex = hex.replace('#', '');
        if (cleanHex.length !== 6) return { r: 0.9, g: 0.067, b: 0.125 };
        return {
            r: parseInt(cleanHex.substring(0, 2), 16) / 255,
            g: parseInt(cleanHex.substring(2, 4), 16) / 255,
            b: parseInt(cleanHex.substring(4, 6), 16) / 255
        };
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
                    background: #0D0D0F;
                    overflow: hidden;
                }
                canvas {
                    display: block;
                    width: 100%;
                    height: 100%;
                    outline: none;
                }

                .vignette-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 5;
                    pointer-events: none;
                    background: radial-gradient(
                        ellipse at center,
                        transparent 0%,
                        transparent var(--vignette-inner, 25%),
                        rgba(13, 13, 15, 0.3) var(--vignette-mid1, 45%),
                        rgba(13, 13, 15, 0.7) var(--vignette-mid2, 65%),
                        rgba(13, 13, 15, 0.95) var(--vignette-outer, 85%),
                        #0D0D0F 100%
                    );
                }
                .screen-wrapper {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    background: transparent;
                    pointer-events: auto;
                }
                .screen-wrapper iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                    background: transparent;
                }
                .status-bar {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 16px 20px 0 20px;
                    box-sizing: border-box;
                    color: white;
                    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                    font-size: 10px;
                    font-weight: 300;
                    text-shadow: 0 0 10px rgba(0,0,0,0.8);
                    pointer-events: none;
                }
                .status-bar .time {
                    margin-left:10px;
                }
                .status-bar .icons {
                    display: flex;
                    gap: 3px;
                    align-items: center;
                    
                }
                
                

               .home-indicator {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                }
                .home-indicator .bar {
                    width: 50%;
                    height: 2px;
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 3px;
                    margin-bottom:10px;
                }
            </style>
            <canvas id="network-canvas"></canvas>
            <div class="vignette-overlay"></div>
        `;

        this.applyVignetteCSS();
        this.initThreeJS();
        this.createGrid();
        this.loadPhoneModel();
        this.loadPlayablesData();
        this.setupInteractionListeners();

        
        this.renderFrame();
        if (!this.isPaused) this.startAnimation();

        this.resizeObserver = new ResizeObserver(() => this.onResize());
        this.resizeObserver.observe(this);
    }

    setVignetteInner(v) { 
        this.config.vignetteInner = v; 
        this.applyVignetteCSS(); 
    }
    setVignetteOuter(v) { 
        this.config.vignetteOuter = v; 
        this.applyVignetteCSS(); 
    }
    setVignetteFeather(v) { 
        this.config.vignetteFeather = v; 
        this.applyVignetteCSS(); 
    }

    applyVignetteCSS() {
        const c = this.config;
        const inner = Math.max(0, c.vignetteInner);
        const outer = Math.min(100, c.vignetteOuter);
        const feather = c.vignetteFeather;
        
        const mid1 = Math.max(inner, outer - feather * 1.5);
        const mid2 = Math.min(outer, outer + feather * 0.5);
        
        this.style.setProperty('--vignette-inner', inner + '%');
        this.style.setProperty('--vignette-mid1', mid1 + '%');
        this.style.setProperty('--vignette-mid2', mid2 + '%');
        this.style.setProperty('--vignette-outer', outer + '%');
    }

    initThreeJS() {
        const canvas = this.shadowRoot.getElementById('network-canvas');
        const rect = this.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;

        this.scene = new THREE.Scene();
        const bgColor = new THREE.Color('#0D0D0F');
        this.scene.background = bgColor;
        this.scene.fog = new THREE.FogExp2(bgColor, 0.002);
        
        this.camera = new THREE.PerspectiveCamera(45, rect.width / rect.height, 0.1, 2000);
        this.camera.position.set(0, 0, 150);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        this.renderer.setSize(rect.width, rect.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.cssRenderer = new CSS3DRenderer();
        this.cssRenderer.setSize(rect.width, rect.height);
        this.cssRenderer.domElement.style.position = 'absolute';
        this.cssRenderer.domElement.style.top = '0';
        this.cssRenderer.domElement.style.left = '0';
        this.cssRenderer.domElement.style.pointerEvents = 'none';
        this.cssRenderer.domElement.style.zIndex = '10';
        this.shadowRoot.appendChild(this.cssRenderer.domElement);

        
        this.setupLighting();
    }

    setupLighting() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(this.ambientLight);

        this.keyLight = new THREE.DirectionalLight(0xffffff, 100);
        this.keyLight.position.set(20, 50, 40);
        this.scene.add(this.keyLight);

        // this.fillLight = new THREE.DirectionalLight(0xb0c4ff, 1.2);
        // this.fillLight.position.set(-70, 30, 40);
        // this.scene.add(this.fillLight);

        // this.rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
        // this.rimLight.position.set(0, 50, -80);
        // this.scene.add(this.rimLight);
    }

    async loadPlayablesData() {
        try {
            const response = await fetch(this.config.playableJsonUrl);
            const data = await response.json();
            this.playablesData = data.previews || (Array.isArray(data) ? data : []);
            if (this.playablesData.length > 0) this.loadRandomPlayable();
        } catch (error) {
            console.error('Ошибка загрузки JSON:', error);
            this.playablesData = [{ url: 'https://mraid.io/' }];
            this.loadRandomPlayable();
        }
    }

    loadRandomPlayable() {
        if (!this.playablesData || this.playablesData.length === 0) return;
        const selected = this.playablesData[Math.floor(Math.random() * this.playablesData.length)];
        if (selected.url && selected.url !== this.currentPlayableUrl) {
            this.currentPlayableUrl = selected.url;
            this.setPlayableUrl(selected.url);
            this.resetInactivityTimer();
        }
    }

    resetInactivityTimer() {
        if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
        this.inactivityTimer = setTimeout(() => this.loadRandomPlayable(), this.config.inactivityTimeout);
    }

    setupInteractionListeners() {
        const resetTimer = () => this.resetInactivityTimer();
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('click', resetTimer);
        window.addEventListener('touchstart', resetTimer);
        window.addEventListener('keydown', resetTimer);
        this._interactionReset = resetTimer;
    }

    loadPhoneModel() {
        this.loader = new GLTFLoader();
        
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
        this.loader.setDRACOLoader(dracoLoader);

        this.loader.load(this.config.phoneModelPath, (gltf) => {
            this.phoneModel = gltf.scene;
            this.makeModelOpaque(this.phoneModel);
            
            this.phoneModel.position.set(this.config.phonePosX, this.config.phonePosY, this.config.phonePosZ);
            
            const rad = Math.PI / 180;
            this.phoneModel.rotation.set(this.config.phoneRotX * rad, this.config.phoneRotY * rad, this.config.phoneRotZ * rad);
            this.phoneModel.scale.setScalar(this.config.phoneScale);
            
            this.scene.add(this.phoneModel);
            this.phoneModel.updateMatrixWorld(true);
            
            this.phoneModel.traverse((child) => {
                if (child.isMesh && child.name && child.name.toUpperCase().includes('GLASS')) {
                    this.glassMesh = child;
                }
            });
            
            this.phoneModel.traverse((child) => {
                if (child.isMesh && child.name && child.name.toUpperCase().includes('CAMERA')) {
                    // child.position.x += this.config.cameraOffsetX;
                    // child.position.y += this.config.cameraOffsetY;
                    // child.position.z += this.config.cameraOffsetZ;
                }
            });
            
            if (this.glassMesh) {
                console.log('GLASS найден:', this.glassMesh.name);
                this.makeGlassBlack();
                this.createScreenObject();
            } else {
                console.warn('GLASS не найден');
            }
        }, undefined, (error) => console.error('Ошибка GLB:', error));
    }

    createScreenObject() {
        const glass = this.glassMesh;
        glass.updateWorldMatrix(true, false);

        const box = new THREE.Box3().setFromObject(glass);
        const center = new THREE.Vector3();
        box.getCenter(center);

        const ps = glass.getWorldScale(new THREE.Vector3()).x;
        this.glassParentScale = ps;

        glass.geometry.computeBoundingBox();
        const ls = glass.geometry.boundingBox.getSize(new THREE.Vector3());
        const dims = [ls.x, ls.y, ls.z];
        const nAxis = dims.indexOf(Math.min(...dims));
        const rest = [0, 1, 2].filter(i => i !== nAxis);
        const upAxis = dims[rest[0]] > dims[rest[1]] ? rest[0] : rest[1];
        const wAxis = rest.find(i => i !== upAxis);

        this.screenW = dims[wAxis];
        this.screenH = dims[upAxis];

        const gq = glass.getWorldQuaternion(new THREE.Quaternion());
        const n = new THREE.Vector3().setComponent(nAxis, 1);
        if (n.clone().applyQuaternion(gq).dot(this.camera.position.clone().sub(center)) < 0) {
            n.setComponent(nAxis, -1);
        }
        const up = new THREE.Vector3().setComponent(upAxis, 1);
        if (up.clone().applyQuaternion(gq).y < 0) up.setComponent(upAxis, -1);
        const right = up.clone().cross(n);

        this.screenN = n;
        this.screenUp = up;
        this.screenRight = right;

        const wrapper = document.createElement('div');
        wrapper.className = 'screen-wrapper';
        wrapper.style.width = this.config.frameWidth + 'px';
        wrapper.style.height = this.config.frameHeight + 'px';

        this.playableIframe = document.createElement('iframe');
        this.playableIframe.src = 'about:blank';
        this.playableIframe.setAttribute('allow', 'autoplay; fullscreen');
        this.playableIframe.style.background = 'transparent';
        wrapper.appendChild(this.playableIframe);

        this.screenObject = new CSS3DObject(wrapper);
        glass.add(this.screenObject);

        const cssScale = dims[wAxis] / this.config.frameWidth;

        // const qualityScale = 0.37;  
        // const cssScale = (dims[wAxis] / this.config.frameWidth) * qualityScale;

        this.screenObject.scale.set(cssScale, cssScale, cssScale);

        this.screenObject.quaternion.setFromRotationMatrix(
            new THREE.Matrix4().makeBasis(right, up, n)
        );

        const localCenter = glass.worldToLocal(center.clone());
        this.screenLocalCenter = localCenter.clone();
        
        this.applyScreenOffsets();

        this.createStatusBar(glass, localCenter, n, up, right, cssScale, ps);
        this.createHomeIndicator(glass, localCenter, n, up, right, cssScale, ps);

        if (this.currentPlayableUrl) {
            this.playableIframe.src = this.currentPlayableUrl;
        }
    }

    applyScreenOffsets() {
        if (!this.screenObject || !this.screenLocalCenter) return;
        const ps = this.glassParentScale || 1;
        this.screenObject.position.copy(this.screenLocalCenter)
            .addScaledVector(this.screenN, this.config.screenOffsetZ / ps)
            .addScaledVector(this.screenUp, this.config.screenOffsetY / ps)
            .addScaledVector(this.screenRight, this.config.screenOffsetX / ps);
    }

    createStatusBar(glass, localCenter, n, up, right, cssScale, ps) {
        const wrapper = document.createElement('div');
        wrapper.className = 'status-bar';
        wrapper.innerHTML = `
            <span class="time">${this.getCurrentTime() }</span>
            <div class="icons">
                <span>📶</span>
                <span>🔋</span>
            </div>
        `;
        
        const barHeightPx = this.config.statusBarHeight;
        wrapper.style.width = this.config.frameWidth + 'px';
        wrapper.style.height = barHeightPx + 'px';
        
        this.statusBarObject = new CSS3DObject(wrapper);
        glass.add(this.statusBarObject);
        
        this.statusBarObject.scale.set(cssScale, cssScale, cssScale);
        
        this.statusBarObject.quaternion.setFromRotationMatrix(
            new THREE.Matrix4().makeBasis(right, up, n)
        );
        
        const frameHWorld = this.config.frameHeight * cssScale;
        const barHWorld = barHeightPx * cssScale;
        const yOffset = frameHWorld / 2 + barHWorld / 2 + this.config.uiGap;
        
        this.statusBarObject.position.copy(localCenter)
            .addScaledVector(up, yOffset / ps)
            .addScaledVector(n, this.config.uiOffsetZ / ps);
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }

    createHomeIndicator(glass, localCenter, n, up, right, cssScale, ps) {
        const wrapper = document.createElement('div');
        wrapper.className = 'home-indicator';
        wrapper.innerHTML = `<div class="bar"></div>`;
        
        const barHeightPx = this.config.homeBarHeight;
        wrapper.style.width = this.config.frameWidth + 'px';
        wrapper.style.height = barHeightPx + 'px';
        
        this.homeBarObject = new CSS3DObject(wrapper);
        glass.add(this.homeBarObject);
        
        this.homeBarObject.scale.set(cssScale, cssScale, cssScale);
        
        this.homeBarObject.quaternion.setFromRotationMatrix(
            new THREE.Matrix4().makeBasis(right, up, n)
        );
        
        const frameHWorld = this.config.frameHeight * cssScale;
        const barHWorld = barHeightPx * cssScale;
        const yOffset = -(frameHWorld / 2 + barHWorld / 2 + this.config.uiGap);
        
        this.homeBarObject.position.copy(localCenter)
            .addScaledVector(up, yOffset / ps)
            .addScaledVector(n, this.config.uiOffsetZ / ps);
    }

    makeGlassBlack() {
        const old = this.glassMesh.material;
        const mat = old.clone();
        mat.color.set(0x000000);
        mat.transparent = false;
        mat.opacity = 1;
        if (mat.emissive) mat.emissive.set(0x000000);
        if ('metalness' in mat) mat.metalness = 0.6;
        if ('roughness' in mat) mat.roughness = 0.15;
        mat.needsUpdate = true;
        this.glassMesh.material = mat;
    }

    makeModelOpaque(model) {
        model.traverse((child) => {
            if (child.isMesh && child.material) {
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                materials.forEach(mat => {
                    mat.transparent = false;
                    mat.opacity = 1.0;
                    mat.depthWrite = true;
                    mat.needsUpdate = true;
                });
            }
        });
    }

    updateScreenVisibility() {
        if (!this.screenObject || !this.camera || !this.phoneModel) return;
        
        const screenPos = new THREE.Vector3();
        this.screenObject.getWorldPosition(screenPos);
        
        const raycaster = new THREE.Raycaster();
        const direction = screenPos.clone().sub(this.camera.position).normalize();
        raycaster.set(this.camera.position, direction);
        
        const occluders = [];
        this.phoneModel.traverse((child) => {
            if (child.isMesh && child !== this.glassMesh) {
                occluders.push(child);
            }
        });
        
        const intersects = raycaster.intersectObjects(occluders);
        const dist = screenPos.distanceTo(this.camera.position);
        
        if (intersects.length > 0 && intersects[0].distance < dist - 0.5) {
            this.screenObject.visible = false;
            if (this.statusBarObject) this.statusBarObject.visible = false;
            if (this.homeBarObject) this.homeBarObject.visible = false;
            return;
        }
        
        const screenNormal = new THREE.Vector3(0, 0, 1);
        this.screenObject.getWorldDirection(screenNormal);
        const camPos = this.camera.position.clone();
        const toCamera = camPos.sub(screenPos).normalize();
        const dot = screenNormal.dot(toCamera);
        
        const visible = dot > 0.15;
        this.screenObject.visible = visible;
        if (this.statusBarObject) this.statusBarObject.visible = visible;
        if (this.homeBarObject) this.homeBarObject.visible = visible;
    }

    createGrid() {
        const { spacing, gridWidth, gridHeight, offsetX, offsetY, gridZ } = this.config;
        const count = gridWidth * gridHeight;
        
        const positions = new Float32Array(count * 3);
        this.phases = new Float32Array(count);
        this.isHotArr = new Float32Array(count);

        const startX = -(gridWidth * spacing) / 2 + offsetX;
        const startY = -(gridHeight * spacing) / 2 + offsetY;

        for (let i = 0; i < count; i++) {
            positions[i * 3] = startX + (i % gridWidth) * spacing;
            positions[i * 3 + 1] = startY + Math.floor(i / gridWidth) * spacing;
            positions[i * 3 + 2] = gridZ;
            
            const seed = Math.floor(i / gridWidth) * 12.9898 + (i % gridWidth) * 78.233;
            this.phases[i] = Math.abs(Math.sin(seed) * 43758.5453) % 1;
            this.isHotArr[i] = this.phases[i] > 0.85 ? 1.0 : 0.0;
        }

        const pointGeometry = new THREE.BufferGeometry();
        pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        pointGeometry.setAttribute('aRandomPhase', new THREE.BufferAttribute(this.phases, 1));
        pointGeometry.setAttribute('aIsHot', new THREE.BufferAttribute(this.isHotArr, 1));

        const rgb = this.hexToRgb(this.config.baseColor);

        const pointMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uSpeed: { value: this.config.speed },
                uBaseSize: { value: this.config.dotSize },
                uMaxLift: { value: this.config.maxLift },
                uCoreBrightness: { value: this.config.coreBrightness },
                uColorR: { value: rgb.r },
                uColorG: { value: rgb.g },
                uColorB: { value: rgb.b },
                uRedGlowSize: { value: this.config.redGlowSize },
                uRedGlowIntensity: { value: this.config.redGlowIntensity }
            },
            vertexShader: `
                uniform float uTime;
                uniform float uSpeed;
                uniform float uBaseSize;
                uniform float uMaxLift;
                attribute float aRandomPhase;
                attribute float aIsHot;
                varying float vIntensity;
                varying float vIsHot;
                
                void main() {
                    float cycleDuration = 10.0;
                    float flashDuration = 3.0;
                    float pauseDuration = cycleDuration - flashDuration;
                    float t = mod(uTime * uSpeed + aRandomPhase * 100.0, cycleDuration);
                    
                    float intensity = 0.2;
                    float lift = 0.0;
                    float sizeMult = 0.8;
                    
                    if (t > pauseDuration) {
                        float progress = (t - pauseDuration) / flashDuration;
                        float heightFactor = sin(progress * 3.14159);
                        lift = heightFactor * uMaxLift;
                        intensity = 0.2 + 0.8 * heightFactor;
                        sizeMult = 0.8 + 0.4 * heightFactor;
                    }
                    if (aIsHot > 0.5) intensity = min(1.0, intensity * 1.3);
                    
                    vIntensity = intensity;
                    vIsHot = aIsHot;
                    
                    vec3 newPos = position + vec3(0.0, 0.0, lift);
                    vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                    gl_PointSize = ceil(uBaseSize * sizeMult * (200.0 / -mvPosition.z));
                }
            `,
            fragmentShader: `
                uniform float uCoreBrightness;
                uniform float uColorR;
                uniform float uColorG;
                uniform float uColorB;
                uniform float uRedGlowSize;
                uniform float uRedGlowIntensity;
                varying float vIntensity;
                varying float vIsHot;
                
                void main() {
                    vec2 coord = gl_PointCoord - 0.5;
                    float dist = length(coord);
                    if (dist > 0.5) discard; 
                    
                    float glow = 1.0 - (dist * 2.0);
                    
                    float core = pow(glow, 10.0) * vIntensity; 
                    float redRing = pow(glow * uRedGlowSize, 2.5) * vIntensity * uRedGlowIntensity; 
                    float outerGlow = pow(glow * uRedGlowSize, 1.2) * vIntensity * (uRedGlowIntensity * 0.5); 
                    
                    vec3 colorCore = vec3(1.0, 1.0, 1.0);
                    vec3 colorMain = vec3(uColorR, uColorG, uColorB); 
                    
                    vec3 finalColor = colorMain * (redRing + outerGlow);
                    finalColor += colorCore * core * uCoreBrightness;
                    
                    float alpha = (core * uCoreBrightness + redRing + outerGlow) * 2.0;
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            alphaTest: 0.05,
            blending: THREE.AdditiveBlending
        });

        this.points = new THREE.Points(pointGeometry, pointMaterial);
        this.points.renderOrder = 0;
        this.applyRotations();
        this.scene.add(this.points);

        this.createLines(startX, startY, spacing, gridWidth, gridHeight);
    }

    createLines(startX, startY, spacing, w, h) {
        let lineCount = (w * (h - 1)) + ((w - 1) * h) + (w * 2) + (h * 2);
        this.linePositions = new Float32Array(lineCount * 6);
        this.lineColors = new Float32Array(lineCount * 6);
        
        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(this.linePositions, 3));
        lineGeometry.setAttribute('color', new THREE.BufferAttribute(this.lineColors, 3));
        
        const lineMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            linewidth: this.config.lineWidth
        });

        this.lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        this.lines.renderOrder = 1;
        this.applyRotations();
        this.scene.add(this.lines);
    }

    applyRotations() {
        const rad = Math.PI / 180;
        const rx = this.config.rotationX * rad;
        const ry = this.config.rotationY * rad;
        const rz = this.config.rotationZ * rad;

        if (this.points) { this.points.rotation.set(rx, ry, rz); }
        if (this.lines) { this.lines.rotation.set(rx, ry, rz); }
    }

    getPointLift(index) {
        const t = (this.time * this.config.speed + this.phases[index] * 100.0) % 10.0;
        if (t > 7.0) {
            return Math.sin(((t - 7.0) / 3.0) * Math.PI) * this.config.maxLift;
        }
        return 0.0;
    }

    getPointIntensity(index) {
        const t = (this.time * this.config.speed + this.phases[index] * 100.0) % 10.0;
        if (t > 7.0) {
            let intensity = 0.2 + 0.8 * Math.sin(((t - 7.0) / 3.0) * Math.PI);
            return this.isHotArr[index] > 0.5 ? Math.min(1.0, intensity * 1.3) : intensity;
        }
        return 0.2;
    }

    updateLines() {
        if (!this.lines) return;
        const { spacing, gridWidth, gridHeight, gridZ } = this.config;
        const positions = this.lines.geometry.attributes.position.array;
        const colors = this.lines.geometry.attributes.color.array;
        let idx = 0;

        const rgb = this.hexToRgb(this.config.baseColor);
        const baseR = 0.02 * rgb.r, baseG = 0.02 * rgb.g, baseB = 0.02 * rgb.b;

        const addLine = (i1, x1, y1, z1, i2, x2, y2, z2) => {
            const int1 = this.getPointIntensity(i1);
            const int2 = this.getPointIntensity(i2);
            
            positions[idx] = x1; positions[idx+1] = y1; positions[idx+2] = z1 + this.getPointLift(i1);
            positions[idx+3] = x2; positions[idx+4] = y2; positions[idx+5] = z2 + this.getPointLift(i2);
            
            const g1 = Math.pow(int1, 2.5) * this.config.lineBrightness;
            const g2 = Math.pow(int2, 2.5) * this.config.lineBrightness;
            
            colors[idx] = baseR + (g1 * rgb.r); colors[idx+1] = baseG + (g1 * rgb.g); colors[idx+2] = baseB + (g1 * rgb.b);
            colors[idx+3] = baseR + (g2 * rgb.r); colors[idx+4] = baseG + (g2 * rgb.g); colors[idx+5] = baseB + (g2 * rgb.b);
            idx += 6;
        };

        const startX = -(gridWidth * spacing) / 2 + this.config.offsetX;
        const startY = -(gridHeight * spacing) / 2 + this.config.offsetY;

        for (let row = 0; row < gridHeight; row++) {
            for (let col = 0; col < gridWidth; col++) {
                const i = row * gridWidth + col;
                const x = startX + col * spacing;
                const y = startY + row * spacing;

                if (col < gridWidth - 1) addLine(i, x, y, gridZ, i + 1, x + spacing, y, gridZ);
                if (row < gridHeight - 1) addLine(i, x, y, gridZ, i + gridWidth, x, y + spacing, gridZ);

                const vLen = spacing * 1.5;
                if (col === gridWidth - 1) addLine(i, x, y, gridZ, i, x + vLen, y, gridZ);
                if (col === 0) addLine(i, x, y, gridZ, i, x - vLen, y, gridZ);
                if (row === gridHeight - 1) addLine(i, x, y, gridZ, i, x, y + vLen, gridZ);
                if (row === 0) addLine(i, x, y, gridZ, i, x, y - vLen, gridZ);
            }
        }

        this.lines.geometry.attributes.position.needsUpdate = true;
        this.lines.geometry.attributes.color.needsUpdate = true;
    }

    renderFrame() {
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
        if (this.cssRenderer && this.scene && this.camera) {
            this.cssRenderer.render(this.scene, this.camera);
        }
    }

    animate = (timestamp) => {
        if (this.isPaused) return;
        this.time = timestamp * 0.001;
        if (this.points) this.points.material.uniforms.uTime.value = this.time;
        this.updateLines();
        this.updateScreenVisibility();
        this.renderFrame();
        this.animatePhone(timestamp); 
        this.animationId = requestAnimationFrame(this.animate);
    }

    animatePhone(timestamp) {
        if (!this.phoneModel) return;
        const t = timestamp * 0.01;
        const rad = Math.PI / 180;
        const c = this.config;
        
        this.phoneModel.rotation.x = c.phoneRotX * rad 
            + (c.phoneAnimBiasX * rad) 
            + Math.sin(t * c.phoneAnimSpeedX + 1.5) * (c.phoneAnimAmpX * rad);
        
        this.phoneModel.rotation.y = c.phoneRotY * rad 
            + (c.phoneAnimBiasY * rad) 
            + Math.sin(t * c.phoneAnimSpeedY) * (c.phoneAnimAmpY * rad);
        
        this.phoneModel.rotation.z = c.phoneRotZ * rad 
            + (c.phoneAnimBiasZ * rad) 
            + Math.sin(t * c.phoneAnimSpeedZ + 0.8) * (c.phoneAnimAmpZ * rad);
    }
    
    startAnimation() { this.isPaused = false; this.animationId = requestAnimationFrame(this.animate); }
    pause() {
        this.isPaused = true;
        if (this.animationId) { cancelAnimationFrame(this.animationId); this.animationId = null; }
    }
    resume() { if (this.isPaused) this.startAnimation(); }
    toggleAnimation() { this.isPaused ? this.resume() : this.pause(); }

    onResize() {
        const rect = this.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.camera.aspect = rect.width / rect.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(rect.width, rect.height);
        if (this.cssRenderer) this.cssRenderer.setSize(rect.width, rect.height);
        this.renderFrame();
    }

    setRotationX(v) { this.config.rotationX = v; this.applyRotations(); }
    setRotationY(v) { this.config.rotationY = v; this.applyRotations(); }
    setRotationZ(v) { this.config.rotationZ = v; this.applyRotations(); }
    setDotSize(v) { if(this.points) this.points.material.uniforms.uBaseSize.value = v; }
    setMaxLift(v) { if(this.points) this.points.material.uniforms.uMaxLift.value = v; }
    setSpeed(v) { if(this.points) this.points.material.uniforms.uSpeed.value = v; }
    
    setRedGlowSize(v) { 
        this.config.redGlowSize = v; 
        if(this.points) this.points.material.uniforms.uRedGlowSize.value = v; 
    }
    setRedGlowIntensity(v) { 
        this.config.redGlowIntensity = v; 
        if(this.points) this.points.material.uniforms.uRedGlowIntensity.value = v; 
    }

    setGridZ(v) { 
        this.config.gridZ = v; 
        this.scene.remove(this.points); this.scene.remove(this.lines);
        this.points.geometry.dispose(); this.points.material.dispose();
        this.lines.geometry.dispose(); this.lines.material.dispose();
        this.createGrid(); 
    }
    setBaseColor(v) {
        this.config.baseColor = v;
        const rgb = this.hexToRgb(v);
        if(this.points) {
            this.points.material.uniforms.uColorR.value = rgb.r;
            this.points.material.uniforms.uColorG.value = rgb.g;
            this.points.material.uniforms.uColorB.value = rgb.b;
        }
    }
    setOffsetX(v) { this.config.offsetX = v; this.rebuildGrid(); }
    setOffsetY(v) { this.config.offsetY = v; this.rebuildGrid(); }
    
    rebuildGrid() {
        this.scene.remove(this.points); this.scene.remove(this.lines);
        this.points.geometry.dispose(); this.points.material.dispose();
        this.lines.geometry.dispose(); this.lines.material.dispose();
        this.createGrid(); 
    }

    setLineWidth(v) { if(this.lines) { this.lines.material.linewidth = v; this.lines.material.needsUpdate = true; } }
    setLineBrightness(v) { this.config.lineBrightness = v; }
    setCoreBrightness(v) { if(this.points) this.points.material.uniforms.uCoreBrightness.value = v; }

    setPhoneScale(v) { if (this.phoneModel) this.phoneModel.scale.setScalar(v); }
    setPhonePosX(v) { if (this.phoneModel) this.phoneModel.position.x = v; }
    setPhonePosY(v) { if (this.phoneModel) this.phoneModel.position.y = v; }
    setPhonePosZ(v) { if (this.phoneModel) this.phoneModel.position.z = v; }
    setPhoneRotX(v) { if (this.phoneModel) this.phoneModel.rotation.x = v * Math.PI / 180; }
    setPhoneRotY(v) { if (this.phoneModel) this.phoneModel.rotation.y = v * Math.PI / 180; }
    setPhoneRotZ(v) { if (this.phoneModel) this.phoneModel.rotation.z = v * Math.PI / 180; }
    
    setCameraOffsetX(v) {
        this.config.cameraOffsetX = v;
        if (this.phoneModel) {
            this.phoneModel.traverse((child) => {
                if (child.isMesh && child.name && child.name.toUpperCase().includes('CAMERA')) {
                    child.position.x = v;
                }
            });
        }
    }

    setPlayableUrl(v) { if (this.playableIframe) this.playableIframe.src = v; }
    setFrameWidth(v) { this.config.frameWidth = v; }
    setFrameHeight(v) { this.config.frameHeight = v; }
    setScreenOffsetX(v) { this.config.screenOffsetX = v; this.applyScreenOffsets(); }
    setScreenOffsetY(v) { this.config.screenOffsetY = v; this.applyScreenOffsets(); }
    setScreenOffsetZ(v) { this.config.screenOffsetZ = v; this.applyScreenOffsets(); }
    forceNextPlayable() { this.loadRandomPlayable(); }

    disconnectedCallback() {
        this.pause();
        if (this.resizeObserver) this.resizeObserver.disconnect();
        if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
        if (this._interactionReset) {
            window.removeEventListener('mousemove', this._interactionReset);
            window.removeEventListener('click', this._interactionReset);
            window.removeEventListener('touchstart', this._interactionReset);
            window.removeEventListener('keydown', this._interactionReset);
        }
        if (this.phoneModel) {
            this.scene.remove(this.phoneModel);
            this.phoneModel.traverse((child) => {
                if (child.isMesh) {
                    child.geometry.dispose();
                    if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
                    else child.material.dispose();
                }
            });
        }
        if (this.screenObject) this.screenObject.element.remove();
        if (this.statusBarObject) this.statusBarObject.element.remove();
        if (this.homeBarObject) this.homeBarObject.element.remove();
        if (this.cssRenderer) this.cssRenderer.domElement.remove();
        if (this.renderer) {
            this.renderer.dispose();
            if (this.points) {
                this.points.geometry.dispose(); 
                this.points.material.dispose();
            }
            if (this.lines) {
                this.lines.geometry.dispose(); 
                this.lines.material.dispose();
            }
        }
    }
}

customElements.define('network-background', NetworkBackground);