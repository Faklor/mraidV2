class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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
    }
}

customElements.define('app-header', AppHeader);