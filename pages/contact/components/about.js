class AboutContact extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentPlan = null;
        this.handlePlanChange = this.handlePlanChange.bind(this);
        
        // Состояние для капчи
        this.captchaRequired = false;
        this.captchaWidgetId = null;
        this.hcaptchaLoading = null;
        this.captchaErrorCount = 0;

        // Привязываем методы капчи к контексту класса (как в оригинальном main.js, но безопаснее для Shadow DOM)
        this.onCaptchaSolved = this.onCaptchaSolved.bind(this);
        this.onCaptchaExpired = this.onCaptchaExpired.bind(this);
        this.onCaptchaError = this.onCaptchaError.bind(this);
    }

    connectedCallback() {
        window.addEventListener('planChanged', this.handlePlanChange);
        
        // Закрытие модалки по клику на backdrop или крестик
        setTimeout(() => {
            const modal = document.getElementById('hcaptcha-modal');
            const closeBtn = modal?.querySelector('.hcaptcha-modal-close');
            
            if (modal) {
                // Клик на backdrop
                modal.addEventListener('click', (e) => {
                    if (e.target.classList.contains('hcaptcha-modal-backdrop')) {
                        this.closeCaptchaModal();
                    }
                });
            }
            
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.closeCaptchaModal();
                });
            }
        }, 100);
        
        this.render();
    }

    closeCaptchaModal() {
        const modal = document.getElementById('hcaptcha-modal');
        if (modal) {
            modal.style.display = 'none';
            // Сбрасываем виджет, чтобы при следующей попытке он создался заново
            this.captchaWidgetId = null;
            console.log('[hCaptcha] Модалка закрыта, виджет сброшен');
        }
    }

    disconnectedCallback() {
        window.removeEventListener('planChanged', this.handlePlanChange);
    }

    handlePlanChange(event) {
        this.currentPlan = event.detail;
        this.render();
    }

    render() {
        const storedPlan = JSON.parse(localStorage.getItem('selectedPlan'));
        this.currentPlan = this.currentPlan || storedPlan || null;
        const plan = this.currentPlan;

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/contact/components/css/about.css">
            
            <section class="about-contact" id="contact">
                <div class="contact-container">
                    <div class="contact-left">
                        <h1 class="contact-title">
                            Let's build your next<br>
                            top-performing<br>
                            <span class="title-red">playable</span>
                        </h1>
                        <p class="contact-subtitle">
                            Have a project in mind?<br>
                            Send us a message and we'll get back to you within 24 hours
                        </p>
                        <div class="team-photo">
                            <img src="assets/img/about/team.png" alt="Our team">
                        </div>
                    </div>

                    <div class="contact-right">
                        <div class="form-wrapper">
                            <h2 class="form-title">Send us a message</h2>
                            
                            ${plan ? `
                            <div class="selected-package">
                                <div class="package-header">
                                    <div class="package-icon">
                                        <img src="${plan.icon}" alt="${plan.title}">
                                    </div>
                                    <div class="package-info">
                                        <span class="package-label">Selected package</span>
                                        <h3 class="package-name">${plan.title}</h3>
                                        <span class="package-price">From ${plan.price}</span>
                                    </div>
                                    <div class="package-actions">
                                        <button class="clear-package-btn" type="button">Clear</button>
                                        <button class="change-package-btn" type="button">Change</button>
                                    </div>
                                </div>
                            </div>
                            ` : ''}
                            
                            <form class="contact-form" id="contactForm">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="sr-only" for="name">Name</label>
                                        <input type="text" id="name" name="name" class="form-input" placeholder="Name:" autocomplete="name" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="sr-only" for="email">Email</label>
                                        <input type="email" id="email" name="email" class="form-input" placeholder="Email:" autocomplete="email" inputmode="email" required>
                                    </div>
                                </div>
                                
                                <div class="form-group textarea-group">
                                    <label class="sr-only" for="message">Message</label>
                                    <textarea id="message" name="message" class="form-textarea" rows="6" placeholder="Tell us a few words about your project:" minlength="7" required></textarea>
                                    <span class="char-counter">0/500</span>
                                    <small class="message-hint"></small>
                                </div>
                                
                                <div class="contact-group hp-field" style="display: none;" aria-hidden="true">
                                    <label for="company-url">Company website</label>
                                    <input id="company-url" name="company_url" type="text" class="form-control" tabindex="-1" autocomplete="off">
                                </div>
                                
                                <div class="form-error" role="alert"></div>
                                
                                <!-- Контейнер для hCaptcha -->
                                <div id="contact-captcha" style="display: none; margin-bottom: 15px;"></div>
                                <div class="captcha-note" role="alert" style="color: #ff4444; font-size: 0.9rem; margin-bottom: 10px; min-height: 20px;"></div>
                                
                                <div class="form-checkbox">
                                    <label class="checkbox-label" for="offer">
                                        <input type="checkbox" id="offer" name="offer" checked required>
                                        <span class="checkbox-custom"></span>
                                        <span class="checkbox-text">Agree with <a href="#" class="terms-link">the terms and conditions</a> *</span>
                                    </label>
                                </div>
                                
                                <button type="submit" id="contact-button" class="submit-btn">
                                    Send Message
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </form>

                            <div class="form-divider"></div>

                            <div class="direct-contact">
                                <p class="direct-title">Or reach us directly</p>
                                <a href="mailto:sales@mraid.io" class="direct-link">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                    sales@mraid.io
                                </a>
                                <a href="https://linkedin.com/company/mraid-io/" class="direct-link" target="_blank">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                    linkedin.com/company/mraid-io/
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        this.initForm();
        this.initPackageSelector();
    }

    initPackageSelector() {
        const changeBtn = this.shadowRoot.querySelector('.change-package-btn');
        const clearBtn = this.shadowRoot.querySelector('.clear-package-btn');
        
        if (changeBtn) {
            changeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = 'pricing-section';
                window.dispatchEvent(new CustomEvent('scroll-to-pricing', { bubbles: true, composed: true }));
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentPlan = null;
                localStorage.removeItem('selectedPlan');
                this.render();
            });
        }
    }

    initForm() {
        const form = this.shadowRoot.querySelector('#contactForm');
        const nameInput = this.shadowRoot.querySelector('#name');
        const emailInput = this.shadowRoot.querySelector('#email');
        const messageInput = this.shadowRoot.querySelector('#message');
        const offerInput = this.shadowRoot.querySelector('#offer');
        const honeypotInput = this.shadowRoot.querySelector('#company-url');
        const submitBtn = this.shadowRoot.querySelector('#contact-button');
        const errorEl = this.shadowRoot.querySelector('.form-error');
        const counter = this.shadowRoot.querySelector('.char-counter');

        if (messageInput && counter) {
            messageInput.addEventListener('input', () => {
                counter.textContent = `${messageInput.value.length}/500`;
            });
        }

        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Honeypot
            if (honeypotInput && honeypotInput.value) {
                this.showThanks(form);
                return;
            }

            // 2. Валидация
            let invalidFields = [];
            if (!nameInput.value.trim()) invalidFields.push('Name');
            if (!emailInput.value.trim() || !emailInput.validity.valid) invalidFields.push('Email');
            if (!messageInput.value.trim() || messageInput.value.trim().length < 7) invalidFields.push('Message');
            if (!offerInput.checked) invalidFields.push('Terms and Conditions');

            if (invalidFields.length) {
                if (errorEl) errorEl.textContent = 'Please fill in correctly: ' + invalidFields.join(', ') + '.';
                return;
            }
            if (errorEl) errorEl.textContent = '';

            // 3. Логика капчи (идентична main.js, но с защитой от null)
            if (this.captchaRequired && window.hcaptcha) {
                // ЖЕЛЕЗНАЯ ЗАЩИТА: если виджет не отрисовался, не вызываем getResponse, а пытаемся отрисовать снова
                if (this.captchaWidgetId === null) {
                    this.showCaptchaNote('Captcha widget blocked. Retrying... Please click "Send Message" again.');
                    this.renderCaptcha();
                    return; 
                }
                
                const token = window.hcaptcha.getResponse(this.captchaWidgetId);
                if (!token) {
                    this.showCaptchaNote('Please complete the captcha.');
                    return;
                }
                this.submitFormData(token);
            } else {
                this.submitFormData(null);
            }
        });
    }

    submitFormData(captchaToken) {
        const nameInput = this.shadowRoot.querySelector('#name');
        const emailInput = this.shadowRoot.querySelector('#email');
        const messageInput = this.shadowRoot.querySelector('#message');
        const honeypotInput = this.shadowRoot.querySelector('#company-url');
        const submitBtn = this.shadowRoot.querySelector('#contact-button');
        const errorEl = this.shadowRoot.querySelector('.form-error');

        const gclid = localStorage.getItem('mraid_gclid') || '';
        const planTitle = this.currentPlan ? this.currentPlan.title : '';
        
        const params = new URLSearchParams();
        params.append('name', nameInput.value.trim());
        params.append('email', emailInput.value.trim());
        params.append('message', messageInput.value.trim());
        params.append('company_url', honeypotInput ? honeypotInput.value : '');
        params.append('gclid', gclid);
        params.append('source', window.location.hostname);
        params.append('v', '2');
        if (planTitle) params.append('plan', planTitle);
        if (captchaToken) params.append('hcaptcha', captchaToken);

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://dashboard.mraid.io/contact', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;

            if (xhr.status === 200) {
                this.showThanks(this.shadowRoot.querySelector('#contactForm'));
            } else if (xhr.status === 428 || (xhr.responseText && xhr.responseText.includes('captcha_required'))) {
                this.captchaRequired = true;
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                this.showCaptchaNote('Please confirm you are not a robot.');
                
                this.loadHcaptcha().then(() => {
                    this.renderCaptcha();
                }).catch(() => {
                    this.showCaptchaNote('Captcha failed to load. Please reload the page or write to sales@mraid.io.');
                });
            } else if (xhr.status === 400) {
                console.log('[hCaptcha] Сервер вернул 400 - сбрасываем капчу');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                
                // Сбрасываем виджет
                this.captchaWidgetId = null;
                this.captchaRequired = true;
                
                // Показываем модалку снова
                this.showCaptchaNote('Captcha check failed. Please try again.');
                setTimeout(() => {
                    this.renderCaptcha();
                }, 500);
            } else {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                if (errorEl) errorEl.textContent = 'Something went wrong. Please try again or write to sales@mraid.io.';
            }
        };

        xhr.onerror = () => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            if (errorEl) errorEl.textContent = 'Connection error. Please check your internet and try again.';
        };

        xhr.send(params.toString());
    }

    loadHcaptcha() {
        if (window.hcaptcha) return Promise.resolve();
        if (this.hcaptchaLoading) return this.hcaptchaLoading;
        
        this.hcaptchaLoading = new Promise((resolve, reject) => {
            // Создаем глобальный колбэк для загрузки API
            window.onLoadCallback = () => {
                console.log('[hCaptcha] API загружен!');
                resolve();
            };
            
            const s = document.createElement('script');
            // ДОБАВЛЯЕМ onload=onLoadCallback
            s.src = 'https://js.hcaptcha.com/1/api.js?onload=onLoadCallback&render=explicit';
            s.async = true;
            s.defer = true;
            s.onload = () => {
                console.log('[hCaptcha] Скрипт загружен, ждем API...');
            };
            s.onerror = () => {
                this.hcaptchaLoading = null;
                reject(new Error('hcaptcha load failed'));
            };
            document.head.appendChild(s);
        });
        return this.hcaptchaLoading;
    }

    renderCaptcha() {
        const modal = document.getElementById('hcaptcha-modal');
        const container = document.getElementById('hcaptcha-widget-container');
        
        if (!modal || !container) {
            console.error('[hCaptcha] Модальное окно или контейнер не найдены!');
            return;
        }

        // Показываем модалку
        modal.style.display = 'flex';
        console.log('[hCaptcha] Модальное окно открыто');

        // Проверяем, что API загружен
        if (!window.hcaptcha) {
            console.log('[hCaptcha] API еще не загружен, загружаем...');
            this.loadHcaptcha().then(() => {
                this.renderCaptcha();
            });
            return;
        }

        // Очищаем контейнер перед рендером
        container.innerHTML = '';
        this.captchaWidgetId = null;

        try {
            console.log('[hCaptcha] Рендерим виджет в модальном окне...');
            this.captchaWidgetId = window.hcaptcha.render(container, {
                sitekey: '7520fd58-5574-45a4-9246-4da25390e316',
                callback: this.onCaptchaSolved,
                'expired-callback': this.onCaptchaExpired,
                'error-callback': this.onCaptchaError,
                'theme': 'dark'
            });
            console.log('[hCaptcha] ✅ Виджет создан! ID:', this.captchaWidgetId);
        } catch (e) {
            console.error('[hCaptcha] ❌ Ошибка render:', e);
        }
    }

    // === Методы-колбэки для hCaptcha ===
    onCaptchaSolved(token) {
        console.log('[hCaptcha] Капча пройдена! Токен:', token ? token.substring(0, 20) + '...' : 'null');
        this.captchaErrorCount = 0;
        this.showCaptchaNote('');
        
        // Закрываем модалку
        const modal = document.getElementById('hcaptcha-modal');
        if (modal) modal.style.display = 'none';
        
        // Отправляем форму с токеном
        this.submitFormData(token);
    }

    onCaptchaExpired() {
        console.log('[hCaptcha] Токен истёк');
        this.captchaWidgetId = null;
        this.showCaptchaNote('Captcha expired. Please try again.');
    }

    onCaptchaError(error) {
        console.error('[hCaptcha] Ошибка:', error);
        this.captchaErrorCount++;
        
        // Сбрасываем виджет
        this.captchaWidgetId = null;
        
        if (this.captchaErrorCount >= 2) {
            this.showCaptchaNote('Captcha failed. Please reload the page.');
        }
    }

    showCaptchaNote(html) {
        const noteEl = this.shadowRoot.querySelector('.captcha-note');
        if (noteEl) noteEl.innerHTML = html;
    }

    showThanks(form) {
        // Скрываем модальное окно
        const modal = document.getElementById('hcaptcha-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        // Очищаем контейнер капчи
        const container = document.getElementById('hcaptcha-widget-container');
        if (container) {
            container.innerHTML = '';
        }
        
        form.style.display = 'none';
        const thanksMsg = document.createElement('div');
        thanksMsg.className = 'form-thanks';
        thanksMsg.innerHTML = '<p>Thanks! Your message has been submitted.<br>We will contact you within 24 hours.</p>';
        form.parentElement.appendChild(thanksMsg);
        
        localStorage.removeItem('selectedPlan');
        this.currentPlan = null;
        this.captchaRequired = false;
        this.captchaWidgetId = null;
    }
}

customElements.define('about-contact', AboutContact);