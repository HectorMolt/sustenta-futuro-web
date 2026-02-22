/**
 * Sustenta Futuro SpA — Landing Page Scripts
 * 
 * Features:
 * - Navbar scroll effect (transparent → solid)
 * - Smooth scroll navigation
 * - Intersection Observer scroll animations
 * - Counter animations for statistics
 * - Mobile menu toggle
 * - Contact form handler
 *
 * Author: Agent_DevOps
 * Date: 2026-02-22
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollAnimations();
    initCounterAnimations();
    initMobileMenu();
});


/**
 * Navbar: Adds 'scrolled' class when page is scrolled past 60px.
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}


/**
 * Scroll Animations: Uses Intersection Observer to fade-in elements
 * with the class 'animate-on-scroll' when they enter the viewport.
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
}


/**
 * Counter Animations: Animates numbers from 0 to their data-target
 * value when the stat card becomes visible.
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
}


/**
 * Animates a single counter element from 0 to its target value.
 *
 * Args:
 *     element: The DOM element with data-target attribute.
 */
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic for smooth deceleration
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(easedProgress * target);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}


/**
 * Mobile Menu: Toggles the hamburger menu and nav links panel.
 */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
    });

    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('open');
        });
    });
}


/**
 * Contact Form Handler: Provides visual feedback on submit.
 *
 * Note: This is a frontend-only handler. For production, connect
 * to a backend API or service like Formspree/EmailJS.
 *
 * Args:
 *     event: The form submit event.
 */
function handleFormSubmit(event) {
    event.preventDefault();

    const btn = document.getElementById('submitBtn');
    const form = document.getElementById('contactForm');

    if (!btn || !form) return;

    // Disable button during "send"
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    // Simulate send (replace with real API call)
    setTimeout(() => {
        btn.textContent = '✅ Mensaje Enviado';
        btn.style.background = 'linear-gradient(135deg, #4CAF50, #388E3C)';
        btn.style.opacity = '1';

        form.reset();

        setTimeout(() => {
            btn.textContent = 'Enviar Mensaje';
            btn.disabled = false;
            btn.style.background = '';
        }, 3000);
    }, 1200);
}
