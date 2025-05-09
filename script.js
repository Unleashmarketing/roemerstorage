document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'visible';
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav && nav.classList.contains('active') && !event.target.closest('nav') && !event.target.closest('.menu-toggle')) {
            nav.classList.remove('active');
            document.body.style.overflow = 'visible';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.body.style.overflow = 'visible';
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active menu indicator
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    function setActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // Form validation and submission
    const offerForm = document.getElementById('offer-form');
    const appointmentForm = document.getElementById('appointment-form');
    
    if (offerForm) {
        offerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(offerForm)) {
                showFormSuccess(offerForm, 'Vielen Dank für Ihre Anfrage! Wir werden uns in Kürze bei Ihnen melden.');
            }
        });
    }
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(appointmentForm)) {
                showFormSuccess(appointmentForm, 'Vielen Dank! Ihr Termin wurde angefragt. Wir bestätigen diesen in Kürze.');
            }
        });
    }
    
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                markFieldAsInvalid(field, 'Dieses Feld ist erforderlich');
                isValid = false;
            } else {
                clearFieldValidation(field);
                
                // Additional validation for email
                if (field.type === 'email' && !isValidEmail(field.value)) {
                    markFieldAsInvalid(field, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function markFieldAsInvalid(field, message) {
        field.classList.add('is-invalid');
        
        // Remove any existing error message
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        field.parentElement.appendChild(errorMessage);
        
        // Style the error message
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '14px';
        errorMessage.style.marginTop = '5px';
    }
    
    function clearFieldValidation(field) {
        field.classList.remove('is-invalid');
        const errorMessage = field.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function showFormSuccess(form, message) {
        // Remove form
        form.innerHTML = '';
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.textAlign = 'center';
        successMessage.style.padding = '30px';
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-check-circle';
        icon.style.fontSize = '48px';
        icon.style.color = 'var(--success-color)';
        icon.style.marginBottom = '20px';
        
        const text = document.createElement('p');
        text.textContent = message;
        text.style.fontSize = '18px';
        
        successMessage.appendChild(icon);
        successMessage.appendChild(text);
        
        form.parentElement.appendChild(successMessage);
    }
    
    // Automatic current year for copyright
    const yearElement = document.querySelector('.footer-bottom span.year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Add animation on scroll
    function revealOnScroll() {
        const elements = document.querySelectorAll('.reveal');
        for (let i = 0; i < elements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = elements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                elements[i].classList.add('active');
            }
        }
    }
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Add reveal class to elements for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });
    
    // Initialize animations
    revealOnScroll();
});

// Simple calculator for pallet storage costs
function calculateStorageCost() {
    const pallets = document.getElementById('pallets').value;
    const duration = document.getElementById('duration').value;
    const resultElement = document.getElementById('cost-estimate');
    
    if (pallets && duration) {
        // Base rate per pallet per month
        const baseRate = 12.50;
        
        // Discount for volume
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
        
        resultElement.innerHTML = `
            <h3>Kostenabschätzung</h3>
            <p>Basierend auf ${pallets} Paletten für ${duration} Monate:</p>
            <p class="estimate"><strong>${total.toFixed(2)}€</strong></p>
            <p class="note">Dies ist eine unverbindliche Kostenschätzung. Für ein genaues Angebot kontaktieren Sie uns bitte.</p>
        `;
        
        resultElement.style.display = 'block';
    }
}

// Add cost calculator event listeners if the elements exist
document.addEventListener('DOMContentLoaded', function() {
    const palletsInput = document.getElementById('pallets');
    const durationInput = document.getElementById('duration');
    const costEstimate = document.getElementById('cost-estimate');
    
    if (palletsInput && durationInput) {
        const calculateButton = document.createElement('button');
        calculateButton.type = 'button';
        calculateButton.className = 'btn btn-secondary';
        calculateButton.textContent = 'Kosten berechnen';
        calculateButton.style.marginTop = '20px';
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'form-group full-width';
        buttonContainer.appendChild(calculateButton);
        
        // Add the button after the duration input
        durationInput.parentElement.after(buttonContainer);
        
        // Create the cost estimate element if it doesn't exist
        if (!costEstimate) {
            const costEstimateElement = document.createElement('div');
            costEstimateElement.id = 'cost-estimate';
            costEstimateElement.style.display = 'none';
            costEstimateElement.style.marginTop = '30px';
            costEstimateElement.style.padding = '20px';
            costEstimateElement.style.backgroundColor = '#f5f5f5';
            costEstimateElement.style.borderRadius = '5px';
            costEstimateElement.style.textAlign = 'center';
            
            // Add the cost estimate element after the button
            buttonContainer.after(costEstimateElement);
        }
        
        // Add event listener to calculate button
        calculateButton.addEventListener('click', calculateStorageCost);
    }
});
