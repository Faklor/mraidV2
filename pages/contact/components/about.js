class AboutContact extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/contact/components/css/about.css">
            
            <section class="about-contact">
                <div class="contact-container">
                    <!-- Левая часть: заголовок + фото -->
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

                    <!-- Правая часть: форма -->
                    <div class="contact-right">
                        <div class="form-wrapper">
                            <h2 class="form-title">Send us a message</h2>
                            
                            <form class="contact-form" id="contactForm">
                                <div class="form-row">
                                    <div class="form-group">
                                        <input type="text" id="name" name="name" class="form-input" placeholder="Your name*" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" id="company" name="company" class="form-input" placeholder="Company">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <input type="email" id="email" name="email" class="form-input" placeholder="Email*" required>
                                </div>
                                
                                <div class="form-group textarea-group">
                                    <textarea id="message" name="message" class="form-textarea" placeholder="Tell us about your project*" maxlength="500" required></textarea>
                                    <span class="char-counter">0/500</span>
                                </div>
                                
                                <div class="form-checkbox">
                                    <label class="checkbox-label" for="terms">
                                        <input type="checkbox" id="terms" name="terms" checked required>
                                        <span class="checkbox-custom"></span>
                                        <span class="checkbox-text">I agree to the <a href="#" class="terms-link">Terms and Conditions</a>*</span>
                                    </label>
                                </div>
                                
                                <button type="submit" class="submit-btn">
                                    Send message
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
    }

    initForm() {
        const textarea = this.shadowRoot.querySelector('.form-textarea');
        const counter = this.shadowRoot.querySelector('.char-counter');
        const form = this.shadowRoot.querySelector('#contactForm');

        if (textarea && counter) {
            textarea.addEventListener('input', () => {
                counter.textContent = `${textarea.value.length}/500`;
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Form submitted');
                // Здесь можно добавить реальную отправку через fetch или EmailJS
            });
        }
    }
}

customElements.define('about-contact', AboutContact);