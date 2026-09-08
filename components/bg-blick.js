class BgBlick extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Позиция и прозрачность
        const top = this.getAttribute('top') || '50%';
        const left = this.getAttribute('left') || '50%';
        const opacity = this.getAttribute('opacity') || '0.2';

        // Умная логика размеров:
        // 1. Если заданы width и height, берем их.
        // 2. Если нет, берем атрибут size.
        // 3. Если нет и его, ставим дефолт 300px.
        const size = this.getAttribute('size') || '300px';
        const width = this.getAttribute('width') || size;
        const height = this.getAttribute('height') || width; // Если height не задан, делаем квадратным

        this.shadowRoot.innerHTML = `
            <style>
                .blick-inner {
                    position: absolute;
                    top: ${top};
                    left: ${left};
                    width: ${width};
                    height: ${height};
                    opacity: ${opacity};
                    pointer-events: none; /* Блик не мешает кликам */
                    z-index: 0;
                }

                .blick-inner img {
                    width: 100%;   /* Картинка всегда заполняет заданный width */
                    height: 100%;  /* Картинка всегда заполняет заданный height */
                    object-fit: contain;
                    display: block; /* Убирает микро-отступы снизу у картинок */
                }
            </style>
            <div class="blick-inner">
                <img src="assets/img/blick.png" alt="" aria-hidden="true">
            </div>
        `;
    }
}

customElements.define('bg-blick', BgBlick);