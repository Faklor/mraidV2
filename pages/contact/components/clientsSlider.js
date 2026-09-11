class ClientsSlider extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentSlide = 0;
        this.autoPlayInterval = null;
    }

    connectedCallback() {
        
        const testimonials = [
            {
                text: "Thanks for your help! I've got a chance to check it and thank you for updating a lot of things the way we wanted.",
                logo: 'assets/img/clients/yallaplay.png'
            },
            {
                text: "Thanks for this. We're now making a few variations. Overall this video looks great. We would like to use this process going forward.",
                logo: 'assets/img/clients/fusebox.png'
            },
            {
                text: "Thank you for your effort. It's turned out to be a really nice playable. The assets are clear, the movement and gameplay are good.",
                logo: 'assets/img/clients/yallaplay.png'
            },
            {
                text: "Looks great and the client loves it, so thank you for that.",
                logo: 'assets/img/clients/venatus.png'
            },
            {
                text: "First of all thanks for the storyboard, it's really good for understanding the flow.",
                logo: 'assets/img/clients/yallaplay.png'
            },
            {
                text: "Thank you very much. We can proceed with the builds now. I want to keep working with you since we've already set the core mechanics.",
                logo: 'assets/img/clients/tale-monster.png'
            },
            {
                text: "Thanks for the version! It's already really fun to play!",
                logo: 'assets/img/clients/kefir.png'
            },
            {
                text: "That's great. The animations add a lot! Nice work! Approved.",
                logo: 'assets/img/clients/game-story.png'
            }
        ];

        this.testimonials = testimonials;
        this.renderSlider();
    }

    disconnectedCallback() {
       
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }

    renderSlider() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/contact/components/css/clientsSlider.css">
            
            <section class="clients-slider-section">
                <h2 class="slider-heading">What our clients say</h2>
                
                <div class="slider-wrapper">
                    <button class="slider-nav prev" aria-label="Previous">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <div class="slider-track-wrapper">
                        <div class="slider-track">
                           ${this.testimonials.map((testimonial, index) => `
                                <div class="testimonial-card ${index === this.currentSlide ? 'active' : ''}">
                                    <div class="testimonial-content">
                                        <div class="quote-icon">
                                            <img src="assets/img/about/clients-icon.png" alt="Quote">
                                        </div>
                                        <p class="testimonial-text">"${testimonial.text}"</p>
                                    </div>
                                    <div class="testimonial-author">
                                        <div class="author-logo">
                                            <img src="${testimonial.logo}" alt="Client Logo">
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <button class="slider-nav next" aria-label="Next">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div class="slider-dots">
                    ${this.testimonials.map((_, index) => `
                        <span class="dot ${index === this.currentSlide ? 'active' : ''}" data-index="${index}"></span>
                    `).join('')}
                </div>
            </section>
        `;

        this.initSlider();
    }

    initSlider() {
        const prevBtn = this.shadowRoot.querySelector('.slider-nav.prev');
        const nextBtn = this.shadowRoot.querySelector('.slider-nav.next');
        const dots = this.shadowRoot.querySelectorAll('.dot');
        const track = this.shadowRoot.querySelector('.slider-track');

        const updateSlider = () => {
            const cards = this.shadowRoot.querySelectorAll('.testimonial-card');
            cards.forEach((card, index) => {
                card.classList.toggle('active', index === this.currentSlide);
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentSlide);
            });

            if (track && cards[0]) {
                const cardWidth = cards[0].offsetWidth;
                const gap = 24; 
                track.style.transform = `translateX(-${this.currentSlide * (cardWidth + gap)}px)`;
            }
        };

        
        prevBtn?.addEventListener('click', () => {
            this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.testimonials.length - 1;
            updateSlider();
            this.resetAutoPlay(updateSlider);
        });

        nextBtn?.addEventListener('click', () => {
            this.currentSlide = this.currentSlide < this.testimonials.length - 1 ? this.currentSlide + 1 : 0;
            updateSlider();
            this.resetAutoPlay(updateSlider);
        });

        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                this.currentSlide = parseInt(dot.dataset.index);
                updateSlider();
                this.resetAutoPlay(updateSlider);
            });
        });

        this.startAutoPlay(updateSlider);
    }

    startAutoPlay(updateSlider) {
        this.autoPlayInterval = setInterval(() => {
            this.currentSlide = this.currentSlide < this.testimonials.length - 1 ? this.currentSlide + 1 : 0;
            updateSlider();
        }, 6000); 
    }

    resetAutoPlay(updateSlider) {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        this.startAutoPlay(updateSlider);
    }
}

customElements.define('clients-slider', ClientsSlider);