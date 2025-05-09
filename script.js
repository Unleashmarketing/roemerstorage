document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ----------------------------------------
    // Preloader
    // ----------------------------------------
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('hide');
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 300);
    });
    
    // ----------------------------------------
    // Sticky Header
    // ----------------------------------------
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // ----------------------------------------
    // Mobile Menu
    // ----------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const body = document.body;
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            
            if (nav.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (
            nav && 
            nav.classList.contains('active') && 
            !event.target.closest('.nav') && 
            !event.target.closest('.hamburger')
        ) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            body.style.overflow = '';
        });
    });
    
    // ----------------------------------------
    // Active Navigation Links
    // ----------------------------------------
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveNavLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // ----------------------------------------
    // Smooth Scrolling
    // ----------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ----------------------------------------
    // Back to Top Button
    // ----------------------------------------
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ----------------------------------------
    // Reveal Animation on Scroll
    // ----------------------------------------
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-slide-left, .reveal-slide-right');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    
    // ----------------------------------------
    // Number Counter Animation
    // ----------------------------------------
    const numberElements = document.querySelectorAll('.number');
    let countersStarted = false;
    
    function startCounters() {
        if (countersStarted) return;
        
        const keyNumbersSection = document.querySelector('.key-numbers');
        
        if (!keyNumbersSection) return;
        
        const sectionTop = keyNumbersSection.offsetTop;
        const sectionHeight = keyNumbersSection.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        if (scrollY > (sectionTop - windowHeight + 200) && scrollY < (sectionTop + sectionHeight)) {
            countersStarted = true;
            
            numberElements.forEach(numberElement => {
                const finalValue = parseInt(numberElement.getAttribute('data-count'));
                const duration = 2000; // ms
                const step = Math.ceil(finalValue / (duration / 20)); // Update every 20ms
                
                let currentValue = 0;
                
                const counter = setInterval(() => {
                    currentValue += step;
                    
                    if (currentValue >= finalValue) {
                        numberElement.textContent = finalValue;
                        clearInterval(counter);
                    } else {
                        numberElement.textContent = currentValue;
                    }
                }, 20);
            });
        }
    }
    
    window.addEventListener('scroll', startCounters);
    window.addEventListener('load', startCounters);
    
    // ----------------------------------------
    // Tab System
    // ----------------------------------------
    // Benefits Tabs
    const benefitTabBtns = document.querySelectorAll('.tab-btn');
    const benefitTabPanels = document.querySelectorAll('.tab-panel');
    
    benefitTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            benefitTabBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the tab id
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all panels
            benefitTabPanels.forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Add active class to corresponding panel
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Services Tabs
    const serviceTabBtns = document.querySelectorAll('.service-tab');
    const serviceContents = document.querySelectorAll('.service-content');
    
    serviceTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            serviceTabBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the service id
            const serviceId = this.getAttribute('data-service');
            
            // Remove active class from all contents
            serviceContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to corresponding content
            document.getElementById(serviceId).classList.add('active');
        });
    });
    
    // ----------------------------------------
    // Testimonial Slider
    // ----------------------------------------
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    if (testimonialTrack && testimonialSlides.length > 0) {
        let currentSlide = 0;
        const slideWidth = 100; // 100%
        
        // Create dots
        testimonialSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.dot');
        
        // Event listeners for buttons
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
        
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
        
        function goToSlide(slideIndex) {
            // Handle loop
            if (slideIndex < 0) {
                slideIndex = testimonialSlides.length - 1;
            } else if (slideIndex >= testimonialSlides.length) {
                slideIndex = 0;
            }
            
            // Update current slide
            currentSlide = slideIndex;
            
            // Move track
            testimonialTrack.style.transform = `translateX(-${slideWidth * currentSlide}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Auto slide
        let slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
        
        // Pause on hover
        testimonialTrack.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialTrack.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        });
        
        // Swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        testimonialTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        testimonialTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum swipe distance
            
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left
                goToSlide(currentSlide + 1);
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right
                goToSlide(currentSlide - 1);
            }
        }
    }
    
    // ----------------------------------------
    // Form Validation
    // ----------------------------------------
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                // Remove existing validation styling and messages
                field.classList.remove('is-invalid');
                const existingError = field.parentElement.querySelector('.error-message');
                if (existingError) existingError.remove();
                
                // Check if field is empty
                if (!field.value.trim()) {
                    isValid = false;
                    showError(field, 'Dieses Feld ist erforderlich');
                } else if (field.type === 'email' && !isValidEmail(field.value)) {
                    isValid = false;
                    showError(field, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const formId = form.getAttribute('id');
                
                // Replace form with success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                
                let message = '';
                
                if (formId === 'offer-form') {
                    message = 'Vielen Dank für Ihre Anfrage! Wir werden uns in Kürze mit Ihrem individuellen Angebot bei Ihnen melden.';
                } else if (formId === 'appointment-form') {
                    message = 'Vielen Dank! Ihr Termin wurde erfolgreich gebucht. Eine Bestätigung wurde an Ihre E-Mail-Adresse gesendet.';
                } else {
                    message = 'Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.';
                }
                
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Erfolgreich gesendet!</h3>
                    <p>${message}</p>
                `;
                
                form.parentElement.replaceChild(successMessage, form);
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
    
    function showError(field, message) {
        field.classList.add('is-invalid');
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        field.parentElement.appendChild(errorMessage);
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // ----------------------------------------
    // Cost Calculator
    // ----------------------------------------
    const calculateBtn = document.getElementById('calculate-btn');
    const costEstimate = document.getElementById('cost-estimate');
    const palletsInput = document.getElementById('pallets');
    const durationInput = document.getElementById('duration');
    
    if (calculateBtn && costEstimate && palletsInput && durationInput) {
        calculateBtn.addEventListener('click', function() {
            const pallets = parseInt(palletsInput.value) || 0;
            const duration = parseInt(durationInput.value) || 0;
            
            if (pallets <= 0 || duration <= 0) {
                costEstimate.innerHTML = `
                    <h3>Kostenabschätzung</h3>
                    <p class="error-message">Bitte geben Sie eine gültige Anzahl an Paletten und eine Lagerdauer ein.</p>
                `;
                costEstimate.classList.remove('hidden');
                return;
            }
            
            // Base rate per pallet per month
            const baseRate = 12.50;
            
            // Volume discount
            let rate = baseRate;
            if (pallets > 50) {
                rate = baseRate * 0.9;
            }
            if (pallets > 100) {
                rate = baseRate * 0.85;
            }
            if (pallets > 200) {
                rate = baseRate * 0.8;
            }
            
            // Duration discount
            let durationFactor = 1;
            if (duration >= 6) {
                durationFactor = 0.95;
            }
            if (duration >= 12) {
                durationFactor = 0.9;
            }
            
            const total = pallets * rate * duration * durationFactor;
            const monthlyRate = total / duration;
            
            costEstimate.innerHTML = `
                <h3>Kostenabschätzung</h3>
                <p>Basierend auf <strong>${pallets} Paletten</strong> für <strong>${duration} Monate</strong>:</p>
                <div class="estimate-details">
                    <div class="estimate-row">
                        <span>Grundpreis pro Palette:</span>
                        <span>${rate.toFixed(2)}€ / Monat</span>
                    </div>
                    <div class="estimate-row">
                        <span>Monatlicher Preis:</span>
                        <span>${monthlyRate.toFixed(2)}€</span>
                    </div>
                    <div class="estimate-row total">
                        <span>Gesamtpreis:</span>
                        <span>${total.toFixed(2)}€</span>
                    </div>
                </div>
                <p class="note">Dies ist eine unverbindliche Kostenschätzung. Für ein genaues Angebot kontaktieren Sie uns bitte.</p>
            `;
            
            costEstimate.classList.remove('hidden');
            
            // Add some styling to the estimate
            const estimateDetails = costEstimate.querySelector('.estimate-details');
            if (estimateDetails) {
                estimateDetails.style.marginTop = '15px';
                estimateDetails.style.marginBottom = '15px';
                estimateDetails.style.borderRadius = '5px';
                estimateDetails.style.overflow = 'hidden';
                
                const estimateRows = estimateDetails.querySelectorAll('.estimate-row');
                estimateRows.forEach((row, index) => {
                    row.style.display = 'flex';
                    row.style.justifyContent = 'space-between';
                    row.style.padding = '10px 15px';
                    row.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#ffffff';
                    
                    if (row.classList.contains('total')) {
                        row.style.backgroundColor = 'var(--primary)';
                        row.style.color = 'white';
                        row.style.fontWeight = 'bold';
                    }
                });
            }
        });
    }
    
    // ----------------------------------------
    // Cookie Consent
    // ----------------------------------------
    const cookieConsent = document.querySelector('.cookie-consent');
    const cookieAccept = document.querySelector('.cookie-accept');
    const cookieSettings = document.querySelector('.cookie-settings');
    
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (!cookiesAccepted && cookieConsent) {
        // Show cookie consent after a delay
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000);
        
        // Accept cookies
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieConsent.classList.remove('show');
        });
        
        // Cookie settings (for now, just close the banner)
        cookieSettings.addEventListener('click', () => {
            // Here you would typically open a more detailed cookie settings modal
            // For simplicity, we'll just close the banner
            cookieConsent.classList.remove('show');
        });
    }
    
    // ----------------------------------------
    // Current Year
    // ----------------------------------------
    document.querySelector('.current-year').textContent = new Date().getFullYear();
});
