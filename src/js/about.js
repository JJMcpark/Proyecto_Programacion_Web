class AboutPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupAnimations();
        this.setupScrollEffects();
        this.setupInteractiveElements();
    }

    setupAnimations() {
        this.observeElements();
        this.animateStats();
    }

    observeElements() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    const children = entry.target.querySelectorAll('.value-item, .team-member, .stat-card');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 150);
                    });
                }
            });
        }, options);

        const sections = document.querySelectorAll('.stats-section, .values-section, .team-section, .mission-vision');
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    animateStats() {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    const duration = 2000;
                    const start = performance.now();
                    
                    const animate = (currentTime) => {
                        const elapsed = currentTime - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(easeOutCubic * target);
                        
                        entry.target.textContent = current.toLocaleString();
                        
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            entry.target.style.transform = 'scale(1.1)';
                            setTimeout(() => {
                                entry.target.style.transform = 'scale(1)';
                            }, 200);
                        }
                    };
                    
                    requestAnimationFrame(animate);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-about');
            
            if (hero) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        this.createReadingProgressBar();
    }

    createReadingProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, var(--morado, #6c5ce7), var(--amarillo, #ffd700));
            z-index: 1000;
            transition: width 0.3s ease;
        `;
        
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            
            progressBar.style.width = scrollPercent + '%';
        });
    }

    setupInteractiveElements() {
        this.setupTeamCardEffects();
        this.setupValueTooltips();
        this.setupSmoothScroll();
    }

    setupTeamCardEffects() {
        const teamMembers = document.querySelectorAll('.team-member');
        
        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', () => {
                member.style.transform = 'translateY(-10px) scale(1.02)';
                member.style.zIndex = '10';
            });
            
            member.addEventListener('mouseleave', () => {
                member.style.transform = 'translateY(0) scale(1)';
                member.style.zIndex = '1';
            });
        });
    }

    setupValueTooltips() {
        const valueItems = document.querySelectorAll('.value-item');
        
        const tooltips = {
            'Compromiso': 'Trabajamos incansablemente para asegurar que cada miembro alcance sus objetivos personales de fitness.',
            'Excelencia': 'Mantenemos los más altos estándares en equipamiento, limpieza e instalaciones de última generación.',
            'Innovación': 'Constantemente incorporamos nuevas tecnologías y métodos de entrenamiento probados científicamente.',
            'Comunidad': 'Creamos un ambiente donde todos se sienten parte de una gran familia fitness motivadora.'
        };

        valueItems.forEach(item => {
            const title = item.querySelector('h4').textContent;
            const tooltip = tooltips[title];
            
            if (tooltip) {
                item.addEventListener('mouseenter', (e) => {
                    this.showTooltip(e, tooltip);
                });
                
                item.addEventListener('mouseleave', () => {
                    this.hideTooltip();
                });
            }
        });
    }

    showTooltip(event, text) {
        const tooltip = document.createElement('div');
        tooltip.id = 'custom-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 0.9rem;
            max-width: 250px;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = event.currentTarget.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        
        setTimeout(() => tooltip.style.opacity = '1', 10);
    }

    hideTooltip() {
        const tooltip = document.getElementById('custom-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 300);
        }
    }

    setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    addParticleEffects() {
        const hero = document.querySelector('.hero-about');
        if (!hero) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
        `;
        
        hero.style.position = 'relative';
        hero.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            particlesContainer.appendChild(particle);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 1; }
                50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
            }
        `;
        document.head.appendChild(style);
    }
}

const aboutStyles = document.createElement('style');
aboutStyles.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .stat-card, .value-item, .team-member {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .hero-about {
        position: relative;
        overflow: hidden;
    }

    .team-member {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .value-item {
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .value-item:hover {
        transform: scale(1.05) translateY(-5px);
    }
`;

document.head.appendChild(aboutStyles);

document.addEventListener('DOMContentLoaded', () => {
    new AboutPage();
});