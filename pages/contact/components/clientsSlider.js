class ClientsSlider extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentSlide = 0;
    }

    connectedCallback() {
        const testimonials = [
            {
                text: 'MRAID.IO consistently delivers high-quality playables with great attention to detail. The team is fast, flexible and easy to work with.',
                name: 'Sarah T.',
                position: 'Marketing Lead',
                logo: 'assets/img/clients/applovin.png'
            },
            {
                text: 'Working with MRAID.IO has transformed our user acquisition strategy. Their playables consistently outperform our previous creatives.',
                name: 'Michael R.',
                position: 'Head of UA',
                logo: 'assets/img/clients/bbc.png'
            },
            {
                text: 'The creativity and technical excellence of MRAID.IO team is unmatched. They truly understand what makes users engage.',
                name: 'Emma L.',
                position: 'Creative Director',
                logo: 'assets/img/clients/disney.png'
            },
            {
                text: 'Exceptional quality and professionalism. MRAID.IO delivered beyond our expectations and helped us achieve record CPIs.',
                name: 'David K.',
                position: 'Product Manager',
                logo: 'assets/img/clients/goodjob.png'
            },
            {
                text: 'The team at MRAID.IO is incredibly talented. They bring fresh ideas and execute them flawlessly every time.',
                name: 'Lisa M.',
                position: 'Marketing Director',
                logo: 'assets/img/clients/jam-city.png'
            },
            {
                text: 'Best playable ads we have ever used. The conversion rates speak for themselves. Highly recommend MRAID.IO!',
                name: 'James P.',
                position: 'Growth Manager',
                logo: 'assets/img/clients/kabam.png'
            },
            {
                text: 'MRAID.IO understands the gaming market deeply. Their playables feel natural and drive real results for our campaigns.',
                name: 'Anna S.',
                position: 'UA Specialist',
                logo: 'assets/img/clients/kama-games.png'
            },
            {
                text: 'Outstanding work ethic and creative vision. MRAID.IO has become our go-to partner for all playable ad production.',
                name: 'Robert H.',
                position: 'CEO',
                logo: 'assets/img/clients/lionsgate.png'
            },
            {
                text: 'The attention to detail and quality of work is impressive. MRAID.IO consistently delivers playables that convert.',
                name: 'Sophie W.',
                position: 'Marketing Lead',
                logo: 'assets/img/clients/marvel.png'
            },
            {
                text: 'Fantastic experience from start to finish. The team is responsive, creative, and delivers on time every single time.',
                name: 'Tom B.',
                position: 'Product Owner',
                logo: 'assets/img/clients/mg.png'
            },
            {
                text: 'MRAID.IO has revolutionized our approach to user acquisition. Their playables are simply the best in the industry.',
                name: 'Rachel G.',
                position: 'Head of Marketing',
                logo: 'assets/img/clients/paramount.png'
            },
            {
                text: 'Professional, creative, and results-driven. MRAID.IO has exceeded our expectations on every project we have done together.',
                name: 'Chris D.',
                position: 'Studio Director',
                logo: 'assets/img/clients/scopely.png'
            },
            {
                text: 'The quality and innovation MRAID.IO brings to the table is remarkable. They are true experts in playable ad creation.',
                name: 'Nina F.',
                position: 'Creative Lead',
                logo: 'assets/img/clients/ubisoft.png'
            }
        ];

        this.testimonials = testimonials;
        this.renderSlider();
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
                                        <p class="testimonial-text">${testimonial.text}</p>
                                    </div>
                                    <div class="testimonial-author">
                                        <div class="author-info">
                                            <div class="author-name">${testimonial.name}</div>
                                            <div class="author-position">${testimonial.position}</div>
                                        </div>
                                        <div class="author-logo">
                                            <img src="${testimonial.logo}" alt="${testimonial.name}">
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

            // Сдвигаем трек
            if (track) {
                const cardWidth = cards[0]?.offsetWidth || 0;
                const gap = 24;
                track.style.transform = `translateX(-${this.currentSlide * (cardWidth + gap)}px)`;
            }
        };

        prevBtn?.addEventListener('click', () => {
            if (this.currentSlide > 0) {
                this.currentSlide--;
                updateSlider();
            }
        });

        nextBtn?.addEventListener('click', () => {
            if (this.currentSlide < this.testimonials.length - 1) {
                this.currentSlide++;
                updateSlider();
            }
        });

        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                this.currentSlide = parseInt(dot.dataset.index);
                updateSlider();
            });
        });

        // Автопрокрутка
        setInterval(() => {
            if (this.currentSlide < this.testimonials.length - 1) {
                this.currentSlide++;
            } else {
                this.currentSlide = 0;
            }
            updateSlider();
        }, 10000);
    }
}

customElements.define('clients-slider', ClientsSlider);