/**
 * FA&ML - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
   
    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Close menu when scrolling
    window.addEventListener('scroll', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });

    // Flip Card Touch Support for Mobile
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent closing when clicking the button
            if (e.target.closest('.btn-card')) {
                return;
            }
            card.classList.toggle('active');
        });
    });
    
    // Close flip cards when clicking outside on mobile
    document.addEventListener('click', (e) => {
        flipCards.forEach(card => {
            if (!card.contains(e.target)) {
                card.classList.remove('active');
            }
        });
    });

    const revealElements = document.querySelectorAll('.scroll-reveal');
    const observerOptions = { threshold: 0.15 };

    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealOnScroll, observerOptions);
    revealElements.forEach(el => observer.observe(el));

    const counters = document.querySelectorAll('.stat-number');
    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let current = 0;
                const updateCounter = () => {
                    current += target / 100;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    };

    const counterObserver = new IntersectionObserver(animateCounters, { threshold: 0.8 });
    counters.forEach(c => counterObserver.observe(c));

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        window.scrollY > 50 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled');
    });
});