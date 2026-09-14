class PortfolioBuild extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentPlayable = '2d';
        this.isLoading = false;
    }

    connectedCallback() {
        const features = [
            {
                id: 'reskin',
                title: 'Reskin from library',
                description: 'Quick & cost-effective way to launch a playable with proven performance',
                src: 'assets/playables/build/ex-m-default.html',
                icon: 'cube',
                active: false
            },
            {
                id: '2d',
                title: '2D Playable',
                description: 'Custom 2D playables built around your game or product',
                src: 'assets/playables/build/ex-m-default.html',
                icon: 'screen',
                active: true
            },
            {
                id: '3d',
                title: '3D Playable',
                description: 'Interactive 3D experiences with characters, environments and animations',
                src: 'assets/playables/build/ex-m-assets.html',
                icon: 'cube-3d',
                active: false
            },
            {
                id: 'variations',
                title: 'Playable variations',
                description: 'Multiple creative variations to test different mechanics, visuals and hooks',
                src: 'assets/playables/build/ex-m-text.html',
                icon: 'layers',
                active: false
            },
            {
                id: 'banners',
                title: 'Banners, videos, etc.',
                description: 'Interactive banners for your advertising',
                src: 'assets/playables/build/ex-m-default.html',
                icon: 'video',
                active: false
            },
            {
                id: 'fullcycle',
                title: 'Full-Cycle Production',
                description: 'Concept Art → Development → Testing Builds. We handle the entire production',
                src: 'assets/playables/build/ex-m-click.html',
                icon: 'cycle',
                active: false
            }
        ];

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/portfolio/components/css/portfolioBuild.css">
            
            <section class="portfolio-build-section">
                <div class="build-header">
                    <h2>What we can build for you?</h2>
                    <a href="#portfolio" class="see-more-link">
                        See more
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </a>
                </div>

                <div class="build-interactive">
                    <!-- Левая колонка -->
                    <div class="features-left">
                        ${features.slice(0, 3).map((feature, index) => `
                            <div class="feature-card ${feature.active ? 'active' : ''}" data-feature="${feature.id}">
                                <div class="feature-icon">
                                    ${this.getIcon(feature.icon)}
                                </div>
                                <div class="feature-content">
                                    <h3 class="feature-title">${feature.title}</h3>
                                    <p class="feature-description">${feature.description}</p>
                                </div>
                                ${feature.active ? '<div class="feature-arrow arrow-right"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#FF0034" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' : ''}
                            </div>
                        `).join('')}
                    </div>

                    <!-- Телефон по центру -->
                    <div class="phone-container">
                        <div class="phone-frame">
                            <img src="assets/img/phone.png" alt="Phone frame" class="phone-image">
                            <div class="phone-screen">
                                <div class="playable-wrapper">
                                    <img src="assets/playables/build/preview.jpg" alt="Loading..." class="preview-image active">
                                    <div class="playable-preloader active">
                                        <div class="preloader-spinner"></div>
                                    </div>
                                    <iframe 
                                        src="${features.find(f => f.active).src}" 
                                        class="playable-iframe"
                                        id="playable-frame"
                                        frameborder="0"
                                        scrolling="no"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Правая колонка -->
                    <div class="features-right">
                        ${features.slice(3).map((feature, index) => `
                            <div class="feature-card ${feature.active ? 'active' : ''}" data-feature="${feature.id}">
                                ${feature.active ? '<div class="feature-arrow arrow-left"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#FF0034" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' : ''}
                                <div class="feature-icon">
                                    ${this.getIcon(feature.icon)}
                                </div>
                                <div class="feature-content">
                                    <h3 class="feature-title">${feature.title}</h3>
                                    <p class="feature-description">${feature.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;

        this.initFeatures(features);
    }

    getIcon(type) {
        const icons = {
            'cube': '<svg  viewBox="0 0 24 24" fill="none"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            'screen': '<svg  viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            'cube-3d': '<svg  viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 17l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            'layers': '<svg  viewBox="0 0 24 24" fill="none"><polygon points="12 2 2 7 12 12 22 7 12 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="2 17 12 22 22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="2 12 12 17 22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            'video': '<svg  viewBox="0 0 24 24" fill="none"><polygon points="23 7 16 12 23 17 23 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            'cycle': '<svg  viewBox="0 0 24 24" fill="none"><polyline points="23 4 23 10 17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        };
        return icons[type] || icons['cube'];
    }

    initFeatures(features) {
        const cards = this.shadowRoot.querySelectorAll('.feature-card');
        const iframe = this.shadowRoot.querySelector('#playable-frame');
        const preloader = this.shadowRoot.querySelector('.playable-preloader');
        const previewImage = this.shadowRoot.querySelector('.preview-image');

        // Функция скрытия preloader и preview
        const hideLoading = () => {
            setTimeout(() => {
                preloader.classList.remove('active');
                previewImage.classList.remove('active');
                this.isLoading = false;
            }, 300);
        };

        // Проверяем, загружен ли iframe уже (для начальной загрузки)
        if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            hideLoading();
        } else {
            // Ждем загрузки iframe
            iframe.addEventListener('load', () => {
                hideLoading();
            });
            
            // Fallback на случай если onload не сработает
            setTimeout(() => {
                if (this.isLoading) {
                    hideLoading();
                }
            }, 3000);
        }

        const loadPlayable = (featureId, card) => {
            if (this.isLoading) return;
            this.isLoading = true;

            const feature = features.find(f => f.id === featureId);
            
            if (feature) {
                cards.forEach(c => {
                    c.classList.remove('active');
                    const arrow = c.querySelector('.feature-arrow');
                    if (arrow) arrow.remove();
                });
                card.classList.add('active');
                
                const arrow = document.createElement('div');
                arrow.className = 'feature-arrow ' + (card.closest('.features-left') ? 'arrow-right' : 'arrow-left');
                arrow.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#FF0034" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                
                if (card.closest('.features-left')) {
                    card.appendChild(arrow);
                } else {
                    card.insertBefore(arrow, card.firstChild);
                }

                // Показываем preloader и preview
                preloader.classList.add('active');
                previewImage.classList.add('active');
                
                // Меняем src iframe
                iframe.src = feature.src;
                
                // Ждем загрузки
                iframe.addEventListener('load', () => {
                    hideLoading();
                }, { once: true });
                
                // Fallback
                setTimeout(() => {
                    if (this.isLoading) {
                        hideLoading();
                    }
                }, 3000);
            }
        };

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const featureId = card.dataset.feature;
                loadPlayable(featureId, card);
            });
        });
    }
}

customElements.define('portfolio-build', PortfolioBuild);