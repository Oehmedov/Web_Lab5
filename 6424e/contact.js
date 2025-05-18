document.addEventListener('DOMContentLoaded', function() {
    // Load saved data from localStorage
    loadContactData();
    
    // Set up form validation
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            saveContactData();
            alert('Contact information saved successfully!');
        }
    });
    
    // Add input event listeners for real-time validation
    document.getElementById('phone').addEventListener('input', validatePhone);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('address').addEventListener('input', validateAddress);
    document.getElementById('website').addEventListener('input', validateWebsite);
});

function validateForm() {
    const isPhoneValid = validatePhone();
    const isEmailValid = validateEmail();
    const isAddressValid = validateAddress();
    const isWebsiteValid = validateWebsite();
    
    return isPhoneValid && isEmailValid && isAddressValid && isWebsiteValid;
}

function validatePhone() {
    const phoneInput = document.getElementById('phone');
    const errorElement = document.getElementById('phone-error');
    const phoneRegex = /^[\d\s+-]+$/;
    
    if (!phoneInput.value.trim()) {
        showError(phoneInput, errorElement, 'Phone number is required');
        return false;
    }
    
    if (!phoneRegex.test(phoneInput.value)) {
        showError(phoneInput, errorElement, 'Only numbers, +, - and spaces allowed');
        return false;
    }
    
    if (phoneInput.value.length < 7) {
        showError(phoneInput, errorElement, 'Phone number is too short');
        return false;
    }
    
    hideError(phoneInput, errorElement);
    return true;
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const errorElement = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailInput.value.trim()) {
        showError(emailInput, errorElement, 'Email is required');
        return false;
    }
    
    if (!emailRegex.test(emailInput.value)) {
        showError(emailInput, errorElement, 'Please enter a valid email');
        return false;
    }
    
    hideError(emailInput, errorElement);
    return true;
}

function validateAddress() {
    const addressInput = document.getElementById('address');
    const errorElement = document.getElementById('address-error');
    
    if (!addressInput.value.trim()) {
        showError(addressInput, errorElement, 'Address is required');
        return false;
    }
    
    hideError(addressInput, errorElement);
    return true;
}

function validateWebsite() {
    const websiteInput = document.getElementById('website');
    const errorElement = document.getElementById('website-error');
    
    // Website is optional, but if provided, validate it
    if (websiteInput.value.trim() && !isValidUrl(websiteInput.value)) {
        showError(websiteInput, errorElement, 'Please enter a valid URL (include http:// or https://)');
        return false;
    }
    
    hideError(websiteInput, errorElement);
    return true;
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function showError(inputElement, errorElement, message) {
    inputElement.classList.add('invalid');
    errorElement.textContent = message;
    errorElement.style.display = 'inline';
}

function hideError(inputElement, errorElement) {
    inputElement.classList.remove('invalid');
    errorElement.style.display = 'none';
}

function saveContactData() {
    const contactData = {
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        website: document.getElementById('website').value
    };
    
    localStorage.setItem('contactData', JSON.stringify(contactData));
}

function loadContactData() {
    const savedData = localStorage.getItem('contactData');
    if (savedData) {
        const contactData = JSON.parse(savedData);
        document.getElementById('phone').value = contactData.phone || '';
        document.getElementById('email').value = contactData.email || '';
        document.getElementById('address').value = contactData.address || '';
        document.getElementById('website').value = contactData.website || '';
    }
}