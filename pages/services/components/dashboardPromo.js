class DashboardPromo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.animationFrame = null;
    }

    connectedCallback() {
        this.render();
        this.initVideoControls();
        this.startIconAnimation();
    }

    disconnectedCallback() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/services/components/css/dashboardPromo.css">
            
            <section class="dashboard-promo">
                <div class="promo-content">
                    <div class="promo-text">
                        <div class="logo-wrapper">
                            <div class="animated-icon">
                                <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <!-- Левый верхний -->
                                    <rect id="rect-tl" x="4.5" y="4.5" width="13.6667" height="13.6667" stroke="#FF0034" stroke-width="3" stroke-linejoin="round" fill="none" rx="2"/>
                                    <!-- Правый верхний -->
                                    <rect id="rect-tr" x="22.8333" y="4.5" width="13.6667" height="13.6667" stroke="#FF0034" stroke-width="3" stroke-linejoin="round" fill="none" rx="2"/>
                                    <!-- Левый нижний -->
                                    <rect id="rect-bl" x="4.5" y="22.8333" width="13.6667" height="13.6667" stroke="#FF0034" stroke-width="3" stroke-linejoin="round" fill="none" rx="2"/>
                                    <!-- Правый нижний -->
                                    <rect id="rect-br" x="22.8333" y="22.8333" width="13.6667" height="13.6667" stroke="#FF0034" stroke-width="3" stroke-linejoin="round" fill="none" rx="2"/>
                                </svg>
                            </div>
                            <span class="logo-text">MMRAID.IO Dashboard</span>
                        </div>
                        
                        <h2 class="promo-title">
                            Create banners in minutes<br>
                            with our editor
                        </h2>
                        
                        <p class="promo-description">
                            Our in-house editor allows you to create HTML5<br>
                            banners quickly and easily -no coding required.
                        </p>
                        
                        <a href="https://dashboard.mraid.io/" class="promo-cta-btn">
                            Go to Dashboard
                            <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.3609 13.542L19.543 7.04199L11.3609 0.541992M19.543 7.04199H0.542968" stroke="white" stroke-width="1.08428" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                    </div>

                    <div class="promo-video-wrapper">
                        <div class="video-container">
                            <video controls class="promo-video">
                                <source src="assets/video/video1.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    initVideoControls() {
        const video = this.shadowRoot.querySelector('.promo-video');
        
        // Клик по видео для play/pause
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });

        // Двойной клик для fullscreen
        video.addEventListener('dblclick', () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        });
    }

    startIconAnimation() {
        const rectTL = this.shadowRoot.getElementById('rect-tl');
        const rectTR = this.shadowRoot.getElementById('rect-tr');
        const rectBL = this.shadowRoot.getElementById('rect-bl');
        const rectBR = this.shadowRoot.getElementById('rect-br');

        if (!rectTL || !rectTR || !rectBL || !rectBR) return;

        const bigHeight = 13.6667;
        const smallHeight = 6.8333;
        
        // Магическое число: 4.5 (верхний отступ) + 13.6667 (макс. высота) + 4 (зазор) + 6.8333 (мин. высота) = 29.0
        // Это гарантирует, что нижняя граница нижних блоков всегда зафиксирована, а зазор между ними и верхними блоками всегда ровно 4px.
        const fixedBottomY = 29.0; 

        let startTime = null;
        const duration = 3000;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = (elapsed % duration) / duration;

            // Плавная синусоидальная интерполяция от 0 до 1
            const t = (Math.sin(progress * Math.PI * 2 - Math.PI / 2) + 1) / 2;

            // ==========================================
            // ЛЕВАЯ СТОРОНА
            // ==========================================
            
            // Левый Верхний: растет ВНИЗ от Y=4.5
            const tlHeight = smallHeight + (bigHeight - smallHeight) * t;
            rectTL.setAttribute('y', 4.5);
            rectTL.setAttribute('height', tlHeight);

            // Левый Нижний: ужимается ВВЕРХ. Его нижняя граница всегда на fixedBottomY
            const blHeight = bigHeight - (bigHeight - smallHeight) * t;
            const blY = fixedBottomY - blHeight; 
            rectBL.setAttribute('y', blY);
            rectBL.setAttribute('height', blHeight);

            // ==========================================
            // ПРАВАЯ СТОРОНА (Зеркальная анимация)
            // ==========================================
            
            // Правый Верхний: начинает большим и ужимается ВНИЗ
            const trHeight = bigHeight - (bigHeight - smallHeight) * t;
            rectTR.setAttribute('y', 4.5);
            rectTR.setAttribute('height', trHeight);

            // Правый Нижний: начинает маленьким и растет ВВЕРХ
            const brHeight = smallHeight + (bigHeight - smallHeight) * t;
            const brY = fixedBottomY - brHeight;
            rectBR.setAttribute('y', brY);
            rectBR.setAttribute('height', brHeight);

            this.animationFrame = requestAnimationFrame(animate);
        };

        this.animationFrame = requestAnimationFrame(animate);
    }

    
}
customElements.define('dashboard-promo', DashboardPromo);