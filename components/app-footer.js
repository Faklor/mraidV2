class AppFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="components/css/app-footer.css">
            
            <footer>
                <div class="footer-container">
                    <!-- Левая колонка: Лого + описание -->
                    <div class="footer-col brand-col">
                    <div class="logo-wrapper">
                        <svg class="logo-svg" width="128" height="95" viewBox="0 0 128 95" fill="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
                            <path d="M24 71H36V83H24V71Z" fill="#FF0036"/>
                            <path d="M24 59H36V71H24V59Z" fill="#FF0036"/>
                            <path d="M12 1H24V13H12V1Z" fill="#FF0036"/>
                            <path d="M24 1H36V13H24V1Z" fill="#FF0036"/>
                            <path d="M24 13H36V25H24V13Z" fill="#FF0036"/>
                            <path d="M36 13H48V25H36V13Z" fill="#FF0036"/>
                            <path d="M35 25H47V37H35V25Z" fill="#FF0036"/>
                            <path d="M59 36H71V48H59V36Z" fill="#FF0036"/>
                            <path d="M71 36H83V48H71V36Z" fill="#FF0036"/>
                            <path d="M83 36H93V48H83V36Z" fill="#FF0036"/>
                            <path d="M116 84H128V95H116V84Z" fill="#FF0036"/>
                            <path d="M104 84H116V95H104V84Z" fill="#FF0036"/>
                            <path d="M104 72H116V84H104V72Z" fill="#FF0036"/>
                            <path d="M92 72H104V84H92V72Z" fill="#FF0036"/>
                            <path d="M104 60H116V72H104V60Z" fill="#FF0036"/>
                            <path d="M92 60H104V72H92V60Z" fill="#FF0036"/>
                            <path d="M80 60H92V72H80V60Z" fill="#FF0036"/>
                            <path d="M104 48H116V60H104V48Z" fill="#FF0036"/>
                            <path d="M92 48H104V60H92V48Z" fill="#FF0036"/>
                            <path d="M80 48H92V60H80V48Z" fill="#FF0036"/>
                            <path d="M68 48H80V60H68V48Z" fill="#FF0036"/>
                            <path d="M105 36H116V48H105V36Z" fill="#FF0036"/>
                            <path d="M80 24H92V36H80V24Z" fill="#FF0036"/>
                            <path d="M68 24H80V36H68V24Z" fill="#FF0036"/>
                            <path d="M104 12H116V24H104V12Z" fill="#FF0036"/>
                            <path d="M92 12H104V24H92V12Z" fill="#FF0036"/>
                            <path d="M92 24H104V36H92V24Z" fill="#FF0036"/>
                            <path d="M80 12H92V24H80V12Z" fill="#FF0036"/>
                            <path d="M104 24H116V36H104V24Z" fill="#FF0036"/>
                            <path d="M104 0H116V12H104V0Z" fill="#FF0036"/>
                            <path d="M92 0H104V12H92V0Z" fill="#FF0036"/>
                            <path d="M47 36H59V48H47V36Z" fill="#FF0036"/>
                            <path d="M12 13H24V25H12V13Z" fill="#FF0036"/>
                            <path d="M12 25H24V37H12V25Z" fill="#FF0036"/>
                            <path d="M36 59H48V71H36V59Z" fill="#FF0036"/>
                            <path d="M35 47H47V59H35V47Z" fill="#FF0036"/>
                            <path d="M47 48H59V59H47V48Z" fill="#FF0036"/>
                            <path d="M12 71H24V83H12V71Z" fill="#FF0036"/>
                            <path d="M12 83H24V95H12V83Z" fill="#FF0036"/>
                            <path d="M0 83H12V95H0V83Z" fill="#FF0036"/>
                            <path d="M0 71H12V83H0V71Z" fill="#FF0036"/>
                            <path d="M12 59H24V71H12V59Z" fill="#FF0036"/>
                            <path d="M12 47H24V59H12V47Z" fill="#FF0036"/>
                            <path d="M0 59H12V71H0V59Z" fill="#FF0036"/>
                            <path d="M0 47H12V59H0V47Z" fill="#FF0036"/>
                            <path d="M0 35H12V47H0V35Z" fill="#FF0036"/>
                            <path d="M0 23H12V35H0V23Z" fill="#FF0036"/>
                            <path d="M0 11H12V23H0V11Z" fill="#FF0036"/>
                            <path d="M0 1H12V11H0V1Z" fill="#FF0036"/>
                            <path d="M47 25H59V36H47V25Z" fill="#FF0036"/>
                            <path d="M116 72H128V84H116V72Z" fill="#FF0036"/>
                            <path d="M116 60H128V72H116V60Z" fill="#FF0036"/>
                            <path d="M116 48H128V60H116V48Z" fill="#FF0036"/>
                            <path d="M116 36H128V48H116V36Z" fill="#FF0036"/>
                            <path d="M116 24H128V36H116V24Z" fill="#FF0036"/>
                            <path d="M116 12H128V24H116V12Z" fill="#FF0036"/>
                            <path d="M116 0H128V12H116V0Z" fill="#FF0036"/>
                        </svg>
                    </div>
                        <a href="#home" class="footer-logo">
                            MRAID.IO
                        </a>
                        <p class="footer-desc">
                            We create innovative playable ads that people actually want to play.
                        </p>
                    </div>

                    <!-- Средняя колонка: Навигация -->
                    <div class="footer-col">
                        <h4>Navigation</h4>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#process">Process & Technology</a></li>
                            <li><a href="#portfolio">Portfolio</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    <!-- Правая колонка: Контакты и соцсети -->
                    <div class="footer-col">
                        <h4>Get in touch</h4>
                        <a href="mailto:hello@mraid.io" class="footer-email">hello@mraid.io</a>
                        
                        <div class="social-links">
                            <a href="#" class="social-icon" aria-label="Twitter">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 4.01C21.1 4.41 20.14 4.68 19.14 4.8C20.16 4.19 20.94 3.22 21.31 2.07C20.35 2.64 19.29 3.05 18.16 3.26C17.26 2.3 15.98 1.7 14.56 1.7C11.84 1.7 9.64 3.9 9.64 6.62C9.64 7.01 9.68 7.39 9.76 7.76C5.59 7.55 1.9 5.55 -0.57 2.53C-1 3.29 -1.25 4.17 -1.25 5.11C-1.25 6.89 -0.34 8.46 1.01 9.36C0.18 9.34 -0.6 9.11 -1.32 8.71V8.77C-1.32 11.36 0.52 13.52 2.95 14.01C2.5 14.13 2.03 14.2 1.54 14.2C1.2 14.2 0.86 14.17 0.53 14.11C1.2 16.2 3.15 17.73 5.46 17.77C3.65 19.19 1.36 20.03 -1.13 20.03C-1.56 20.03 -1.98 20.01 -2.4 19.96C-0.18 21.38 2.43 22.21 5.23 22.21C14.33 22.21 19.3 14.68 19.3 8.14C19.3 7.92 19.3 7.71 19.29 7.5C20.25 6.8 21.08 5.93 21.74 4.93L22 4.01Z" fill="currentColor"/>
                                </svg>
                            </a>
                            <a href="#" class="social-icon" aria-label="LinkedIn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.45 20.45H16.89V14.88C16.89 13.55 16.86 11.84 15.04 11.84C13.2 11.84 12.92 13.28 12.92 14.77V20.45H9.36V9H12.77V10.56H12.82C13.3 9.66 14.46 8.7 16.14 8.7C19.63 8.7 20.45 11 20.45 14.01V20.45ZM5.34 7.43C4.19 7.43 3.27 6.5 3.27 5.35C3.27 4.2 4.19 3.27 5.34 3.27C6.49 3.27 7.41 4.2 7.41 5.35C7.41 6.5 6.49 7.43 5.34 7.43ZM7.12 20.45H3.56V9H7.12V20.45ZM22.23 0H1.77C0.79 0 0 0.77 0 1.73V22.27C0 23.23 0.79 24 1.77 24H22.23C23.21 24 24 23.23 24 22.27V1.73C24 0.77 23.21 0 22.23 0Z" fill="currentColor"/>
                                </svg>
                            </a>
                            <a href="#" class="social-icon" aria-label="GitHub">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.44 21.81 8.21 23.4C8.81 23.51 9.03 23.14 9.03 22.82C9.03 22.54 9.02 21.79 9.02 20.81C5.67 21.54 4.97 19.19 4.97 19.19C4.42 17.79 3.63 17.42 3.63 17.42C2.54 16.68 3.71 16.69 3.71 16.69C4.91 16.78 5.54 17.93 5.54 17.93C6.61 19.76 8.35 19.23 9.03 18.92C9.14 18.15 9.45 17.63 9.79 17.33C7.13 17.03 4.33 16 4.33 11.51C4.33 10.23 4.79 9.18 5.54 8.36C5.42 8.05 4.99 6.82 5.66 5.13C5.66 5.13 6.69 4.8 8.99 6.36C9.95 6.09 10.98 5.96 12 5.95C13.02 5.96 14.05 6.09 15.01 6.36C17.31 4.8 18.34 5.13 18.34 5.13C19.01 6.82 18.58 8.05 18.46 8.36C19.21 9.18 19.67 10.23 19.67 11.51C19.67 16.01 16.86 17.02 14.19 17.32C14.62 17.69 15 18.43 15 19.55C15 21.16 14.98 22.46 14.98 22.82C14.98 23.14 15.2 23.52 15.81 23.4C20.57 21.8 24 17.3 24 12C24 5.37 18.63 0 12 0Z" fill="currentColor"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Нижняя полоска с копирайтом -->
                <div class="footer-bottom">
                    <p>&copy; 2024 MRAID.IO. All rights reserved.</p>
                </div>
            </footer>
        `;
    }
}

customElements.define('app-footer', AppFooter);