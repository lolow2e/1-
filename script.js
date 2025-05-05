// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const envelope = document.querySelector('.envelope');
const envelopeWrapper = document.querySelector('.envelope-wrapper');
const envelopeContainer = document.querySelector('.envelope-container');
const mainContent = document.querySelector('.main-content');
const fireworksContainer = document.querySelector('.fireworks-container');
const particlesContainer = document.querySelector('.particles-container');
const starsContainer = document.querySelector('.stars-container');
const tapPulse = document.querySelector('.tap-pulse');
const tapCircle = document.querySelector('.tap-circle');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Create stars for invitation section
    createStars();
    
    // Create floating particles
    createParticles();
    
    // Initialize VanillaTilt for gallery items
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.gallery-item[data-tilt]'), {
            max: 25,
            speed: 400,
            glare: true,
            'max-glare': 0.5,
        });
    }
    
    // Add click event to envelope and the entire wrapper
    if (envelope) {
        envelope.addEventListener('click', openEnvelope);
    }
    
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener('click', openEnvelope);
    }
    
    // Add hover animations
    if (tapPulse && tapCircle) {
        gsap.to(tapPulse, {
            scale: 2,
            opacity: 0,
            duration: 1.5,
            repeat: -1,
            ease: "power1.out"
        });
    }
    
    // Initialize 3D card effect immediately
    init3DCardEffect();
    
    // Skip envelope if needed for testing
    // Раскомментируйте следующую строку для тестирования без конверта
    // mainContent.classList.add('show');
    // initAnimations();
});

// Function to open the envelope and show the invitation
function openEnvelope() {
    envelope.classList.add('open');
    
    // Show fireworks animation
    createFireworks(5);
    
    // Wait for envelope opening animation to complete
    setTimeout(() => {
        if (envelopeContainer) {
            envelopeContainer.classList.add('open');
        }
        
        // Show main content
        setTimeout(() => {
            if (mainContent) {
                mainContent.classList.add('show');
                
                // Initialize GSAP animations after content is shown
                initAnimations();
            }
        }, 600);
    }, 1500);
}

// Create stars background for invitation section
function createStars() {
    if (!starsContainer) return;
    
    const starsCount = 100;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random twinkle animation delay
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsContainer.appendChild(star);
    }
}

// Create floating particles
function createParticles() {
    if (!particlesContainer) return;
    
    const particlesCount = 30;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random opacity
        particle.style.opacity = (Math.random() * 0.5 + 0.1).toString();
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        // Random colors
        const colors = ['rgba(255,255,255,0.7)', 'rgba(255,215,0,0.5)', 'rgba(255,69,0,0.5)', 'rgba(65,105,225,0.5)'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Create fireworks effect
function createFireworks(count) {
    if (!fireworksContainer) return;
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            firework.style.left = `${posX}%`;
            firework.style.top = `${posY}%`;
            
            fireworksContainer.appendChild(firework);
            
            // Animate the firework
            setTimeout(() => {
                firework.classList.add('explode');
                
                // Create particles for explosion
                createExplosion(posX, posY);
                
                // Remove the firework after animation
                setTimeout(() => {
                    firework.remove();
                }, 1000);
            }, Math.random() * 1000 + 500);
        }, i * 800);
    }
}

// Initialize 3D card effect
function init3DCardEffect() {
    const card = document.querySelector('.card');
    if (!card) return;
    
    // Add manual 3D rotation on mouse move
    card.addEventListener('mousemove', function(e) {
        const cardRect = this.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;
        
        // Calculate rotation angles based on mouse position
        // Reduce rotation amount to make it more subtle
        const rotateY = mouseX * 0.1; 
        const rotateX = -mouseY * 0.1;
        
        // Apply rotation transformation
        this.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });
    
    // Reset rotation when mouse leaves the card
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
    
    // For touch devices - add similar effect on touch
    card.addEventListener('touchmove', function(e) {
        // Prevent scrolling when interacting with the card
        e.preventDefault();
        
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const touchX = touch.clientX - cardCenterX;
            const touchY = touch.clientY - cardCenterY;
            
            // Calculate rotation angles based on touch position
            const rotateY = touchX * 0.1;
            const rotateX = -touchY * 0.1;
            
            // Apply rotation transformation
            this.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        }
    });
    
    // Add click/touch event to flip the card
    card.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
    
    // Add CSS for flipping card
    const style = document.createElement('style');
    style.textContent = `
        .card {
            transform-style: preserve-3d;
            transition: transform 0.6s;
        }
        
        .card.flipped {
            transform: rotateY(180deg);
        }
        
        .card-front, .card-back {
            backface-visibility: hidden;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        .card-back {
            transform: rotateY(180deg);
        }
    `;
    document.head.appendChild(style);
}

// Create explosion particles
function createExplosion(x, y) {
    if (!fireworksContainer) return;
    
    const colors = ['#ff0', '#ff4500', '#00ff00', '#4169e1', '#ff1493'];
    const particlesCount = 30;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        
        // Position at explosion center
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        // Random color
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random size
        const size = Math.random() * 7 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const duration = Math.random() * 1 + 0.5;
        
        // Animate using GSAP
        gsap.to(particle, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            duration: duration,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
        
        fireworksContainer.appendChild(particle);
    }
}

// Initialize all GSAP animations
function initAnimations() {
    // Hero section animations
    gsap.to('.badge', {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        delay: 0.2
    });
    
    gsap.to('.title-container', {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)"
    });
    
    gsap.to('.decoration-line', {
        width: '80%',
        duration: 1,
        delay: 0.5
    });
    
    // Animate hero particles
    gsap.fromTo('.hero-particles', 
        { opacity: 0 },
        { opacity: 0.5, duration: 2, ease: "power2.inOut" }
    );
    
    // Animate decorative elements
    gsap.from('.hero-decoration .deco-line, .hero-decoration .deco-circle', {
        opacity: 0,
        scale: 0.5,
        stagger: 0.2,
        duration: 1.5,
        ease: "power3.out"
    });

    // Animate the 3D card in congratulation section
    gsap.from('.card-3d-space', {
        scrollTrigger: {
            trigger: '.congrats',
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        onComplete: () => {
            // Add hover hint after animation
            const hintElement = document.createElement('div');
            hintElement.className = 'hover-hint';
            hintElement.textContent = 'Үстіне апарыңыз немесе басыңыз'; // Hover or tap here
            document.querySelector('.card-3d-space').appendChild(hintElement);
            
            gsap.from(hintElement, {
                opacity: 0,
                y: 20,
                duration: 0.5
            });
            
            setTimeout(() => {
                gsap.to(hintElement, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => hintElement.remove()
                });
            }, 3000);
        }
    });

    // Animate gallery items with staggered effect
    gsap.from('.gallery-item', {
        scrollTrigger: {
            trigger: '.gallery',
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        stagger: 0.2, // Staggered animation
        duration: 0.8,
        ease: 'back.out(1.7)'
    });

    // Create scroll-triggered fireworks in invitation section
    ScrollTrigger.create({
        trigger: '.invitation',
        start: 'top center',
        onEnter: () => createFireworks(3)
    });

    // Pulse animation for accept button with glow effect
    const acceptBtn = document.querySelector('.accept-btn');
    if (acceptBtn) {
        gsap.to(acceptBtn, {
            boxShadow: '0 0 25px rgba(255, 62, 85, 0.8)',
            scale: 1.05,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

// Modal functionality for accept button
const acceptButton = document.getElementById('acceptButton');
if (acceptButton) {
    acceptButton.addEventListener('click', () => {
        showBigFireworks();
        showAcceptModal();
    });
}

// Create modal for accept button
function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="close-modal">&times;</div>
        <div class="modal-content">
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
            <h2>Рахмет!</h2>
            <p>Сіздің қатысатыныңызды білдік!</p>
            <p>6 мамырда кездескенше!</p>
            <div class="modal-decoration"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeButton = modal.querySelector('.close-modal');
    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    return modal;
}

// Show accept modal with animations
function showAcceptModal() {
    let modal = document.querySelector('.modal');
    
    if (!modal) {
        modal = createModal();
    }
    
    setTimeout(() => {
        modal.classList.add('active');
        
        // Animate modal content elements
        const modalContent = modal.querySelector('.modal-content');
        const elements = modalContent.children;
        
        gsap.from(elements, {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        });
        
        // Add confetti inside modal
        setTimeout(() => {
            showModalConfetti(modal);
        }, 300);
    }, 500);
}

// Show big fireworks when accepting invitation
function showBigFireworks() {
    createFireworks(10); // More fireworks for acceptance
    
    // Add special golden fireworks
    setTimeout(() => {
        createSpecialFirework();
    }, 500);
}

// Create special golden firework in the center
function createSpecialFirework() {
    if (!fireworksContainer) return;
    
    const firework = document.createElement('div');
    firework.className = 'firework special';
    
    // Center position
    firework.style.left = '50%';
    firework.style.top = '50%';
    
    fireworksContainer.appendChild(firework);
    
    // Animate with bigger explosion
    setTimeout(() => {
        firework.classList.add('explode');
        
        // Create special golden explosion
        createGoldenExplosion(50, 50);
        
        setTimeout(() => {
            firework.remove();
        }, 1000);
    }, 300);
}

// Create golden explosion with special particles
function createGoldenExplosion(x, y) {
    if (!fireworksContainer) return;
    
    const colors = ['#ffd700', '#ffdf00', '#f8d568', '#daa520'];
    const particlesCount = 60; // More particles for special effect
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle golden';
        
        // Position at explosion center
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        // Random color from gold palette
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random size
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 150 + 50;
        const duration = Math.random() * 1.5 + 1;
        
        // Animate using GSAP with more impressive effect
        gsap.to(particle, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            duration: duration,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
        
        fireworksContainer.appendChild(particle);
    }
}

// Small confetti inside the modal
function showModalConfetti(modal) {
    const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590'];
    const modalContent = modal.querySelector('.modal-content');
    
    for (let i = 0; i < 30; i++) { // Fewer confetti for modal
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'modal-confetti';
            
            // Random color
            const color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.backgroundColor = color;
            
            // Random position at top of modal
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '0';
            
            // Random size
            const size = Math.random() * 8 + 4;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            
            // Random shape
            if (Math.random() < 0.3) {
                confetti.style.borderRadius = '50%';
            }
            
            modalContent.appendChild(confetti);
            
            // Animate fall
            gsap.to(confetti, {
                y: modalContent.offsetHeight,
                x: (Math.random() - 0.5) * 100,
                rotation: Math.random() * 360,
                opacity: 0,
                duration: 1 + Math.random() * 1,
                ease: 'power1.out',
                onComplete: () => confetti.remove()
            });
        }, i * 100);
    }
}

// 3D parallax effect for sections on scroll
window.addEventListener('scroll', () => {
    if (!mainContent.classList.contains('show')) return;
    
    const scrollY = window.scrollY;
    
    // Parallax for title and content
    gsap.to('.hero .title-container', {
        y: scrollY * 0.4,
        duration: 0.1
    });
    
    gsap.to('.hero .animate-subtitle, .hero .animate-signature', {
        y: scrollY * 0.2,
        duration: 0.1
    });
    
    // Parallax for gallery section
    gsap.to('.gallery h2', {
        y: (scrollY - document.querySelector('.gallery').offsetTop) * 0.2,
        duration: 0.1
    });
    
    // Parallax for invitation stars
    const starsY = (scrollY - document.querySelector('.invitation').offsetTop) * 0.1;
    if (starsContainer) {
        gsap.to(starsContainer, {
            y: starsY,
            duration: 0.1
        });
    }
});

// Add CSS for fireworks and explosion particles
function addExtraStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .firework {
            position: absolute;
            width: 5px;
            height: 5px;
            background-color: #fff;
            border-radius: 50%;
            box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
            transform: translateY(100vh);
        }
        
        .firework.explode {
            background-color: transparent;
            box-shadow: none;
        }
        
        .firework.special {
            width: 10px;
            height: 10px;
            background-color: #ffd700;
            box-shadow: 0 0 20px 5px rgba(255, 215, 0, 0.8);
        }
        
        .explosion-particle {
            position: absolute;
            width: 5px;
            height: 5px;
            background-color: #fff;
            border-radius: 50%;
            z-index: 100;
        }
        
        .explosion-particle.golden {
            box-shadow: 0 0 5px 2px rgba(255, 215, 0, 0.5);
        }
        
        .hover-hint {
            position: absolute;
            bottom: -40px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            white-space: nowrap;
        }
        
        .modal-confetti {
            position: absolute;
            z-index: 10;
        }
        
        .success-icon {
            font-size: 3rem;
            color: #4BB543;
            margin-bottom: 1rem;
        }
        
        .modal-decoration {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 10px;
            background: linear-gradient(90deg, var(--primary-color), var(--gold-color), var(--primary-color));
            border-radius: 0 0 20px 20px;
        }
        
        .modal-content {
            background: linear-gradient(135deg, #fff, #f5f5f5);
            position: relative;
            overflow: hidden;
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize everything once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add styles for dynamic elements
    addExtraStyles();
    
    // Check URL for auto-open parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('open') && urlParams.get('open') === 'true') {
        setTimeout(openEnvelope, 1000);
    }
});

// Mobile touch handlers for 3D effects
if ('ontouchstart' in window) {
    document.addEventListener('DOMContentLoaded', () => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('touchstart', () => {
                gsap.to(item, {
                    scale: 1.05,
                    rotationY: '5deg',
                    duration: 0.3
                });
            });
            
            item.addEventListener('touchend', () => {
                gsap.to(item, {
                    scale: 1,
                    rotationY: '0deg',
                    duration: 0.3
                });
            });
        });
    });
}
