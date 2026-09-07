class AboutStory extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const stats = [
            {
                icon: 'assets/img/about/story/icon1.png',
                number: '2018',
                label: 'Founded'
            },
            {
                icon: 'assets/img/about/story/icon2.png',
                number: '3000+',
                label: 'playables delivered'
            },
            {
                icon: 'assets/img/about/story/icon3.png',
                number: 'Global',
                label: 'clients worldwide'
            }
        ];

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/contact/components/css/story.css">
            
            <section class="about-story">
                <div class="story-container">
                    <h2 class="story-heading">Our story</h2>
                    
                    <div class="story-content">
                        <div class="story-text">
                            <h3 class="story-title">From games to playables</h3>
                            <p class="story-description">
                                In 2018, <span class="text-red">MRAID.IO</span> was officially founded with one simple goal: build playable ads that people actually want to play. Today, we're a full-cycle playable studio with 1,000+ playables delivered worldwide.
                            </p>
                        </div>

                        <div class="stats-grid">
                            ${stats.map(stat => `
                                <div class="stat-item">
                                    <div class="stat-icon">
                                        <img src="${stat.icon}" alt="${stat.label}">
                                    </div>
                                    <div class="stat-number">${stat.number}</div>
                                    <div class="stat-label">${stat.label}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('about-story', AboutStory);