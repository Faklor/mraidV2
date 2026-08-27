class TrustedBy extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const studios = [
            { name: 'Jam City', file: 'jam-city.png' },
            { name: 'Kabam', file: 'kabam.png' },
            { name: 'Paramount', file: 'paramount.png' },
            { name: 'Scopely', file: 'scopely.png' },
            { name: 'Good Job', file: 'goodjob.png' },
            { name: 'Disney', file: 'disney.png' },
            { name: 'Marvel', file: 'marvel.png' },
            { name: 'BBC', file: 'bbc.png' },
            { name: 'Ubisoft', file: 'ubisoft.png' },
            { name: 'Lionsgate', file: 'lionsgate.png' },
            { name: 'Kama Games', file: 'kama-games.png' },
            { name: 'MG', file: 'mg.png' }
        ];

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/home/components/css/trustedBy.css">
            
            <div class="trusted-section">
                <h2>Trusted by leading game studios & brands</h2>
                <div class="logos-grid">
                    ${studios.map(s => `
                        <div class="logo-item">
                            <img src="assets/img/clients/${s.file}" alt="${s.name}" loading="lazy">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

customElements.define('trusted-by', TrustedBy);