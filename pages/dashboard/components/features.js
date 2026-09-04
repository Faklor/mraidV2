class DashboardFeatures extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.activeFeature = 0;
    }

    connectedCallback() {
        const features = [
            {
                icon: 'assets/img/dashboard/features/icon1.png',
                title: 'Easy customization',
                subtitle: 'No code. Just results',
                description: 'Customize playables without limits',
                details: 'Change text, images, colors, characters, logos and more. Make each playable match your brand and campaign',
                items: [
                    'Edit texts & fonts',
                    'Replace images & logos',
                    'Adjust colors & themes',
                    'Move & resize any element'
                ],
                video: 'assets/video/video1.mp4'
            },
            {
                icon: 'assets/img/dashboard/features/icon2.png',
                title: 'AI asset generation',
                subtitle: 'Create unique visuals in seconds',
                description: 'Generate assets with AI',
                details: 'Use AI to create backgrounds, characters, icons and other visual elements automatically',
                items: [
                    'AI-powered background generation',
                    'Character creation',
                    'Icon and UI generation',
                    'Style transfer'
                ],
                video: 'assets/video/video2.mp4'
            },
            {
                icon: 'assets/img/dashboard/features/icon3.png',
                title: 'Responsive preview',
                subtitle: 'Test across devices and ratios',
                description: 'See changes instantly',
                details: 'Preview your playable on different devices and orientations in real-time',
                items: [
                    'Multi-device preview',
                    'Portrait and landscape modes',
                    'Real-time updates',
                    'Device frame simulation'
                ],
                video: 'assets/video/video3.mp4'
            },
            {
                icon: 'assets/img/dashboard/features/icon4.png',
                title: 'Export & build',
                subtitle: 'Production ready builds for all major networks',
                description: 'Export anywhere',
                details: 'Build and export to all major ad platforms in one click',
                items: [
                    'One-click export',
                    'All major ad networks',
                    'Automatic optimization',
                    'Batch export'
                ],
                video: 'assets/video/video4.mp4'
            },
            {
                icon: 'assets/img/dashboard/features/icon5.png',
                title: 'Version control',
                subtitle: 'Save, manage and compare all your versions',
                description: 'Track changes',
                details: 'Keep track of all changes and easily rollback to previous versions',
                items: [
                    'Automatic versioning',
                    'Compare versions',
                    'Quick rollback',
                    'Change history'
                ],
                video: 'assets/video/video5.mp4'
            }
        ];

        this.features = features; // Сохраняем для доступа из других методов

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/dashboard/components/css/features.css">
            
            <section class="dashboard-features">
                <h2 class="features-heading">Powerful features</h2>
                
                <div class="features-container">
                    <!-- Левая колонка: список фич -->
                    <div class="features-list">
                        ${features.map((feature, index) => `
                            <div class="feature-item ${index === this.activeFeature ? 'active' : ''}" 
                                data-index="${index}">
                                <div class="feature-icon-wrapper">
                                    <img src="${feature.icon}" alt="${feature.title}" class="feature-icon">
                                </div>
                                <div class="feature-text">
                                    <h3 class="feature-title">${feature.title}</h3>
                                    <p class="feature-subtitle">${feature.subtitle}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- ПРАВЫЙ ОБЩИЙ БЛОК С ФОНОМ -->
                    <div class="feature-panel">
                        <!-- Текст слева -->
                        <div class="feature-content">
                            <div class="content-header">
                                <h3 class="content-title">${features[this.activeFeature].description}</h3>
                                <p class="content-description">${features[this.activeFeature].details}</p>
                                <ul class="content-list">
                                    ${features[this.activeFeature].items.map(item => `
                                        <li>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path d="M5 13L9 17L19 7" stroke="#FF0036" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            ${item}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>

                        <!-- Видео справа -->
                        <div class="video-wrapper paused">
                            <div class="video-container">
                                <video class="feature-video" 
                                    src="${features[this.activeFeature].video}" 
                                    loop 
                                    playsinline>
                                </video>
                                
                                <!-- Кнопка Play поверх -->
                                <div class="play-overlay">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </div>
                                
                                <!-- Контролы -->
                                <div class="video-controls">
                                    <div class="control-bar">
                                        <div class="progress-bar">
                                            <div class="progress-fill"></div>
                                        </div>
                                        <span class="time-display">0:00 / 0:00</span>
                                    </div>
                                    <div class="control-buttons">
                                        <button class="control-btn play-pause-btn">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M8 5v14l11-7z"/>
                                            </svg>
                                        </button>
                                        <button class="control-btn restart-btn">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                                                <path d="M3 3v5h5"/>
                                            </svg>
                                        </button>
                                        <!-- КНОПКА FULLSCREEN -->
                                        <button class="control-btn fullscreen-btn">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        this.initFeatures();
        this.initVideoControls();
    }

    // === ИНИЦИАЛИЗАЦИЯ ПЕРЕКЛЮЧЕНИЯ ФИЧ ===
    initFeatures() {
        const featureItems = this.shadowRoot.querySelectorAll('.feature-item');
        
        featureItems.forEach((item) => {
            item.addEventListener('click', (e) => {
                const index = parseInt(item.dataset.index);
                
                // Убираем active у всех
                featureItems.forEach(i => i.classList.remove('active'));
                // Добавляем active нажатому
                item.classList.add('active');
                
                // Обновляем индекс
                this.activeFeature = index;
                
                // Обновляем контент и видео
                this.updateContent();
                this.switchVideo();
            });
        });
    }

    // === ОБНОВЛЕНИЕ ТЕКСТОВОГО КОНТЕНТА ===
    updateContent() {
        const feature = this.features[this.activeFeature];
        const contentHeader = this.shadowRoot.querySelector('.content-header');
        
        if (contentHeader) {
            contentHeader.innerHTML = `
                <h3 class="content-title">${feature.description}</h3>
                <p class="content-description">${feature.details}</p>
                <ul class="content-list">
                    ${feature.items.map(item => `
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M5 13L9 17L19 7" stroke="#FF0036" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            ${item}
                        </li>
                    `).join('')}
                </ul>
            `;
        }
    }

    // === ПЕРЕКЛЮЧЕНИЕ ВИДЕО ===
    switchVideo() {
        const video = this.shadowRoot.querySelector('.feature-video');
        const videoWrapper = this.shadowRoot.querySelector('.video-wrapper');
        const playOverlay = this.shadowRoot.querySelector('.play-overlay');
        const playPauseBtn = this.shadowRoot.querySelector('.play-pause-btn');
        
        if (video) {
            // Останавливаем текущее видео
            video.pause();
            
            // Меняем источник
            video.src = this.features[this.activeFeature].video;
            video.load();
            
            // Пробуем автовоспроизведение
            setTimeout(() => {
                video.play().then(() => {
                    videoWrapper.classList.remove('paused');
                    playOverlay.style.display = 'none';
                    this.updatePlayButton(playPauseBtn, true);
                }).catch(() => {
                    // Если autoplay заблокирован
                    videoWrapper.classList.add('paused');
                    playOverlay.style.display = 'flex';
                    this.updatePlayButton(playPauseBtn, false);
                });
            }, 100);
        }
    }

    // === ИНИЦИАЛИЗАЦИЯ КОНТРОЛОВ ВИДЕО ===
    initVideoControls() {
        const video = this.shadowRoot.querySelector('.feature-video');
        const playPauseBtn = this.shadowRoot.querySelector('.play-pause-btn');
        const restartBtn = this.shadowRoot.querySelector('.restart-btn');
        const playOverlay = this.shadowRoot.querySelector('.play-overlay');
        const progressBar = this.shadowRoot.querySelector('.progress-bar');
        const progressFill = this.shadowRoot.querySelector('.progress-fill');
        const timeDisplay = this.shadowRoot.querySelector('.time-display');
        const videoWrapper = this.shadowRoot.querySelector('.video-wrapper');

        if (!video) return;

        // Play/Pause
        const togglePlay = () => {
            if (video.paused) {
                video.play();
                videoWrapper.classList.remove('paused');
                playOverlay.style.display = 'none';
                this.updatePlayButton(playPauseBtn, true);
            } else {
                video.pause();
                videoWrapper.classList.add('paused');
                playOverlay.style.display = 'flex';
                this.updatePlayButton(playPauseBtn, false);
            }
        };

        playPauseBtn.addEventListener('click', togglePlay);
        playOverlay.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);

        // Restart
        restartBtn.addEventListener('click', () => {
            video.currentTime = 0;
            video.play();
            videoWrapper.classList.remove('paused');
            playOverlay.style.display = 'none';
            this.updatePlayButton(playPauseBtn, true);
        });

        // Обновление прогресса
        video.addEventListener('timeupdate', () => {
            if (video.duration) {
                const progress = (video.currentTime / video.duration) * 100;
                progressFill.style.width = progress + '%';
                
                const currentTime = this.formatTime(video.currentTime);
                const duration = this.formatTime(video.duration);
                timeDisplay.textContent = `${currentTime} / ${duration}`;
            }
        });

        // Клик по прогресс бару
        progressBar.addEventListener('click', (e) => {
            if (video.duration) {
                const rect = progressBar.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                video.currentTime = pos * video.duration;
            }
        });

        // Автоплей при загрузке
        setTimeout(() => {
            video.play().catch(() => {
                videoWrapper.classList.add('paused');
                playOverlay.style.display = 'flex';
            });
        }, 100);

        // Fullscreen
        const fullscreenBtn = this.shadowRoot.querySelector('.fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                if (!document.fullscreenElement) {
                    // Разворачиваем видео на весь экран
                    if (video.requestFullscreen) {
                        video.requestFullscreen();
                    } else if (video.webkitRequestFullscreen) {
                        video.webkitRequestFullscreen();
                    } else if (video.msRequestFullscreen) {
                        video.msRequestFullscreen();
                    }
                } else {
                    // Сворачиваем
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
            });
        }

        // Двойной клик по видео тоже разворачивает
        video.addEventListener('dblclick', () => {
            fullscreenBtn.click();
        });
    }

    // === ОБНОВЛЕНИЕ КНОПКИ PLAY/PAUSE ===
    updatePlayButton(button, isPlaying) {
        if (!button) return;
        
        if (isPlaying) {
            button.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                </svg>
            `;
        } else {
            button.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            `;
        }
    }

    // === ФОРМАТИРОВАНИЕ ВРЕМЕНИ ===
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

customElements.define('dashboard-features', DashboardFeatures);