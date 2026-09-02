class PriceCards extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const plans = [
            {
                title: 'Reskin from library',
                description: 'Replace assets, keep proven mechanics and layout',
                features: [
                    'Asset replacement (art, texts, characters)',
                    'Proven high-performing monetization & layout',
                    'Builds for all major ad networks',
                    'Free access to Dashboard (create custom versions for free with AI asset generation)',
                    'Technical support'
                ],
                price: 'From $1,500',
                popular: false
            },
            {
                title: 'Unique 2D/3D Playable',
                description: 'Custom mechanics built around your game or product',
                features: [
                    'Custom unique mechanics',
                    '2 FREE iterations (adjust duration & difficulty)',
                    'Builds for all major ad networks',
                    'Free access to Dashboard (create custom versions for free with AI asset generation)',
                    'Technical support'
                ],
                price: 'From $3,500',
                popular: false
            },
            {
                title: '3 Playables pack',
                description: 'Three different playables with different mechanics',
                features: [
                    '3 unique playables (different mechanics)',
                    '2 FREE iterations for each playable (adjust duration & difficulty)',
                    'Builds for all major ad networks',
                    'Free access to Dashboard (create custom versions for free with AI asset generation)',
                    'Technical support'
                ],
                price: 'From $6,900',
                popular: true
            },
            {
                title: 'Growth scale plan',
                description: 'From 8 playables per month',
                subtitle: 'For continuous UA growth and scaling campaigns',
                features: [
                    'From 8 unique playables per month (different mechanics)',
                    '2 FREE iterations for each playable (adjust duration & difficulty)',
                    '5 customized versions for each playable created by our designers via Dashboard (different art, texts, themes)',
                    'Builds for all major ad networks',
                    'Free access to Dashboard (with AI asset generation)',
                    'Technical support'
                ],
                price: 'From $12,500/month',
                popular: false
            }
        ];

        // SVG галочка
        const checkmarkSVG = `
            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 12.5C1.5 12.5 8.34955 21.2355 10.0737 21.2355C11.7979 21.2355 23.5 1.5 23.5 1.5" stroke="#FF0034" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/portfolio/components/css/priceCards.css">
            
            <section class="price-cards-row">
                ${plans.map(plan => `
                    <div class="price-card ${plan.popular ? 'popular' : ''}">
                        ${plan.popular ? '<div class="popular-badge">Most popular</div>' : ''}
                        <h3 class="card-title">${plan.title}</h3>
                        <p class="card-description">${plan.description}</p>
                        ${plan.subtitle ? `<p class="card-subtitle">${plan.subtitle}</p>` : ''}
                        <ul class="card-features">
                            ${plan.features.map(feature => `
                                <li>
                                    <span class="feature-icon">${checkmarkSVG}</span>
                                    <span>${feature}</span>
                                </li>
                            `).join('')}
                        </ul>
                        <div class="card-price">${plan.price}</div>
                    </div>
                `).join('')}
            </section>
        `;
    }
}

customElements.define('price-cards', PriceCards);