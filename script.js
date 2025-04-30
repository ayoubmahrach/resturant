// Mobile menu toggle - SIMPLIFIED VERSION
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            // Simple toggle - if it has the class 'hidden', remove it, otherwise add it
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                this.innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                `;
            } else {
                mobileMenu.classList.add('hidden');
                this.innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                `;
            }
        });
        
        // Close menu when clicking a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                `;
            });
        });
    }
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') !== '#') {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
    
    // Image hover effects for all cards
    const cardElements = document.querySelectorAll('.rounded-3xl, .bg-white');
    if (cardElements.length > 0) {
        cardElements.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                card.style.transition = 'all 0.3s ease';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
                card.style.transition = 'all 0.3s ease';
            });
        });
    }
    
    // Add click handler for all food items and restaurant cards
    const foodCards = document.querySelectorAll('.rounded-3xl.overflow-hidden.relative.shadow-md');
    if (foodCards.length > 0) {
        foodCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // If the click is not on a link element, navigate to menu page
                if (!e.target.closest('a')) {
                    window.location.href = 'menu.html';
                }
            });
            card.style.cursor = 'pointer';
        });
    }

    // Make all restaurant cards clickable
    const restaurantCards = document.querySelectorAll('.bg-white.p-6.rounded-3xl');
    if (restaurantCards.length > 0) {
        restaurantCards.forEach(card => {
            card.addEventListener('click', () => {
                const menuLink = card.querySelector('a[href="menu.html"]');
                if (menuLink) {
                    window.location.href = menuLink.getAttribute('href');
                } else {
                    window.location.href = 'menu.html';
                }
            });
            card.style.cursor = 'pointer';
        });
    }
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeIn');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Add active states to category buttons
    const categoryButtons = document.querySelectorAll('.px-6.py-2.rounded-full');
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => {
                    btn.classList.remove('bg-primary', 'text-white');
                    if (!btn.classList.contains('bg-white')) {
                        btn.classList.add('bg-white', 'hover:bg-gray-100');
                    }
                });
                // Add active class to clicked button
                button.classList.remove('bg-white', 'hover:bg-gray-100');
                button.classList.add('bg-primary', 'text-white');
            });
        });
    }
}

// Toggle active class on navigation items
function setActiveNav() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.endsWith(linkPath)) {
            link.classList.add('text-primary');
            link.classList.remove('text-dark');
            link.classList.add('font-medium');
        } else {
            link.classList.remove('text-primary');
            if (!link.classList.contains('text-white')) {
                link.classList.add('text-dark');
            }
            link.classList.add('hover:text-primary');
        }
    });
}

// Add shopping cart functionality
function handleCartButtons() {
    const addToCartButtons = document.querySelectorAll('.w-12.h-12.bg-primary.rounded-full');
    let cartCount = localStorage.getItem('cartCount') || 0;
    
    // Create or update cart icon if it doesn't exist
    const updateCartIcon = () => {
        let cartIcon = document.querySelector('.cart-icon');
        if (!cartIcon) {
            const navButtons = document.querySelector('.md\\:flex.items-center.space-x-4');
            if (navButtons) {
                cartIcon = document.createElement('div');
                cartIcon.classList.add('cart-icon', 'relative');
                
                const iconSvg = document.createElement('button');
                iconSvg.classList.add('rounded-full', 'p-2', 'hover:bg-gray-100', 'transition');
                iconSvg.innerHTML = `
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                `;
                
                cartIcon.appendChild(iconSvg);
                navButtons.insertBefore(cartIcon, navButtons.firstChild);
            }
        }
        
        // Add or update the cart counter badge
        let cartBadge = document.querySelector('.cart-badge');
        if (!cartBadge && cartCount > 0) {
            cartBadge = document.createElement('span');
            cartBadge.classList.add('cart-badge', 'absolute', 'top-0', 'right-0', 'bg-primary', 'text-white', 'rounded-full', 'w-5', 'h-5', 'flex', 'items-center', 'justify-center', 'text-xs');
            document.querySelector('.cart-icon')?.appendChild(cartBadge);
        }
        
        if (cartBadge) {
            if (cartCount > 0) {
                cartBadge.textContent = cartCount;
                cartBadge.classList.remove('hidden');
            } else {
                cartBadge.classList.add('hidden');
            }
        }
    };
    
    // Add event listeners to all add to cart buttons
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the parent card click
                cartCount++;
                localStorage.setItem('cartCount', cartCount);
                updateCartIcon();
                
                // Add animation effect
                button.classList.add('animate-ping');
                setTimeout(() => {
                    button.classList.remove('animate-ping');
                }, 300);
            });
        });
    }
    
    // Initialize cart icon on page load
    updateCartIcon();
}

// Call functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setActiveNav();
    handleCartButtons();
});

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-red-500');
                
                // Add error message if it doesn't exist
                let errorMsg = field.nextElementSibling;
                if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                    errorMsg = document.createElement('p');
                    errorMsg.classList.add('error-message', 'text-red-500', 'text-sm', 'mt-1');
                    errorMsg.textContent = 'This field is required';
                    field.parentNode.insertBefore(errorMsg, field.nextSibling);
                }
            } else {
                field.classList.remove('border-red-500');
                const errorMsg = field.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            }
        });
        
        if (!isValid) {
            e.preventDefault();
        } else {
            // Here you would typically handle form submission via AJAX
            alert('Form submitted successfully!');
            form.reset();
        }
    });
    
    // Clear error on input
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('border-red-500');
            const errorMsg = this.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.remove();
            }
        });
    });
}

// Initialize form validation on contact form when page loads
document.addEventListener('DOMContentLoaded', function() {
    validateForm('contact-form');
    validateForm('newsletter-form');
}); 