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
        this.shadowRoot.innerHTML = `<div style="padding: 40px; text-align: center; color: #888;">Loading top playables...</div>`;
        
        await this.loadData();
        this.render();
        this.initSlider();
        
        this.resizeObserver = new ResizeObserver(() => {
            this.updateCardsPerView();
            this.updateSliderPosition();
        });
        
        const wrapper = this.shadowRoot.querySelector('.slider-track-wrapper');
        if (wrapper) {
            this.resizeObserver.observe(wrapper);
        }
    }

    disconnectedCallback() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    async loadData() {
        try {
            const response = await fetch('https://dashboard.mraid.io/portfolio.json');
            if (!response.ok) throw new Error('Failed to load JSON');
            
            const data = await response.json();
            
            const favoriteProjects = data.previews.filter(item => 
                item.favorite === 1 || item.favorite === true || item.favorite === "1"
            );

            this.cardsData = favoriteProjects.map(item => {
                const category = (item.categories && item.categories.length > 0) 
                    ? item.categories[0] 
                    : 'Playable';
                
                return {
                    title: item.project || 'Unknown Project',
                    image: item.screenshot || 'assets/img/portfolio/ex_slider.png',
                    url: item.url || '#',
                    category: category
                };
            });

        } catch (error) {
            console.error('Error loading slider data:', error);
            this.cardsData = [];
        }
    }

    render() {
        if (this.cardsData.length === 0) {
            this.shadowRoot.innerHTML = `<div style="padding: 40px; text-align: center; color: #888;">No favorite playables found.</div>`;
            return;
        }

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
        const cards = this.shadowRoot.querySelectorAll('.slider-card');

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const url = card.getAttribute('data-url');
                if (url && url !== '#') {
                    window.open(url, '_blank');
                }
            });
        });

       
        this.updateSliderPosition = () => {
            if (!track || !track.querySelector('.slider-card')) return;
            
            const cardWidth = track.querySelector('.slider-card').offsetWidth;
            const gap = 24; 
            const offset = -(this.currentIndex * (cardWidth + gap));
            
            track.style.transform = `translateX(${offset}px)`;

            
            const currentDots = this.shadowRoot.querySelectorAll('.dot');
            currentDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });

            const maxIndex = Math.max(0, Math.ceil(this.cardsData.length / this.cardsPerView) - 1);
            
            
            if (this.currentIndex > maxIndex) {
                this.currentIndex = maxIndex;
                
                requestAnimationFrame(() => this.updateSliderPosition());
                return;
            }
            
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
            const maxIndex = Math.max(0, Math.ceil(this.cardsData.length / this.cardsPerView) - 1);
            if (this.currentIndex < maxIndex) {
                this.currentIndex++;
                this.updateSliderPosition();
            }
        });

       
        const attachDotListeners = () => {
            this.shadowRoot.querySelectorAll('.dot').forEach((dot) => {
                dot.addEventListener('click', () => {
                    this.currentIndex = parseInt(dot.dataset.page);
                    this.updateSliderPosition();
                });
            });
        };
        
        attachDotListeners();

        this.updateCardsPerView();
        setTimeout(() => this.updateSliderPosition(), 100);
    }

    updateCardsPerView() {
        const wrapper = this.shadowRoot.querySelector('.slider-track-wrapper');
        const width = wrapper ? wrapper.offsetWidth : window.innerWidth;
        
        if (width <= 768) {
            this.cardsPerView = 2;
        } else if (width <= 1024) {
            this.cardsPerView = 3;
        } else if (width <= 1440) {
            this.cardsPerView = 4;
        } else {
            this.cardsPerView = 6;
        }
        
        const dotsContainer = this.shadowRoot.querySelector('.slider-dots');
        if (dotsContainer) {
            dotsContainer.innerHTML = this.generateDots();
            
            
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