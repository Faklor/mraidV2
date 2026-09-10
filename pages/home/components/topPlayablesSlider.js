class TopPlayablesSlider extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0;
        this.cardsPerView = 6; // По умолчанию показываем 6 карточек
    }

    connectedCallback() {
        // Генерируем данные для 10 карточек
        const cards = [];
        for (let i = 1; i <= 10; i++) {
            cards.push({
                image: `assets/img/card/card${i}.png`,
                title: 'Match-3',
                category: 'Pazle'
            });
        }

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/home/components/css/topPlayablesSlider.css">
            
            <div class="slider-section">
                <div class="slider-header">
                    <h2>Top performing playables</h2>
                    <a href="#portfolio" class="see-more">See more <span class="arrow">
                    <svg width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.2125 32.5751L37.5 17.2875L22.2125 2M37.5 17.2875H2" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    </span></a>
                </div>

                <div class="slider-container">
                    <button class="slider-btn prev-btn" aria-label="Previous">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <div class="slider-track-wrapper">
                        <div class="slider-track">
                            ${cards.map((card, index) => `
                                <div class="slider-card" data-index="${index}">
                                    <div class="card-image">
                                        <img src="${card.image}" alt="${card.title}">
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
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>

                <div class="slider-dots">
                    ${this.generateDots(cards.length)}
                </div>
            </div>
        `;

        this.initSlider(cards.length);
    }

    generateDots(totalCards) {
        const totalPages = Math.ceil(totalCards / this.cardsPerView);
        let dots = '';
        for (let i = 0; i < totalPages; i++) {
            dots += `<span class="dot ${i === 0 ? 'active' : ''}" data-page="${i}"></span>`;
        }
        return dots;
    }

    initSlider(totalCards) {
        const track = this.shadowRoot.querySelector('.slider-track');
        const prevBtn = this.shadowRoot.querySelector('.prev-btn');
        const nextBtn = this.shadowRoot.querySelector('.next-btn');
        const dots = this.shadowRoot.querySelectorAll('.dot');

        const updateSlider = () => {
            const cardWidth = track.querySelector('.slider-card').offsetWidth;
            const gap = 24; // gap между карточками из CSS
            const offset = -(this.currentIndex * (cardWidth + gap));
            track.style.transform = `translateX(${offset}px)`;

            // Обновляем точки
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });

            // Скрываем/показываем кнопки
            prevBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '1';
            nextBtn.style.opacity = this.currentIndex >= Math.ceil(totalCards / this.cardsPerView) - 1 ? '0.3' : '1';
        };

        prevBtn.addEventListener('click', () => {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                updateSlider();
            }
        });

        nextBtn.addEventListener('click', () => {
            const maxIndex = Math.ceil(totalCards / this.cardsPerView) - 1;
            if (this.currentIndex < maxIndex) {
                this.currentIndex++;
                updateSlider();
            }
        });

        // Клик по точкам
        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                this.currentIndex = parseInt(dot.dataset.page);
                updateSlider();
            });
        });

        // Обновляем при изменении размера окна
        window.addEventListener('resize', () => {
            this.updateCardsPerView();
            updateSlider();
        });

        // Инициализация
        this.updateCardsPerView();
        updateSlider();
    }

    updateCardsPerView() {
        const width = window.innerWidth;
        if (width <= 768) {
            this.cardsPerView = 2;
        } else if (width <= 1024) {
            this.cardsPerView = 3;
        } else if (width <= 1440) {
            this.cardsPerView = 4;
        } else {
            this.cardsPerView = 6;
        }
    }
}

customElements.define('top-playables-slider', TopPlayablesSlider);