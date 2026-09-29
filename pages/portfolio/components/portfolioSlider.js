class PortfolioSlider extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0;
        this.cardsPerView = 6;
        this.isAnimating = false;
        this.categoryScrollPosition = 0;
        this.mechanicsScrollPosition = 0; 
        
        this.allProjects = [];
        this.uniqueCategories = ['all'];
        this.uniqueMechanics = ['all'];
        this.uniqueDimensions = ['all'];
        
        this.currentCategory = 'all';
        this.currentMechanic = 'all';
        this.currentDimension = 'all';
        this.filteredProjects = [];
    }

    async connectedCallback() {
        await this.fetchPortfolioData();
        this.renderSlider();
    }

    async fetchPortfolioData() {
        try {
            const response = await fetch('https://dashboard.mraid.io/portfolio.json');
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            
            this.allProjects = data.previews.map(item => ({
                title: item.project || 'Unknown Project',
                categories: (item.categories && item.categories.length > 0) ? item.categories.map(c => c.toLowerCase()) : ['other'],
                mechanics: (item.genres && item.genres.length > 0) ? item.genres.map(m => m.toLowerCase()) : ['other'],
                dimension: (item.formats && item.formats.length > 0) ? item.formats[0].toLowerCase() : '2d',
                image: item.screenshot || 'assets/img/portfolio/ex_slider.png',
                link: item.url || '#',
                favorite: item.favorite === 1 || item.favorite === true || item.favorite === "1"
            }));

            const rawCategories = [...new Set(this.allProjects.flatMap(p => p.categories))].sort();
            this.uniqueCategories = ['all', ...rawCategories.filter(c => c !== 'all')];

            this.updateAvailableFilters('init');
            this.applyFilters();

            window.PORTFOLIO_TOTAL_COUNT = this.allProjects.length;
            window.dispatchEvent(new CustomEvent('portfolio-data-loaded', { 
                detail: { count: this.allProjects.length } 
            }));

        } catch (error) {
            console.error('Failed to load portfolio data:', error);
            this.allProjects = [];
            this.filteredProjects = [];
        }
    }

    applyFilters() {
        if (this.isAnimating) return;
        
        this.filteredProjects = this.allProjects.filter(p => {
            const matchCategory = this.currentCategory === 'all' || p.categories.includes(this.currentCategory);
            const matchMechanic = this.currentMechanic === 'all' || p.mechanics.includes(this.currentMechanic);
            const matchDimension = this.currentDimension === 'all' || p.dimension === this.currentDimension;
            return matchCategory && matchMechanic && matchDimension;
        });

        this.filteredProjects.sort((a, b) => {
            if (a.favorite === b.favorite) return 0; 
            return a.favorite ? -1 : 1;              
        });

        const track = this.shadowRoot.querySelector('.slider-track');
        const cards = track ? track.querySelectorAll('.slider-card') : [];

        if (cards.length > 0) {
            cards.forEach(card => card.classList.add('fade-out'));
            setTimeout(() => {
                this.currentIndex = 0;
                this.renderCards();
                this.renderDots();
                
                const newCards = this.shadowRoot.querySelectorAll('.slider-card');
                newCards.forEach(card => {
                    card.classList.add('fade-in');
                    void card.offsetWidth; 
                    card.classList.remove('fade-in');
                });
                this.updateSlider();
            }, 300);
        } else {
            this.currentIndex = 0;
            this.renderCards();
            this.renderDots();
            setTimeout(() => this.updateSlider(), 50);
        }
    }

    updateAvailableFilters(changedType = 'category') {
        let validProjects = this.allProjects.filter(p => 
            this.currentCategory === 'all' || p.categories.includes(this.currentCategory)
        );

        if (this.currentMechanic !== 'all') {
            validProjects = validProjects.filter(p => p.mechanics.includes(this.currentMechanic));
        }

        if (this.currentDimension !== 'all') {
            validProjects = validProjects.filter(p => p.dimension === this.currentDimension);
        }

        const availMechanics = [...new Set(validProjects.flatMap(p => p.mechanics))].sort();
        const availDimensions = [...new Set(validProjects.map(p => p.dimension))].sort();

        this.uniqueMechanics = ['all', ...availMechanics.filter(m => m !== 'all')];
        this.uniqueDimensions = ['all', ...availDimensions.filter(d => d !== 'all')];

        if (this.currentMechanic !== 'all' && !this.uniqueMechanics.includes(this.currentMechanic)) {
            this.currentMechanic = 'all';
        }
        if (this.currentDimension !== 'all' && !this.uniqueDimensions.includes(this.currentDimension)) {
            this.currentDimension = 'all';
        }

        this.mechanicsScrollPosition = 0; 
        this.updateFilterButtons();
    }

    renderCards() {
        const track = this.shadowRoot.querySelector('.slider-track');
        if (!track) return;

        if (this.filteredProjects.length === 0) {
            track.innerHTML = '<p style="color:#888; padding:40px; width:100%; text-align:center;">No projects match these filters.</p>';
            return;
        }

        track.innerHTML = this.filteredProjects.map((p, i) => `
            <div class="slider-card" data-index="${i}" data-link="${p.link}">
                <div class="card-image">
                    <img src="${p.image}" alt="${p.title}" loading="lazy">
                </div>
            </div>
        `).join('');
    }

    renderDots() {
        const dotsContainer = this.shadowRoot.querySelector('.slider-dots');
        if (!dotsContainer) return;
        dotsContainer.innerHTML = this.generateDots();
    }

    formatLabel(id) {
        if (id === 'all') return 'All';
        return id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' ');
    }

    renderSlider() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/portfolio/components/css/portfolioSlider.css">
            <section class="portfolio-slider-section">
                <div class="slider-header">
                    <div class="header-left"><h2>Portfolio & solutions</h2></div>
                    <div class="header-right"><p>Explore our playables, choose the right format for your campaign and find a solution that fits your needs</p></div>
                </div>
                
                <div class="filter-section">
                    <div class="filter-group">
                      

                        <div class="categories-slider">
                            <div class="filter-buttons">
                                ${this.uniqueCategories.map(cat => `
                                    <button class="filter-btn ${cat === this.currentCategory ? 'active' : ''}" data-type="category" data-value="${cat}">
                                        ${this.formatLabel(cat)}
                                    </button>
                                `).join('')}
                            </div>
                            <div class="category-nav">
                                <button class="cat-nav-btn cat-prev" aria-label="Previous categories">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </button>
                                <button class="cat-nav-btn cat-next" aria-label="Next categories">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="filter-row">
                         <div class="filter-group mechanics-group">
                            <div class="mechanics-slider ${this.uniqueMechanics.length > 8 ? 'has-overflow' : ''}">
                                <div class="filter-buttons-mechanics">
                                    ${this.uniqueMechanics.map(mech => `
                                        <button class="filter-btn-mechanics ${mech === this.currentMechanic ? 'active' : ''}" data-type="mechanic" data-value="${mech}">
                                            ${this.formatLabel(mech)}
                                        </button>
                                    `).join('')}
                                </div>
                                <div class="mechanics-nav">
                                    <button class="mech-nav-btn mech-prev" aria-label="Previous mechanics">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    </button>
                                    <button class="mech-nav-btn mech-next" aria-label="Next mechanics">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="filter-group dimension-group">
                            <div class="filter-buttons-dimensions">
                                ${this.uniqueDimensions.map(dim => `
                                    <button class="filter-btn-dimension ${dim === this.currentDimension ? 'active' : ''}" data-type="dimension" data-value="${dim}">
                                        ${dim.toUpperCase()}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="slider-container">
                    <button class="slider-btn prev-btn" aria-label="Previous">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                    <div class="slider-track-wrapper">
                        <div class="slider-track"></div>
                    </div>
                    <button class="slider-btn next-btn" aria-label="Next">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                </div>
                <div class="slider-dots"></div>
            </section>
        `;

        this.initEvents();
        this.renderCards();
        this.renderDots();
        setTimeout(() => this.updateSlider(), 50);
    }

    generateDots() {
        const totalPages = Math.ceil(this.filteredProjects.length / this.cardsPerView);
        if (totalPages <= 1) return '';
        let dots = '';
        for (let i = 0; i < totalPages; i++) {
            dots += `<span class="dot ${i === 0 ? 'active' : ''}" data-page="${i}"></span>`;
        }
        return dots;
    }

    scrollCategories(direction) {
        const buttonsContainer = this.shadowRoot.querySelector('.filter-buttons');
        if (!buttonsContainer) return;
        
        const firstBtn = buttonsContainer.querySelector('.filter-btn');
        if (!firstBtn) return;
        
        const btnWidth = firstBtn.offsetWidth;
        const gap = 8;
        const scrollAmount = btnWidth + gap;
        
        const maxScroll = buttonsContainer.scrollWidth - buttonsContainer.offsetWidth;

        if (direction === 'left') {
            this.categoryScrollPosition = Math.max(0, this.categoryScrollPosition - scrollAmount);
        } else {
            this.categoryScrollPosition = Math.min(maxScroll, this.categoryScrollPosition + scrollAmount);
        }
        buttonsContainer.scrollTo({ left: this.categoryScrollPosition, behavior: 'smooth' });
        this.updateCategoryNavButtons();
    }



    updateCategoryNavButtons() {
        const buttonsContainer = this.shadowRoot.querySelector('.filter-buttons');
        const prevBtn = this.shadowRoot.querySelector('.cat-prev');
        const nextBtn = this.shadowRoot.querySelector('.cat-next');
        if (!buttonsContainer || !prevBtn || !nextBtn) return;

        const maxScroll = buttonsContainer.scrollWidth - buttonsContainer.offsetWidth;
        prevBtn.style.opacity = this.categoryScrollPosition <= 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = this.categoryScrollPosition <= 0 ? 'none' : 'auto';
        nextBtn.style.opacity = this.categoryScrollPosition >= maxScroll ? '0.3' : '1';
        nextBtn.style.pointerEvents = this.categoryScrollPosition >= maxScroll ? 'none' : 'auto';
    }

    scrollMechanics(direction) {
        const container = this.shadowRoot.querySelector('.filter-buttons-mechanics');
        if (!container) return;
        
        const firstBtn = container.querySelector('.filter-btn-mechanics');
        if (!firstBtn) return;
        
        const btnWidth = firstBtn.offsetWidth;
        const gap = 10;
        const scrollAmount = btnWidth + gap;
        
        const maxScroll = container.scrollWidth - container.offsetWidth;

        if (direction === 'left') {
            this.mechanicsScrollPosition = Math.max(0, this.mechanicsScrollPosition - scrollAmount);
        } else {
            this.mechanicsScrollPosition = Math.min(maxScroll, this.mechanicsScrollPosition + scrollAmount);
        }
        container.scrollTo({ left: this.mechanicsScrollPosition, behavior: 'smooth' });
        this.updateMechanicsNavButtons();
    }

    updateMechanicsNavButtons() {
        const container = this.shadowRoot.querySelector('.filter-buttons-mechanics');
        const prevBtn = this.shadowRoot.querySelector('.mech-prev');
        const nextBtn = this.shadowRoot.querySelector('.mech-next');
        if (!container || !prevBtn || !nextBtn) return;

        const maxScroll = container.scrollWidth - container.offsetWidth;
        prevBtn.style.opacity = this.mechanicsScrollPosition <= 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = this.mechanicsScrollPosition <= 0 ? 'none' : 'auto';
        nextBtn.style.opacity = this.mechanicsScrollPosition >= maxScroll ? '0.3' : '1';
        nextBtn.style.pointerEvents = this.mechanicsScrollPosition >= maxScroll ? 'none' : 'auto';
    }

    initEvents() {
        const filterSection = this.shadowRoot.querySelector('.filter-section');
        if (filterSection) {
            filterSection.addEventListener('click', (e) => {
                const btn = e.target.closest('.filter-btn, .filter-btn-mechanics, .filter-btn-dimension');
                if (!btn || btn.classList.contains('active')) return;
                
                const type = btn.dataset.type;
                const value = btn.dataset.value;
                
                if (type === 'category') {
                    this.shadowRoot.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.currentCategory = value;
                    this.currentMechanic = 'all';
                    this.currentDimension = 'all';
                    this.updateAvailableFilters('category');
                } 
                else if (type === 'mechanic') {
                    this.currentMechanic = value;
                    this.updateAvailableFilters('mechanic');
                } 
                else if (type === 'dimension') {
                    this.currentDimension = value;
                    this.updateAvailableFilters('dimension');
                }
                this.applyFilters();
            });
        }

        const catPrevBtn = this.shadowRoot.querySelector('.cat-prev');
        const catNextBtn = this.shadowRoot.querySelector('.cat-next');
        if (catPrevBtn) catPrevBtn.addEventListener('click', () => this.scrollCategories('left'));
        if (catNextBtn) catNextBtn.addEventListener('click', () => this.scrollCategories('right'));

        const mechPrevBtn = this.shadowRoot.querySelector('.mech-prev');
        const mechNextBtn = this.shadowRoot.querySelector('.mech-next');
        if (mechPrevBtn) mechPrevBtn.addEventListener('click', () => this.scrollMechanics('left'));
        if (mechNextBtn) mechNextBtn.addEventListener('click', () => this.scrollMechanics('right'));

        const prevBtn = this.shadowRoot.querySelector('.prev-btn');
        const nextBtn = this.shadowRoot.querySelector('.next-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.isAnimating || this.currentIndex === 0) return;
                this.isAnimating = true;
                this.currentIndex--;
                this.updateSlider();
                setTimeout(() => { this.isAnimating = false; }, 500);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const maxIndex = Math.max(0, Math.ceil(this.filteredProjects.length / this.cardsPerView) - 1);
                if (this.isAnimating || this.currentIndex >= maxIndex) return;
                this.isAnimating = true;
                this.currentIndex++;
                this.updateSlider();
                setTimeout(() => { this.isAnimating = false; }, 500);
            });
        }

        this.shadowRoot.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) {
                const newIndex = parseInt(e.target.dataset.page);
                if (this.isAnimating || newIndex === this.currentIndex) return;
                this.isAnimating = true;
                this.currentIndex = newIndex;
                this.updateSlider();
                setTimeout(() => { this.isAnimating = false; }, 500);
            }
            if (e.target.closest('.slider-card')) {
                const card = e.target.closest('.slider-card');
                const link = card.dataset.link;
                if (link && link !== '#') window.open(link, '_blank');
            }
        });

        window.addEventListener('resize', () => {
            this.updateCardsPerView();
            this.currentIndex = 0;
            this.renderCards();
            this.renderDots();
            setTimeout(() => this.updateSlider(), 50);
        });
    }

    updateCardsPerView() {
        const width = window.innerWidth;
        if (width <= 768) this.cardsPerView = 2;
        else if (width <= 1024) this.cardsPerView = 3;
        else if (width <= 1440) this.cardsPerView = 4;
        else this.cardsPerView = 6;
    }

    updateSlider() {
        const track = this.shadowRoot.querySelector('.slider-track');
        const wrapper = this.shadowRoot.querySelector('.slider-track-wrapper');
        const prevBtn = this.shadowRoot.querySelector('.prev-btn');
        const nextBtn = this.shadowRoot.querySelector('.next-btn');
        const dots = this.shadowRoot.querySelectorAll('.dot');

        if (!track || !wrapper || this.filteredProjects.length === 0) return;

        const cards = track.querySelectorAll('.slider-card');
        if (cards.length === 0) return;

        const wrapperWidth = wrapper.offsetWidth;
        const gap = 24;
        const cardWidth = (wrapperWidth - gap * (this.cardsPerView - 1)) / this.cardsPerView;

        cards.forEach(card => {
            card.style.width = cardWidth + 'px';
        });

        const step = cardWidth + gap;
        const offset = -(this.currentIndex * step);
        
        track.style.transform = `translateX(${offset}px)`;

        dots.forEach((dot, index) => dot.classList.toggle('active', index === this.currentIndex));

        const maxIndex = Math.max(0, Math.ceil(this.filteredProjects.length / this.cardsPerView) - 1);
        
        if (prevBtn) {
            prevBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '1';
            prevBtn.style.pointerEvents = this.currentIndex === 0 ? 'none' : 'auto';
        }
        if (nextBtn) {
            nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.3' : '1';
            nextBtn.style.pointerEvents = this.currentIndex >= maxIndex ? 'none' : 'auto';
        }
    }

    updateFilterButtons() {
        const mechContainer = this.shadowRoot.querySelector('.mechanics-group .filter-buttons-mechanics');
        if (mechContainer) {
            mechContainer.innerHTML = this.uniqueMechanics.map(mech => `
                <button class="filter-btn-mechanics ${mech === this.currentMechanic ? 'active' : ''}" data-type="mechanic" data-value="${mech}">
                    ${this.formatLabel(mech)}
                </button>
            `).join('');
        }

        const dimContainer = this.shadowRoot.querySelector('.dimension-group .filter-buttons-dimensions');
        if (dimContainer) {
            dimContainer.innerHTML = this.uniqueDimensions.map(dim => `
                <button class="filter-btn-dimension ${dim === this.currentDimension ? 'active' : ''}" data-type="dimension" data-value="${dim}">
                    ${dim.toUpperCase()}
                </button>
            `).join('');
        }

        // Проверяем реальный overflow вместо подсчета
        setTimeout(() => {
            const mechanicsSlider = this.shadowRoot.querySelector('.mechanics-slider');
            const buttonsContainer = this.shadowRoot.querySelector('.filter-buttons-mechanics');
            
            if (mechanicsSlider && buttonsContainer) {
                const hasOverflow = buttonsContainer.scrollWidth > buttonsContainer.offsetWidth;
                if (hasOverflow) {
                    mechanicsSlider.classList.add('has-overflow');
                } else {
                    mechanicsSlider.classList.remove('has-overflow');
                }
            }
            
            this.updateCategoryNavButtons();
            this.updateMechanicsNavButtons();
        }, 100);
    }
}

customElements.define('portfolio-slider', PortfolioSlider);