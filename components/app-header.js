class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // Привязываем контекст this для корректного удаления слушателя
        this.handleScroll = this.handleScroll.bind(this);
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="components/css/app-header.css">
            
            <header>
                <!-- Логотип слева -->
                <div class="logo-wrapper">
                    <slot name="logo"></slot>
                </div>
                
                <!-- Группируем навигацию и кнопку справа -->
                <div class="header-actions">
                    <nav>
                        <slot name="nav"></slot>
                    </nav>
                </div>
            </header>
        `;

        // Проверяем положение скролла сразу при загрузке (на случай перезагрузки страницы не в начале)
        this.handleScroll();

        // Добавляем слушатель скролла
        window.addEventListener('scroll', this.handleScroll);
    }

    // Метод обработки скролла
    handleScroll() {
        const header = this.shadowRoot.querySelector('header');
        // Если прокрутили больше чем на 50px, добавляем класс
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Обязательно удаляем слушатель при удалении компонента со страницы
    disconnectedCallback() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}

customElements.define('app-header', AppHeader);