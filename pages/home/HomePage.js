class HomePage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/home/HomePage.css">
            
            

            <div class="home-page">
                <!-- Секция 1: Hero + Phone + Features (3 колонки на десктопе) -->

                <div class="bg-looper-wrapper">
                    <img src="assets/img/looper.png" alt="Background" class="bg-looper">
                </div>

                <bg-blick></bg-blick>
                <bg-blick></bg-blick>
                <bg-blick></bg-blick>
                <bg-blick></bg-blick>


                <section class="hero-section">
                    <div class="hero-content">
                        <hero-block></hero-block>
                    </div>
                    <div class="phone-showcase">
                        <phone-showcase></phone-showcase>
                    </div>
                    <div class="features-list">
                        <features-list></features-list>
                    </div>
                </section>

                <!-- Секция 2: Trusted By -->
                <section class="trusted-section">
                    <trusted-by></trusted-by>
                </section>

                <!-- Секция 3: Stats Grid (3+2) -->
                <section class="stats-section">
                    <stats-grid></stats-grid>
                </section>

                <section class="slider-section">
                    <top-playables-slider></top-playables-slider>
                </section>
            </div>
        `;
    }
}

customElements.define('page-home', HomePage);