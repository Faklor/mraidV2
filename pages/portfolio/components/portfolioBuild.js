class PortfolioBuild extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentPlayable = '2d';
        this.isLoading = false; // Флаг загрузки
    }

    connectedCallback() {
        const features = [
            {
                id: '2d',
                title: '2D Playable',
                description: 'Custom 2D playables built around your game or product',
                src: 'assets/playables/build/ex-m-default.html',
                active: true
            },
            {
                id: 'localization',
                title: 'Localization',
                description: 'Adapt your playable for different markets and languages',
                src: 'assets/playables/build/ex-m-text.html',
                active: false
            },
            {
                id: 'assets',
                title: 'Assets',
                description: 'Replace characters, items and visual elements',
                src: 'assets/playables/build/ex-m-assets.html',
                active: false
            },
            {
                id: 'click',
                title: '1-Click Version',
                description: 'Simplified one-tap interaction for better conversion',
                src: 'assets/playables/build/ex-m-click.html', // ИСПРАВЛЕНО
                active: false
            }
        ];

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/portfolio/components/css/portfolioBuild.css">
            
            <section class="portfolio-build-section">
                <div class="build-header">
                    <h2>What we can build for you?</h2>
                    <a href="#see-more" class="see-more-link">
                        See more
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </a>
                </div>

                <div class="build-interactive">
                    <!-- Левая колонка -->
                    <div class="features-left">
                        ${features.slice(0, 2).map((feature, index) => `
                            <div class="feature-card ${feature.active ? 'active' : ''}" data-feature="${feature.id}">
                                <div class="feature-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </div>
                                <div class="feature-content">
                                    <h3 class="feature-title">${feature.title}</h3>
                                    <p class="feature-description">${feature.description}</p>
                                </div>
                               
                            </div>
                        `).join('')}
                    </div>

                    <!-- Телефон по центру -->
                    <div class="phone-container">
                        <div class="phone-frame">
                            <div class="phone-notch"></div>
                            <div class="phone-screen">
                                <div class="playable-wrapper">
                                    <div class="playable-preloader ${this.currentPlayable === '2d' ? 'active' : ''}">
                                        <div class="preloader-spinner"></div>
                                        <div class="preloader-text">Loading...</div>
                                    </div>
                                    <iframe 
                                        src="${features[0].src}" 
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
                        ${features.slice(2).map((feature, index) => `
                            <div class="feature-card ${feature.active ? 'active' : ''}" data-feature="${feature.id}">
                                <div class="feature-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </div>
                                <div class="feature-content">
                                    <h3 class="feature-title">${feature.title}</h3>
                                    <p class="feature-description">${feature.description}</p>
                                </div>
                                <div class="feature-line">
                                    <div class="line-progress" style="animation-delay: ${index * 0.1}s"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;

        this.initFeatures(features);
    }

    initFeatures(features) {
        const cards = this.shadowRoot.querySelectorAll('.feature-card');
        const iframe = this.shadowRoot.querySelector('#playable-frame');
        const preloader = this.shadowRoot.querySelector('.playable-preloader');
        const lineProgresses = this.shadowRoot.querySelectorAll('.line-progress');

        // Функция для загрузки playable
        const loadPlayable = (featureId, card) => {
            if (this.isLoading) return; // Защита от множественных кликов
            this.isLoading = true;

            const feature = features.find(f => f.id === featureId);
            
            if (feature) {
                // Обновляем активный класс
                cards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                // Анимация линий
                lineProgresses.forEach((line, index) => {
                    line.style.animation = 'none';
                    setTimeout(() => {
                        line.style.animation = `lineProgress 0.6s ease forwards`;
                        line.style.animationDelay = `${index * 0.1}s`;
                    }, 10);
                });

                // Показываем preloader
                preloader.classList.add('active');
                
                // Меняем src iframe
                iframe.src = feature.src;
                
                // Скрываем preloader после загрузки
                iframe.onload = () => {
                    setTimeout(() => {
                        preloader.classList.remove('active');
                        this.isLoading = false;
                        
                        // Заполняем линии до конца
                        lineProgresses.forEach(line => {
                            line.style.width = '100%';
                        });
                    }, 500);
                };

                // Fallback на случай если onload не сработает (3 секунды)
                setTimeout(() => {
                    if (this.isLoading) {
                        preloader.classList.remove('active');
                        this.isLoading = false;
                        lineProgresses.forEach(line => {
                            line.style.width = '100%';
                        });
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

        // Загружаем первый playable при инициализации
        const firstCard = cards[0];
        if (firstCard) {
            setTimeout(() => {
                loadPlayable(firstCard.dataset.feature, firstCard);
            }, 100);
        }
    }
}

customElements.define('portfolio-build', PortfolioBuild);