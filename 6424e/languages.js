document.addEventListener('DOMContentLoaded', function() {
    // Load saved languages from localStorage
    loadLanguages();
    
    // Set up form submission
    document.getElementById('languagesForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveLanguages();
        alert('Languages saved successfully!');
    });
    
    // Add language button
    document.getElementById('addLanguageBtn').addEventListener('click', addLanguageField);
    
    // Add initial language if none exist
    if (document.querySelectorAll('.language-item').length === 0) {
        addLanguageField();
    }
});

function addLanguageField(language = '', proficiency = 'Fluent') {
    const container = document.getElementById('languagesContainer');
    const id = Date.now(); // Unique ID for each language field
    
    const languageItem = document.createElement('div');
    languageItem.className = 'language-item';
    languageItem.dataset.id = id;
    
    languageItem.innerHTML = `
    <input type="text" class="language-input" placeholder="Language (e.g., English)" 
           value="${language}" required maxlength="30">
    <select class="proficiency-select">
        <option value="Basics" ${proficiency === 'Basics' ? 'selected' : ''}>Basics</option>
        <option value="Intermediate" ${proficiency === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
        <option value="Fluent" ${proficiency === 'Fluent' ? 'selected' : ''}>Fluent</option>
        <option value="Native" ${proficiency === 'Native' ? 'selected' : ''}>Native</option>
    </select>
    <button type="button" class="remove-btn" aria-label="Remove language">×</button>
    <span class="error-message" style="display:none;"></span>
`;
    
    container.appendChild(languageItem);
    
    // Add event listener for the remove button
    languageItem.querySelector('.remove-btn').addEventListener('click', function() {
        container.removeChild(languageItem);
        // Don't allow removing the last item
        if (document.querySelectorAll('.language-item').length === 0) {
            addLanguageField();
        }
    });
    
    // Add validation for the language input
    languageItem.querySelector('.language-input').addEventListener('input', function() {
        validateLanguageInput(this);
    });
}

function validateLanguageInput(inputElement) {
    const errorElement = inputElement.parentElement.querySelector('.error-message');
    
    if (!inputElement.value.trim()) {
        inputElement.classList.add('invalid');
        errorElement.textContent = 'Language is required';
        errorElement.style.display = 'inline';
        return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(inputElement.value.trim())) {
        inputElement.classList.add('invalid');
        errorElement.textContent = 'Only letters and spaces allowed';
        errorElement.style.display = 'inline';
        return false;
    }
    
    inputElement.classList.remove('invalid');
    errorElement.style.display = 'none';
    return true;
}

function validateAllLanguages() {
    let isValid = true;
    const languageInputs = document.querySelectorAll('.language-input');
    
    languageInputs.forEach(input => {
        if (!validateLanguageInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function saveLanguages() {
    if (!validateAllLanguages()) {
        alert('Please fix the errors before saving.');
        return;
    }
    
    const languages = [];
    const languageItems = document.querySelectorAll('.language-item');
    
    languageItems.forEach(item => {
        const language = item.querySelector('.language-input').value.trim();
        const proficiency = item.querySelector('.proficiency-select').value;
        
        if (language) {
            languages.push({
                language: language,
                proficiency: proficiency
            });
        }
    });
    
    localStorage.setItem('languagesData', JSON.stringify(languages));
}

function loadLanguages() {
    const savedData = localStorage.getItem('languagesData');
    
    if (savedData) {
        const languages = JSON.parse(savedData);
        
        // Clear existing fields (except the default one if empty)
        const container = document.getElementById('languagesContainer');
        container.innerHTML = '';
        
        // Add saved languages
        if (languages.length > 0) {
            languages.forEach(lang => {
                addLanguageField(lang.language, lang.proficiency);
            });
        } else {
            addLanguageField(); // Add default empty field if no saved data
        }
    } else {
        // Initialize with default languages if no saved data exists
        const defaultLanguages = [
            { language: 'English', proficiency: 'Fluent' },
            { language: 'French', proficiency: 'Fluent' },
            { language: 'German', proficiency: 'Basics' },
            { language: 'Spanish', proficiency: 'Intermediate' }
        ];
        
        defaultLanguages.forEach(lang => {
            addLanguageField(lang.language, lang.proficiency);
        });
    }
}