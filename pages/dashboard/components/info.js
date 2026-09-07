class DashboardInfo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const features = [
            {
                icon: 'assets/img/dashboard/info/time.png',
                title: 'Save time',
                description: 'Create multiple versions in minutes, not days'
            },
            {
                icon: 'assets/img/dashboard/info/dash.png',
                title: 'Scale campaigns',
                description: 'Quickly adapt playables for different markets and audiences'
            },
            {
                icon: 'assets/img/dashboard/info/roket.png',
                title: 'Boost performance',
                description: 'A/B test variations and find what works best'
            },
            {
                icon: 'assets/img/dashboard/info/group.png',
                title: 'Collaborate easily',
                description: 'Share access and manage projects with your team'
            }
        ];

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/dashboard/components/css/info.css">
            
            <section class="dashboard-info">
                <div class="info-container">
                    <h2 class="info-heading">Built for marketers and agencies</h2>
                    
                    <div class="features-grid">
                        ${features.map(feature => `
                            <div class="feature-box">
                                <div class="feature-icon">
                                    <img src="${feature.icon}" alt="${feature.title}">
                                </div>
                                <div class="feature-text">
                                    <h3 class="feature-title">${feature.title}</h3>
                                    <p class="feature-description">${feature.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="cta-banner">
                        <div class="banner-content">
                            <div class="banner-icon">
                                <img src="assets/img/dashboard/info/message.png" alt="Message">
                            </div>
                            <div class="banner-text">
                                <h3 class="banner-title">Get full access to the Dashboard</h3>
                                <p class="banner-description">
                                    Start customizing playables for free and export production-ready builds in just a few clicks.
                                </p>
                            </div>
                        </div>
                        <a href="#login" class="banner-btn">
                            Login in Dashboard
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('dashboard-info', DashboardInfo);