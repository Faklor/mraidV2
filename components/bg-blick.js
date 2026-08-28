class BgBlick extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Генерируем рандомные позиции
        const top = Math.floor(Math.random() * 80) + 10; // 10% - 90%
        const left = Math.floor(Math.random() * 80) + 10; // 10% - 90%
        const size = Math.floor(Math.random() * 300) + 200; // 200px - 500px
        const opacity = (Math.random() * 0.3 + 0.1).toFixed(2); // 0.1 - 0.4
        const delay = Math.floor(Math.random() * 5); // 0s - 5s задержка анимации

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: absolute;
                    top: ${top}%;
                    left: ${left}%;
                    width: ${size}px;
                    height: ${size}px;
                    z-index: 0;
                    pointer-events: none;
                    opacity: ${opacity};
                    animation: blickPulse 8s ease-in-out ${delay}s infinite;
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                @keyframes blickPulse {
                    0%, 100% {
                        opacity: ${opacity};
                        transform: scale(1);
                    }
                    50% {
                        opacity: ${Math.min(parseFloat(opacity) + 0.1, 0.5).toFixed(2)};
                        transform: scale(1.1);
                    }
                }

                /* На мобильных делаем меньше */
                @media (max-width: 768px) {
                    :host {
                        width: ${size * 0.5}px;
                        height: ${size * 0.5}px;
                    }
                }
            </style>
            <img src="assets/img/blick.png" alt="" aria-hidden="true">
        `;
    }
}

customElements.define('bg-blick', BgBlick);