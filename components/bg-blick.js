class BgBlick extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Читаем атрибуты из HTML. Если их нет, берем значения по умолчанию
        const top = this.getAttribute('top') || '50%';
        const left = this.getAttribute('left') || '50%';
        const size = this.getAttribute('size') || '300px';
        const opacity = this.getAttribute('opacity') || '0.2';
        const delay = this.getAttribute('delay') || '0s';
        
        // Вычисляем пиковую прозрачность для анимации (на 0.15 больше, но не больше 0.6)
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
                    opacity: ${opacity};
                    animation: blickPulse 8s ease-in-out ${delay} infinite;
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
                        opacity: ${peakOpacity};
                        transform: scale(1.1);
                    }
                }

                /* На мобильных устройствах уменьшаем все блики в 2 раза */
                @media (max-width: 768px) {
                    :host {
                        transform-origin: center;
                        /* Используем scale, чтобы не ломать строковые значения типа '20vw' */
                        transform: scale(0.5) !important; 
                    }
                }
            </style>
            <img src="assets/img/blick.png" alt="" aria-hidden="true">
        `;
    }
}

customElements.define('bg-blick', BgBlick);