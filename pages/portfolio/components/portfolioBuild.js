class PortfolioBuild extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const services = [
            {
                title: 'Reskin from library',
                description: 'Quick & cost-effective way to launch a playable with proven performance',
                image: 'assets/img/portfolio/build/port-build1.png',
                link: '#reskin'
            },
            {
                title: '2D Playable',
                description: 'Custom 2D playables built around your game or product',
                image: 'assets/img/portfolio/build/port-build2.png',
                link: '#2d-playable'
            },
            {
                title: '3D Playable',
                description: 'Interactive 3D experiences with characters, environments and animations',
                image: 'assets/img/portfolio/build/port-build3.png',
                link: '#3d-playable'
            },
            {
                title: 'Playable variations',
                description: 'Multiple creative variations to test different mechanics, visuals and hooks',
                image: 'assets/img/portfolio/build/port-build4.png',
                link: '#variations'
            },
            {
                title: 'Full-Cycle Production',
                description: 'Concept Art → Development → Testing Builds. We handle the entire production',
                image: 'assets/img/portfolio/build/port-build5.png',
                link: '#full-cycle'
            }
        ];

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/portfolio/components/css/portfolioBuild.css">
            
            <section class="portfolio-build-section">
                <div class="build-header">
                    <h2>What we can build for you?</h2>
                </div>

                 <div class="build-cards">
                    ${services.map(service => `
                        <div class="build-card">
                            <h3 class="build-title">${service.title}</h3>
                            <div class="build-image">
                                <!-- Блик на фоне -->
                                <div class="build-blick"></div>
                                
                                <!-- Основная картинка по центру -->
                                <img src="${service.image}" alt="${service.title}" class="portfolio-inner-img">
                            </div>
                            <p class="build-description">${service.description}</p>
                            <a href="${service.link}" class="build-link">
                                See more
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </a>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }
}

customElements.define('portfolio-build', PortfolioBuild);