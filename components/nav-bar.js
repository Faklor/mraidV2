class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const linksData = JSON.parse(this.getAttribute('links') || '[]');
        const ctaText = this.getAttribute('cta-text') || 'Let\'s talk';
        const ctaHref = this.getAttribute('cta-href') || '#contact';
        
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="components/css/nav-bar.css">
            
            <button class="hamburger" aria-label="Открыть меню">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav>
                ${linksData.map(link => `
                    <a href="${link.href}" class="nav-link">${link.text}</a>
                `).join('')}
                
                <a href="${ctaHref}" class="nav-cta-btn">
                    <span>${ctaText}</span>
                    <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3609 13.542L19.543 7.04199L11.3609 0.541992M19.543 7.04199H0.542968" stroke="white" stroke-width="1.08428" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </nav>
        `;

        const hamburger = this.shadowRoot.querySelector('.hamburger');
        hamburger.addEventListener('click', () => {
            this.classList.toggle('menu-open');
        });

        const nav = this.shadowRoot.querySelector('nav');
        nav.addEventListener('click', (e) => {
            const targetLink = e.target.closest('a');
            if (targetLink) {
                this.classList.remove('menu-open');
                // Плавный скролл обрабатывается CSS (scroll-behavior: smooth)
            }
        });

        // Первоначальная проверка видимости кнопки
        this.updateCTAVisibility();

        // Следим за изменением хеша в URL (кнопки назад/вперед или ручной ввод)
        window.addEventListener('hashchange', () => {
            this.updateCTAVisibility();
        });

        // Запускаем надежный Scroll Spy
        this.setupScrollSpy();
    }

    // === ПЛАВНОЕ СКРЫТИЕ/ПОКАЗ КНОПКИ ===
    updateCTAVisibility() {
        const ctaBtn = this.shadowRoot.querySelector('.nav-cta-btn');
        if (!ctaBtn) return;

        const currentHash = window.location.hash || '#home';
        const ctaHref = ctaBtn.getAttribute('href');

        if (currentHash === ctaHref) {
            ctaBtn.classList.add('is-hidden');
        } else {
            ctaBtn.classList.remove('is-hidden');
        }
    }

    // === НАДЕЖНЫЙ SCROLL SPY ===
    setupScrollSpy() {
        const sections = document.querySelectorAll('.landing-section');
        const navLinks = this.shadowRoot.querySelectorAll('.nav-link');
        const ctaBtn = this.shadowRoot.querySelector('.nav-cta-btn');
        const ctaHref = ctaBtn ? ctaBtn.getAttribute('href') : '#contact';

        // УЛУЧШЕННЫЙ rootMargin: 
        // -80px сверху (чтобы игнорировать фиксированную шапку)
        // -60% снизу (чтобы секция считалась активной, когда она в верхней части экрана)
        const observerOptions = {
            root: null,
            rootMargin: '-80px 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            // Находим секцию, которая сейчас пересекает нашу "зону"
            const activeEntry = entries.find(entry => entry.isIntersecting);

            if (activeEntry) {
                const activeId = activeEntry.target.getAttribute('id');

                // 1. Обновляем активные ссылки в меню
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });

                // 2. Плавно скрываем/показываем кнопку CTA при скролле
                if (ctaBtn) {
                    if (`#${activeId}` === ctaHref) {
                        ctaBtn.classList.add('is-hidden');
                    } else {
                        ctaBtn.classList.remove('is-hidden');
                    }
                }
            }
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }
}

customElements.define('nav-bar', NavBar);