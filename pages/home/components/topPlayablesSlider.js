class TopPlayablesSlider extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0;
        this.cardsPerView = 6;
        this.cardsData = [];
        this.resizeObserver = null;
    }

    async connectedCallback() {
        // Показываем состояние загрузки
        this.shadowRoot.innerHTML = `<div style="padding: 40px; text-align: center; color: #888;">Loading playables...</div>`;
        
        await this.loadData();
        this.render();
        this.initSlider();
        
        // Используем ResizeObserver вместо window.resize для лучшей производительности
        this.resizeObserver = new ResizeObserver(() => {
            this.updateCardsPerView();
            this.updateSliderPosition();
        });
        this.resizeObserver.observe(this.shadowRoot.querySelector('.slider-track-wrapper'));
    }

    disconnectedCallback() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    async loadData() {
        try {
            // ⚠️ ВАЖНО: Укажи здесь правильный путь к твоему JSON файлу!
            const response = await fetch('assets/data/projects-data.json');
            if (!response.ok) throw new Error('Failed to load JSON');
            
            const data = await response.json();
            
            // Берем первые 12 проектов для слайдера (можно изменить число)
            this.cardsData = data.slice(0, 12).map(item => {
                // Умно хитрость: извлекаем категорию из первого слова title 
                // (например, "Match Project 5" -> "Match", "Casual Project 17" -> "Casual")
                const category = item.title.split(' ')[0] || 'Playable';
                
                return {
                    title: item.title,
                    image: item.image,
                    url: item.url,
                    category: category
                };
            });
        } catch (error) {
            console.error('Error loading slider data:', error);
            // Fallback данные на случай ошибки загрузки
            this.cardsData = [];
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/home/components/css/topPlayablesSlider.css">
            
            <div class="slider-section">
                <div class="slider-header">
                    <h2>Top performing playables</h2>
                    <a href="#portfolio" class="see-more">
                        See more 
                        <span class="arrow">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </a>
                </div>

                <div class="slider-container">
                    <button class="slider-btn prev-btn" aria-label="Previous">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <div class="slider-track-wrapper">
                        <div class="slider-track">
                            ${this.cardsData.map((card, index) => `
                                <div class="slider-card" data-index="${index}" data-url="${card.url}">
                                    <div class="card-image">
                                        <img src="${card.image}" alt="${card.title}" loading="lazy">
                                    </div>
                                    <div class="card-info">
                                        <span class="card-title">${card.title}</span>
                                        <span class="card-category">${card.category}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <button class="slider-btn next-btn" aria-label="Next">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div class="slider-dots">
                    ${this.generateDots()}
                </div>
            </div>
        `;
    }

    generateDots() {
        const totalPages = Math.ceil(this.cardsData.length / this.cardsPerView);
        let dots = '';
        for (let i = 0; i < totalPages; i++) {
            dots += `<span class="dot ${i === 0 ? 'active' : ''}" data-page="${i}"></span>`;
        }
        return dots;
    }

    initSlider() {
        const track = this.shadowRoot.querySelector('.slider-track');
        const prevBtn = this.shadowRoot.querySelector('.prev-btn');
        const nextBtn = this.shadowRoot.querySelector('.next-btn');
        const dots = this.shadowRoot.querySelectorAll('.dot');
        const cards = this.shadowRoot.querySelectorAll('.slider-card');

        // === ЛОГИКА КЛИКА ПО КАРТОЧКЕ ===
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const url = card.getAttribute('data-url');
                if (url) {
                    window.open(url, '_blank'); // Открываем ссылку в новой вкладке
                }
            });
        });

        this.updateSliderPosition = () => {
            if (!track || !track.querySelector('.slider-card')) return;
            
            const cardWidth = track.querySelector('.slider-card').offsetWidth;
            const gap = 24; // Должен совпадать с gap в CSS
            const offset = -(this.currentIndex * (cardWidth + gap));
            
            track.style.transform = `translateX(${offset}px)`;

            // Обновляем точки
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });

            // Управление прозрачностью кнопок
            const maxIndex = Math.ceil(this.cardsData.length / this.cardsPerView) - 1;
            prevBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '1';
            prevBtn.style.pointerEvents = this.currentIndex === 0 ? 'none' : 'auto';
            
            nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.3' : '1';
            nextBtn.style.pointerEvents = this.currentIndex >= maxIndex ? 'none' : 'auto';
        };

        prevBtn.addEventListener('click', () => {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.updateSliderPosition();
            }
        });

        nextBtn.addEventListener('click', () => {
            const maxIndex = Math.ceil(this.cardsData.length / this.cardsPerView) - 1;
            if (this.currentIndex < maxIndex) {
                this.currentIndex++;
                this.updateSliderPosition();
            }
        });

        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                this.currentIndex = parseInt(dot.dataset.page);
                this.updateSliderPosition();
            });
        });

        // Первичная инициализация
        this.updateCardsPerView();
        // Небольшая задержка, чтобы браузер успел отрисовать DOM и рассчитать ширину
        setTimeout(() => this.updateSliderPosition(), 100);
    }

    updateCardsPerView() {
        const width = this.shadowRoot.querySelector('.slider-track-wrapper')?.offsetWidth || window.innerWidth;
        
        if (width <= 768) {
            this.cardsPerView = 2;
        } else if (width <= 1024) {
            this.cardsPerView = 3;
        } else if (width <= 1440) {
            this.cardsPerView = 4;
        } else {
            this.cardsPerView = 6;
        }
        
        // Перерисовываем точки при изменении количества видимых карточек
        const dotsContainer = this.shadowRoot.querySelector('.slider-dots');
        if (dotsContainer) {
            dotsContainer.innerHTML = this.generateDots();
            // Обновляем слушатели для новых точек
            dotsContainer.querySelectorAll('.dot').forEach((dot) => {
                dot.addEventListener('click', () => {
                    this.currentIndex = parseInt(dot.dataset.page);
                    this.updateSliderPosition();
                });
            });
        }
    }
}

customElements.define('top-playables-slider', TopPlayablesSlider);