class PortfolioPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/portfolio/portfolioPage.css">
            
            <div class="portfolio-page">
                <!-- Заголовок страницы -->
                <section class="portfolio-header">
                    <h1>Packages & Pricing</h1>
                </section>

                <!-- Ряд 1: Карточки с ценами (используем price-cards) -->
                <price-cards></price-cards>

                <!-- Ряд 2: Информационные карточки (используем price-info) -->
                <price-info></price-info>
            </div>
        `;
    }
}

customElements.define('page-portfolio', PortfolioPage);