class AboutPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                .about-section {
                    padding: 100px 0;
                    animation: fadeIn 0.8s ease-out;
                }
                .about-section h1 {
                    font-size: 2.5rem;
                    margin-bottom: 30px;
                    color: #FF0036;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>
            <div class="about-section">
                <h1>About</h1>
            </div>
        `;
    }
}
customElements.define('page-about', AboutPage);