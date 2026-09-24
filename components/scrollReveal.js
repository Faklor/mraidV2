class ScrollReveal {
    constructor(options = {}) {
        this.options = {
            threshold: 0.1, // Срабатывает, когда 10% элемента видно
            rootMargin: '0px 0px -50px 0px',
            duration: 0.8,
            delay: 0,
            stagger: 0,
            once: false,
            ...options
        };

        this.observers = new Map();
        this.init();
    }

    init() {
        this.injectStyles();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* ТОЛЬКО OPACITY. Это свойство НИКОГДА не влияет на размер страницы и скролл */
            .reveal-hidden {
                opacity: 0;
                transition: opacity ${this.options.duration}s cubic-bezier(0.4, 0, 0.2, 1);
                will-change: opacity;
            }

            .reveal-visible {
                opacity: 1;
            }

            /* Для последовательного появления (stagger) */
            .reveal-stagger > * {
                opacity: 0;
                transition: opacity ${this.options.duration}s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .reveal-stagger.reveal-visible > * {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    reveal(elements, customOptions = {}) {
        const options = { ...this.options, ...customOptions };
        const elementArray = Array.isArray(elements) || elements instanceof NodeList 
            ? Array.from(elements) 
            : [elements];

        elementArray.forEach((element, index) => {
            if (!element || this.observers.has(element)) return;

            element.classList.add('reveal-hidden');
            
            if (options.stagger > 0 && element.children.length > 0) {
                element.classList.add('reveal-stagger');
                Array.from(element.children).forEach((child, childIndex) => {
                    child.style.transitionDelay = `${options.delay + (childIndex * options.stagger)}s`;
                });
            } else {
                element.style.transitionDelay = `${options.delay + (index * options.stagger)}s`;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('reveal-hidden');
                        entry.target.classList.add('reveal-visible');

                        if (options.once) {
                            observer.unobserve(entry.target);
                            this.observers.delete(entry.target);
                        }
                    } else {
                        if (!options.once) {
                            entry.target.classList.remove('reveal-visible');
                            entry.target.classList.add('reveal-hidden');
                        }
                    }
                });
            }, {
                threshold: options.threshold,
                rootMargin: options.rootMargin
            });

            observer.observe(element);
            this.observers.set(element, observer);
        });
    }

    destroy(element) {
        if (this.observers.has(element)) {
            this.observers.get(element).disconnect();
            this.observers.delete(element);
            element.classList.remove('reveal-hidden', 'reveal-visible');
        }
    }

    destroyAll() {
        this.observers.forEach((observer) => observer.disconnect());
        this.observers.clear();
    }
}

window.scrollReveal = new ScrollReveal();