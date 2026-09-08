class AppSkeleton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: #0D0D0F;
                    z-index: 9999;
                    padding: 40px;
                    box-sizing: border-box;
                    overflow-y: auto;
                    transition: opacity 0.6s ease, visibility 0.6s ease;
                }

                :host(.hidden) {
                    opacity: 0;
                    visibility: hidden;
                    pointer-events: none;
                }

                /* === ЭФФЕКТ ШИММЕРА (БЛИК, ПРОБЕГАЮЩИЙ ПО СЕРОМУ БЛОКУ) === */
                .skeleton {
                    background: #1a1a1e;
                    background-image: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0.03) 20%,
                        rgba(255, 255, 255, 0.08) 50%,
                        rgba(255, 255, 255, 0.03) 80%,
                        rgba(255, 255, 255, 0) 100%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 1.8s infinite linear;
                    border-radius: 8px;
                }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                /* === МАКЕТ СКЕЛЕТОНА (имитирует структуру твоего сайта) === */
                .sk-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 60px;
                }
                .sk-logo { width: 120px; height: 40px; }
                .sk-nav { display: flex; gap: 24px; }
                .sk-nav-item { width: 80px; height: 20px; }
                .sk-btn-cta { width: 120px; height: 40px; border-radius: 8px; }

                .sk-hero {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                    margin-bottom: 60px;
                    align-items: center;
                }
                .sk-text-group { display: flex; flex-direction: column; gap: 16px; }
                .sk-title { width: 85%; height: 48px; }
                .sk-subtitle { width: 60%; height: 24px; }
                .sk-desc { width: 90%; height: 16px; }
                .sk-desc-2 { width: 70%; height: 16px; }
                .sk-action-btn { width: 160px; height: 48px; margin-top: 12px; border-radius: 8px; }

                .sk-image {
                    width: 100%;
                    height: 400px;
                    border-radius: 16px;
                }

                .sk-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 20px;
                }
                .sk-card {
                    height: 140px;
                    border-radius: 12px;
                }

                @media (max-width: 1024px) {
                    .sk-grid { grid-template-columns: repeat(2, 1fr); }
                }

                @media (max-width: 768px) {
                    :host { padding: 20px; }
                    .sk-header { margin-bottom: 40px; }
                    .sk-nav { display: none; } /* На мобильном скрываем навигацию в скелетоне */
                    .sk-hero { grid-template-columns: 1fr; }
                    .sk-image { height: 300px; order: -1; margin-bottom: 20px; }
                    .sk-grid { grid-template-columns: 1fr; }
                }
            </style>

            <!-- Шапка -->
            <div class="sk-header">
                <div class="skeleton sk-logo"></div>
                <div class="sk-nav">
                    <div class="skeleton sk-nav-item"></div>
                    <div class="skeleton sk-nav-item"></div>
                    <div class="skeleton sk-nav-item"></div>
                    <div class="skeleton sk-nav-item"></div>
                </div>
                <div class="skeleton sk-btn-cta"></div>
            </div>

            <!-- Hero секция -->
            <div class="sk-hero">
                <div class="sk-text-group">
                    <div class="skeleton sk-title"></div>
                    <div class="skeleton sk-subtitle"></div>
                    <div class="skeleton sk-desc"></div>
                    <div class="skeleton sk-desc-2"></div>
                    <div class="skeleton sk-action-btn"></div>
                </div>
                <div class="skeleton sk-image"></div>
            </div>

            <!-- Сетка фич -->
            <div class="sk-grid">
                <div class="skeleton sk-card"></div>
                <div class="skeleton sk-card"></div>
                <div class="skeleton sk-card"></div>
                <div class="skeleton sk-card"></div>
            </div>
        `;
    }
}

customElements.define('app-skeleton', AppSkeleton);