/**
 * Scroll Animations
 * This script adds scroll-triggered animations to elements on the page.
 */

document.addEventListener('DOMContentLoaded', function() {
    setupScrollAnimations();
});

// Setup scroll animations for various elements
function setupScrollAnimations() {
    // Define sections to animate with different effects
    const sections = [
        { selector: 'section h1, section h2', animation: 'animate-fadeInUp', stagger: true },
        { selector: 'section p:not(:has(*))', animation: 'animate-fadeInUp', stagger: true, delay: 100 },
        { selector: '.bg-white.rounded-3xl, .bg-white.p-6, .bg-white.p-8', animation: 'animate-zoomIn', stagger: true },
        { selector: '.grid > div', animation: 'animate-fadeInUp', stagger: true },
        { selector: 'section > img, section div > img', animation: 'animate-fadeInUp' },
        { selector: '.container > .grid > div:nth-child(odd)', animation: 'animate-fadeInLeft', stagger: true },
        { selector: '.container > .grid > div:nth-child(even)', animation: 'animate-fadeInRight', stagger: true }
    ];

    // Process each section
    sections.forEach(section => {
        const elements = document.querySelectorAll(section.selector);
        if (elements.length === 0) return;
        
        elements.forEach((el, index) => {
            // Only add animation if it doesn't already have one
            if (!el.classList.contains('scroll-animation')) {
                el.classList.add('scroll-animation');
                
                // Add staggered delay if enabled
                if (section.stagger) {
                    const delay = section.delay || 0;
                    const staggerDelay = Math.min(index * 100, 500) + delay;
                    const delayClass = `delay-${Math.floor(staggerDelay / 100) * 100}`;
                    el.classList.add(delayClass);
                }
            }
        });
    });
    
    // Get all elements with scroll-animation class
    const animElements = document.querySelectorAll('.scroll-animation');
    
    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply the animation class based on criteria
                if (entry.target.closest('.container > .grid > div:nth-child(odd)')) {
                    entry.target.classList.add('animate-fadeInLeft');
                } else if (entry.target.closest('.container > .grid > div:nth-child(even)')) {
                    entry.target.classList.add('animate-fadeInRight');
                } else if (entry.target.matches('.bg-white.rounded-3xl, .bg-white.p-6, .bg-white.p-8')) {
                    entry.target.classList.add('animate-zoomIn');
                } else {
                    entry.target.classList.add('animate-fadeInUp');
                }
                
                // Stop observing once the animation is applied
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    // Start observing each element
    animElements.forEach(el => {
        observer.observe(el);
    });
} 