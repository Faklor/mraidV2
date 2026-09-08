class BgBlick extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Читаем атрибуты, если их нет — берем безопасные значения по умолчанию
        const top = this.getAttribute('top') || '50%';
        const left = this.getAttribute('left') || '50%';
        const size = this.getAttribute('size') || '300px';
        const opacity = this.getAttribute('opacity') || '0.2';
        const delay = this.getAttribute('delay') || '0s';
        
        const opacityNum = parseFloat(opacity);
        const peakOpacity = Math.min(opacityNum + 0.15, 0.6).toFixed(2);

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: absolute;
                    top: ${top};
                    left: ${left};
                    width: ${size};
                    height: ${size};
                    z-index: 0;
                    pointer-events: none;
                }

                .blick-inner {
                    width: 100%;
                    height: 100%;
                    opacity: ${opacity};
                    animation: blickPulse 8s ease-in-out ${delay} infinite;
                }

                .blick-inner img {
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
                        opacity: ${peakOpacity};
                        transform: scale(1.1);
                    }
                }

                @media (max-width: 768px) {
                    :host {
                        /* На мобильных просто уменьшаем масштаб всего элемента */
                        transform: scale(0.5);
                        transform-origin: center;
                    }
                }
            </style>
            <div class="blick-inner">
                <img src="assets/img/blick.png" alt="" aria-hidden="true">
            </div>
        `;
    }
}

customElements.define('bg-blick', BgBlick);