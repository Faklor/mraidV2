class DashboardShowcase extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const features = [
            {
                icon: 'assets/img/dashboard/icons/icon1.png',
                title: 'Customize',
                description: 'Edit text, images, colors, characters and more'
            },
            {
                icon: 'assets/img/dashboard/icons/icon2.png',
                title: 'Save & manage',
                description: 'Create and save multiple versions of your playable'
            },
            {
                icon: 'assets/img/dashboard/icons/icon3.png',
                title: 'Real-time preview',
                description: 'See changes instantly across devices'
            },
            {
                icon: 'assets/img/dashboard/icons/icon4.png',
                title: 'AI-powered',
                description: 'Generate assets, backgrounds and variations with AI'
            },
            {
                icon: 'assets/img/dashboard/icons/icon5.png',
                title: 'Export anywhere',
                description: 'Build and export to all major ad platforms in one click'
            }
        ];

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/dashboard/components/css/showCase.css">
            
            <section class="dashboard-showcase">
                <!-- Фоновый looper -->
                <div class="bg-looper-wrapper">
                    <img src="assets/img/looper.png" alt="Background" class="bg-looper">
                </div>

                <div class="showcase-content">
                    <!-- Заголовок и кнопки -->
                    <div class="showcase-header">
                        <h1 class="showcase-title">
                            Creative<br>
                            <span class="title-red">Dashboard</span>
                        </h1>
                        <p class="showcase-subtitle">
                            Build. Customize. Launch. Your playables, your way.
                        </p>
                        <p class="showcase-description">
                            All the tools you need to customize playables, preview in real time, 
                            and export production-ready builds for all major ad networks
                        </p>
                        <div class="showcase-buttons">
                            <a href="https://dashboard.mraid.io/" class="btn-primary">
                                Login in Dashboard
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </a>
                            <button class="btn-secondary">See how it works</button>
                        </div>
                    </div>

                    <!-- Изображение ноутбука -->
                    <div class="showcase-image">
                        <img src="assets/img/dashboard/main.png" alt="Dashboard on laptop">
                    </div>
                </div>

                <!-- Секция с фичами -->
                <div class="features-section">
                    <h2 class="features-title">Everything you need in one place</h2>
                    
                    <div class="features-grid">
                        ${features.map(feature => `
                            <div class="feature-card">
                                <div class="feature-icon">
                                    <img src="${feature.icon}" alt="${feature.title}">
                                </div>
                                <h3 class="feature-title">${feature.title}</h3>
                                <p class="feature-description">${feature.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('dashboard-showcase', DashboardShowcase);