document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('resetAllBtn').addEventListener('click', resetAllData);
});

function resetAllData() {
    if (confirm('Are you sure you want to reset all information? This cannot be undone.')) {
        // Clear all localStorage data
        localStorage.clear();
        
        // Reset contact form
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
        document.getElementById('address').value = '';
        document.getElementById('website').value = '';
        
        // Reset education fields
        const surveyOptions = document.getElementById('survey_options');
        surveyOptions.innerHTML = '<input type="text" name="survey_options[]" class="survey_option" size="50" placeholder="Another Field">';
        
        // Reset skills fields
        const skillsOptions = document.getElementById('skills_options');
        skillsOptions.innerHTML = '<input type="text" name="skills_options[]" class="skills_option" size="50" placeholder="Another Field">';
        
        // Reset work experience fields
        const educationOptions = document.getElementById('education_options');
        educationOptions.innerHTML = '<input type="dum" name="education_options[]" class="education_option" size="50" placeholder="Another Field">';
        
        // Reset languages
        const languagesContainer = document.getElementById('languagesContainer');
        languagesContainer.innerHTML = '';
        
        // Add default languages
        const defaultLanguages = [
            { language: 'English', proficiency: 'Fluent' },
            { language: 'French', proficiency: 'Fluent' },
            { language: 'German', proficiency: 'Basics' },
            { language: 'Spanish', proficiency: 'Intermediate' }
        ];
        
        defaultLanguages.forEach(lang => {
            addLanguageField(lang.language, lang.proficiency);
        });
        
        // Reset profile
        PROFILE_DATA.content = [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        ];
        loadProfile();
        
        // Reset references
        REFERENCES_DATA = [
            {
                name: "Estelle Darcy",
                title: "Wardiere Inc. / CTO",
                phone: "123-456-7890",
                email: "hello@reallygreatsite.com"
            },
            {
                name: "Harper Richard",
                title: "Wardiere Inc. / CEO",
                phone: "123-456-7890",
                email: "hello@reallygreatsite.com"
            }
        ];
        loadReferences();
        
        alert('All information has been reset to default values.');
    }
}