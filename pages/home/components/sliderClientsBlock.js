class TrustedBy extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.animationId = null;
        this.position = 0;
        this.speed = 0.3; // Скорость прокрутки (пикселей за кадр)
    }

    // Функция перемешивания массива (Fisher-Yates shuffle)
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    connectedCallback() {
        const studios = [
            { name: 'Jam City', file: 'jam-city.png' },
            { name: 'Kabam', file: 'kabam.png' },
            { name: 'Paramount', file: 'paramount.png' },
            { name: 'Scopely', file: 'scopely.png' },
            { name: 'Good Job', file: 'goodjob.png' },
            { name: 'Disney', file: 'disney.png' },
            { name: 'Marvel', file: 'marvel.png' },
            { name: 'BBC', file: 'bbc.png' },
            { name: 'Ubisoft', file: 'ubisoft.png' },
            { name: 'Lionsgate', file: 'lionsgate.png' },
            { name: 'Kama Games', file: 'kama-games.png' },
            { name: 'MG', file: 'mg.png' }
        ];

        // Перемешиваем логотипы
        const shuffledStudios = this.shuffleArray(studios);

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/home/components/css/trustedBy.css">
            
            <div class="trusted-section">
                <h2>Trusted by leading game studios & brands</h2>
                
                <div class="marquee-container">
                    <div class="marquee-track">
                        ${shuffledStudios.map(s => `
                            <div class="logo-item">
                                <img src="assets/img/clients/${s.file}" alt="${s.name}" loading="lazy">
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // Клонируем логотипы для бесшовной прокрутки
        this.setupInfiniteScroll();
        
        // Запускаем анимацию
        this.startAnimation();
    }

    setupInfiniteScroll() {
        const track = this.shadowRoot.querySelector('.marquee-track');
        const logos = track.querySelectorAll('.logo-item');
        
        // Клонируем каждый логотип и добавляем в конец
        logos.forEach(logo => {
            const clone = logo.cloneNode(true);
            track.appendChild(clone);
        });
    }

    startAnimation() {
        const track = this.shadowRoot.querySelector('.marquee-track');
        const container = this.shadowRoot.querySelector('.marquee-container');
        
        let animationFrameId;
        let isPaused = false;

        // Пауза при наведении
        container.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        container.addEventListener('mouseleave', () => {
            isPaused = false;
        });

        const animate = () => {
            if (!isPaused) {
                this.position -= this.speed;
                
                // Получаем ширину первого логотипа
                const firstLogo = track.firstElementChild;
                const logoWidth = firstLogo.offsetWidth + 48; // 48px - это gap
                
                // Когда прокрутили больше ширины одного логотипа
                if (Math.abs(this.position) >= logoWidth) {
                    // Перемещаем первый логотип в конец
                    track.appendChild(track.firstElementChild);
                    // Сбрасываем позицию
                    this.position += logoWidth;
                }
                
                // Применяем трансформацию
                track.style.transform = `translateX(${this.position}px)`;
            }
            
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        
        // Сохраняем ID для очистки
        this.animationId = animationFrameId;
    }

    disconnectedCallback() {
        // Очищаем анимацию при удалении компонента
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

customElements.define('trusted-by', TrustedBy);