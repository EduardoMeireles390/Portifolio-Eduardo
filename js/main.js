/**
 * Portfólio de Eduardo Meireles
 * Analista de Projetos
 * 
 * JavaScript principal com implementação de:
 * - GSAP para animações
 * - ScrollTrigger para animações baseadas em scroll
 * - Lenis para scroll suave
 * - Efeitos visuais inspirados no site Shakers Agência
 */

// Esperar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Inicializar Lenis para scroll suave
    initSmoothScroll();
    
    // Inicializar loader
    initLoader();
    
    // Inicializar navegação
    initNavigation();
    
    // Inicializar animações
    initAnimations();
    
    // Inicializar formulário de contato
    initContactForm();
    
    // Adicionar animação para a seção de experiência
    animateExperiencia();
});

// Função para inicializar o scroll suave com Lenis
function initSmoothScroll() {
    const lenis = new Lenis({
        duration: 0.8,           // Reduzido de 1.2 para 0.8 para tornar a rolagem mais rápida
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 0.8,    // Reduzido de 1 para 0.8 para melhor controle
        smoothTouch: true,       // Alterado para true para melhorar a experiência em dispositivos touch
        touchMultiplier: 1.5,    // Reduzido de 2 para 1.5 para melhor controle em dispositivos touch
        infinite: false,
        wheelEventsTarget: document.body // Definir o alvo dos eventos de roda do mouse
    });
    
    // Integração do Lenis com o GSAP
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    // Atualizar o Lenis quando a janela for redimensionada
    window.addEventListener('resize', () => {
        lenis.resize();
    });
    
    // Integração com ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);
    
    // Adicionar método para parar o scroll quando necessário
    window.lenis = lenis;
    
    // Melhorar a navegação por âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Parar o scroll suave temporariamente para evitar conflitos
                lenis.stop();
                
                // Usar GSAP para scroll
                gsap.to(window, {
                    duration: 0.8,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80
                    },
                    ease: 'power2.out',
                    onComplete: () => {
                        // Retomar o scroll suave após a animação
                        setTimeout(() => {
                            lenis.start();
                        }, 100);
                    }
                });
            }
        });
    });
}

// Função para inicializar o loader
function initLoader() {
    const loader = document.querySelector('.loader');
    const loaderBar = document.querySelector('.loader-bar');
    
    // Timeline para animação do loader
    const loaderTl = gsap.timeline({
        onComplete: () => {
            // Remover o loader após a animação
            gsap.to(loader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loader.style.display = 'none';
                }
            });
        }
    });
    
    // Animação do loader
    loaderTl
        .to(loaderBar, {
            width: '100%',
            duration: 2,
            ease: 'power2.inOut'
        })
        .to(loaderBar, {
            opacity: 0,
            duration: 0.5
        });
}

// Função para inicializar a navegação
function initNavigation() {
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Adicionar classe 'scrolled' ao header quando rolar a página
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Toggle menu mobile
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Destacar link ativo baseado na seção visível
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Função para inicializar as animações
function initAnimations() {
    // Animação do hero
    animateHero();
    
    // Animação das seções
    animateSections();
    
    // Animação das skills
    animateSkills();
    
    // Animação do timeline
    animateTimeline();
    
    // Animação das certificações
    animateCertificacoes();
    
    // Animação dos projetos
    animateProjetos();
    
    // Efeito de mundo/globo (inspirado no site Shakers)
    createWorldEffect();
}

// Animação da seção hero
function animateHero() {
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    const heroTl = gsap.timeline();
    
    heroTl
        .from(heroText.querySelector('h1'), {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 2.5, // Esperar o loader terminar
            ease: 'power3.out'
        })
        .from(heroText.querySelector('h2'), {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4')
        .from(heroText.querySelector('p'), {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4')
        .from(heroText.querySelectorAll('.btn'), {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.4')
        .from(heroImage, {
            opacity: 0,
            x: 50,
            duration: 1,
            ease: 'power3.out'
        }, '-=1')
        .from(scrollIndicator, {
            opacity: 0,
            y: -20,
            duration: 0.8,
            ease: 'power3.out'
        });
}

// Animação das seções
function animateSections() {
    // Animação dos cabeçalhos de seção
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
}

// Animação das skills
function animateSkills() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(level => {
        const width = level.style.width;
        
        // Resetar largura para animação
        gsap.set(level, { width: 0 });
        
        // Animar quando visível
        gsap.to(level, {
            width: width,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: level,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });
}

// Animação da seção de experiência
function animateExperiencia() {
    const experienciaItems = document.querySelectorAll('.experiencia-item');
    
    experienciaItems.forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            x: -50,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
}

// Animação do timeline
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            x: -50,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
}

// Animação das certificações
function animateCertificacoes() {
    const certificacoes = document.querySelectorAll('.certificacao-item');
    
    certificacoes.forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
}

// Animação dos projetos
function animateProjetos() {
    const projetos = document.querySelectorAll('.projeto-item');
    
    projetos.forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
}

// Efeito de mundo/globo (inspirado no site Shakers)
function createWorldEffect() {
    // Criar o elemento canvas para o efeito de mundo
    const worldCanvas = document.createElement('canvas');
    worldCanvas.classList.add('world-effect');
    document.querySelector('.hero').appendChild(worldCanvas);
    
    // Estilizar o canvas
    worldCanvas.style.position = 'absolute';
    worldCanvas.style.top = '0';
    worldCanvas.style.left = '0';
    worldCanvas.style.width = '100%';
    worldCanvas.style.height = '100%';
    worldCanvas.style.pointerEvents = 'none';
    worldCanvas.style.zIndex = '1';
    
    // Configurar o canvas
    const ctx = worldCanvas.getContext('2d');
    let width = worldCanvas.width = window.innerWidth;
    let height = worldCanvas.height = window.innerHeight;
    
    // Redimensionar o canvas quando a janela for redimensionada
    window.addEventListener('resize', () => {
        width = worldCanvas.width = window.innerWidth;
        height = worldCanvas.height = window.innerHeight;
    });
    
    // Configurações do efeito
    const particles = [];
    const particleCount = 100;
    const maxDistance = 200;
    const mouseRadius = 100;
    
    // Posição do mouse
    let mouseX = 0;
    let mouseY = 0;
    
    // Atualizar posição do mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Classe Particle
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = '#2C74B3';
        }
        
        update() {
            // Mover partícula
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Verificar limites
            if (this.x < 0 || this.x > width) {
                this.speedX *= -1;
            }
            
            if (this.y < 0 || this.y > height) {
                this.speedY *= -1;
            }
            
            // Interação com o mouse
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouseRadius) {
                const angle = Math.atan2(dy, dx);
                const force = (mouseRadius - distance) / mouseRadius;
                
                this.speedX -= force * Math.cos(angle) * 0.1;
                this.speedY -= force * Math.sin(angle) * 0.1;
            }
            
            // Limitar velocidade
            const maxSpeed = 2;
            const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
            
            if (speed > maxSpeed) {
                this.speedX = (this.speedX / speed) * maxSpeed;
                this.speedY = (this.speedY / speed) * maxSpeed;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Criar partículas
    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Conectar partículas próximas
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(44, 116, 179, ${1 - distance / maxDistance})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animar o efeito
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Atualizar e desenhar partículas
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        // Conectar partículas
        connectParticles();
        
        requestAnimationFrame(animate);
    }
    
    // Iniciar o efeito
    createParticles();
    animate();
}

// Função para inicializar o formulário de contato
function initContactForm() {
    const form = document.getElementById('form-contato');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            // Não prevenir o comportamento padrão para permitir o envio pelo FormSubmit
            // e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // O FormSubmit cuidará do redirecionamento e processamento do formulário
        });
    }
}

document.getElementById('download-cv')?.addEventListener('click', function (e) {
    const btn = this;
    btn.textContent = 'Baixando...';
    btn.classList.add('downloading');

    // Restaurar o texto original após 2 segundos
    setTimeout(() => {
        btn.textContent = 'Baixar Currículo';
        btn.classList.remove('downloading');
    }, 2000);
});


// Função para inicializar o scroll suave com Lenis
function initSmoothScroll() {
    const lenis = new Lenis({
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1.0,
        smoothTouch: true,
        touchMultiplier: 1.0,
        infinite: false,
        wheelEventsTarget: document.body
    });

    // Integração com GSAP ticker para animação fluida
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // Atualizar o Lenis quando a janela for redimensionada
    window.addEventListener('resize', () => {
        lenis.resize();
    }, { passive: true });

    // Deixar Lenis acessível globalmente
    window.lenis = lenis;

    // Navegação suave por âncoras com scroll controlado
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#' || !document.querySelector(targetId)) return;

            const targetElement = document.querySelector(targetId);

            gsap.to(window, {
                scrollTo: {
                    y: targetElement,
                    offsetY: 80
                },
                duration: 0.8,
                ease: 'power2.out',
                onStart: () => lenis.stop(),
                onComplete: () => {
                    setTimeout(() => {
                        lenis.start();
                    }, 100);
                }
            });
        });
    });

    // Corrigir comportamento de scroll nativo que interfere no Lenis
    document.documentElement.style.scrollBehavior = "auto";
}
function initContactForm() {
    const form = document.getElementById('form-contato');
    const mensagem = document.getElementById('mensagem-envio');
  
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
  
        const formData = new FormData(form);
        const action = 'https://formsubmit.co/ajax/eduardomeireles390@gmail.com';
  
        try {
          const response = await fetch(action, {
            method: 'POST',
            body: formData
          });
  
          if (response.ok) {
            form.reset();
            mensagem.style.display = 'block';
            setTimeout(() => {
              mensagem.style.display = 'none';
            }, 4000);
          } else {
            alert('Erro ao enviar. Tente novamente.');
          }
        } catch (error) {
          alert('Erro de conexão. Verifique sua internet.');
        }
  
        submitButton.textContent = 'Enviar Mensagem';
        submitButton.disabled = false;
      });
    }
  }
  