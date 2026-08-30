class ProcessSteps extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const steps = [
            {
                number: '01',
                title: 'Idea & Concept',
                description: 'We turn your brief or idea into playable concepts, mechanics and scenarios',
                icon: 'assets/img/process/idea.svg'
            },
            {
                number: '02',
                title: 'Game Design',
                description: 'We design engaging mechanics and map out key screens and flows',
                icon: 'assets/img/process/game.svg'
            },
            {
                number: '03',
                title: 'Art & Animation',
                description: 'We create high-quality visuals and animations that bring your playable to life',
                icon: 'assets/img/process/art.svg'
            },
            {
                number: '04',
                title: 'Development',
                description: 'We build clean, optimized HTML5 code for maximum performance',
                icon: 'assets/img/process/dev.svg'
            },
            {
                number: '05',
                title: 'Testing',
                description: 'We test across devices and ad networks to ensure perfect performance',
                icon: 'assets/img/process/testing.svg'
            },
            {
                number: '06',
                title: 'Launch & Support',
                description: 'We deliver, monitor results and support your campaign for growth',
                icon: 'assets/img/process/support.svg'
            }
        ];

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="pages/process/components/css/processStep.css">
            
            <section class="steps-row">
                <!-- Пунктирная линия -->
                <div class="dashed-line"></div>
                
                ${steps.map(step => `
                    <div class="step-card">
                        <div class="step-icon-wrapper">
                            <img src="${step.icon}" alt="${step.title} icon" class="step-icon">
                        </div>
                        <span class="step-number">${step.number}</span>
                        <h3 class="step-title">${step.title}</h3>
                        <p class="step-description">${step.description}</p>
                    </div>
                `).join('')}
            </section>
        `;
    }
}

customElements.define('process-steps', ProcessSteps);