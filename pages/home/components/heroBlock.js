class HeroBlock extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/home/components/css/titleBlock.css">
            
            <div class="hero-block">
                <h1>Developing playables that people <span>want to play</span></h1>
                <p>We are a technical partner for game studios and brands. 1000+ playable ads developed with precision, optimized for every platform and ad network.</p>
                
                <div class="buttons">
                    <a href="#contact" class="btn btn-primary">Contact us</a>
                    <a href="#portfolio" class="btn btn-secondary">View our works</a>
                </div>
            </div>
        `;
    }
}

customElements.define('hero-block', HeroBlock);