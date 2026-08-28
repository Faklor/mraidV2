class PhoneShowcase extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.inactivityTimer = null;
        this.currentTime = 0;
        this.lastPlayable = null; // Запоминаем последний выбранный плейбл
    }

    connectedCallback() {
        // Генерируем первый случайный плейбл
        this.loadRandomPlayable();
        
        this.setupInactivityDetection();
        this.setup3DTilt();
    }

    // === ЗАГРУЗКА СЛУЧАЙНОГО ПЛЕЙБЛА ===
    loadRandomPlayable() {
        // Генерируем случайное число от 1 до 5
        let randomPl;
        do {
            randomPl = Math.floor(Math.random() * 5) + 1;
        } while (randomPl === this.lastPlayable && 5 > 1); // Избегаем повтора того же самого (если есть выбор)
        
        this.lastPlayable = randomPl;
        const playableSrc = `assets/playables/pl${randomPl}/index.html`;
        
        // Находим iframe и меняем src
        const iframe = this.shadowRoot.querySelector('.playable-screen');
        if (iframe) {
            iframe.src = playableSrc;
        } else {
            // Если iframe еще нет (первая загрузка), создаем HTML
            this.renderHTML(playableSrc);
        }
        
        // Сбрасываем таймер бездействия
        this.resetInactivityTimer();
    }

    // === ОТРИСОВКА HTML ===
    renderHTML(playableSrc) {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/home/components/css/phoneBlock.css">
            
            <div class="showcase-wrapper">
               
                <img src="assets/img/main-blick.png" alt="Main Blick" class="bg-blick">
                
                <div class="phone-3d-container">
                    <div class="phone-inner">
                        <iframe src="${playableSrc}" class="playable-screen" frameborder="0" title="Playable Game"></iframe>
                        <div class="screen-reflection"></div>
                        <img src="assets/img/phone.png" alt="Phone Frame" class="phone-frame-img">
                    </div>
                </div>
                
                <!-- Индикатор бездействия -->
                <div class="inactivity-indicator">
                    <span>Next game in <span class="countdown">30</span>s</span>
                </div>
            </div>
        `;
    }

    // === ОТСЛЕЖИВАНИЕ БЕЗДЕЙСТВИЯ ===
    setupInactivityDetection() {
        const activities = ['mousedown', 'mousemove', 'click', 'touchstart', 'touchmove', 'scroll', 'keypress'];
        
        // При любом действии сбрасываем таймер
        activities.forEach(event => {
            document.addEventListener(event, () => this.resetInactivityTimer(), true);
        });

        // Запускаем счетчик
        this.startInactivityCounter();
    }

    // === СБРОС ТАЙМЕРА ===
    resetInactivityTimer() {
        this.currentTime = 0;
        this.updateCountdownDisplay();
        
        // Скрываем индикатор
        const indicator = this.shadowRoot.querySelector('.inactivity-indicator');
        if (indicator) {
            indicator.style.opacity = '0';
        }
    }

    // === СЧЕТЧИК БЕЗДЕЙСТВИЯ ===
    startInactivityCounter() {
        setInterval(() => {
            this.currentTime++;
            this.updateCountdownDisplay();
            
            // Показываем индикатор после 25 секунд
            if (this.currentTime >= 25) {
                const indicator = this.shadowRoot.querySelector('.inactivity-indicator');
                if (indicator) {
                    indicator.style.opacity = '1';
                }
            }
            
            // Через 30 секунд бездействия → переключаем игру
            if (this.currentTime >= 30) {
                this.loadRandomPlayable();
            }
        }, 1000);
    }

    // === ОБНОВЛЕНИЕ ОТОБРАЖЕНИЯ ТАЙМЕРА ===
    updateCountdownDisplay() {
        const countdownEl = this.shadowRoot.querySelector('.countdown');
        if (countdownEl) {
            countdownEl.textContent = Math.max(0, 30 - this.currentTime);
        }
    }

    // === 3D НАКЛОН ===
    setup3DTilt() {
        const container = this.shadowRoot.querySelector('.phone-3d-container');
        const phoneInner = this.shadowRoot.querySelector('.phone-inner');

        if (!container || !phoneInner) return;

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const centerX = rect.width / 2;
            const rotateY = ((x - centerX) / centerX) * 12;
            phoneInner.style.transform = `rotateY(${rotateY}deg)`;
        });

        container.addEventListener('mouseleave', () => {
            phoneInner.style.transform = `rotateY(0deg)`;
        });
    }

    // === ОЧИСТКА ПРИ УДАЛЕНИИ ===
    disconnectedCallback() {
        // Таймер очистится автоматически при удалении элемента
    }
}

customElements.define('phone-showcase', PhoneShowcase);