function toggleDropdown() {
    var content = document.getElementById("profileContent");
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

// Store profile information as constants
const PROFILE_DATA = {
    title: "PROFILE",
    content: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ]
};

// Initialize the profile when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
});

// Load profile data into HTML
function loadProfile() {
    const profileContent = document.getElementById('profileContent');
    profileContent.innerHTML = '';
    
    PROFILE_DATA.content.forEach((paragraph, index) => {
        const p = document.createElement('p');
        p.className = 'section-text';
        p.textContent = paragraph;
        p.id = `profileParagraph_${index}`;
        profileContent.appendChild(p);
    });
}

// Toggle dropdown visibility
function toggleDropdown() {
    const content = document.getElementById('profileContent');
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
}

// Enable editing of profile content
function enableEditing() {
    const profileContent = document.getElementById('profileContent');
    const paragraphs = profileContent.getElementsByClassName('section-text');
    
    for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];
        const currentText = paragraph.textContent;
        
        paragraph.innerHTML = `
            <textarea class="edit-textarea" id="edit_${i}">${currentText}</textarea>
            <button onclick="saveEdit(${i})">Save</button>
            <button onclick="deleteParagraph(${i})">Delete</button>
        `;
    }
}

// Save edited content
function saveEdit(index) {
    const textarea = document.querySelector(`#edit_${index}`);
    const newText = textarea.value;
    
    // Update the constant data
    PROFILE_DATA.content[index] = newText;
    
    // Reload the profile to show the updated content
    loadProfile();
}

// Delete a paragraph
function deleteParagraph(index) {
    // Remove the paragraph from the constant data
    PROFILE_DATA.content.splice(index, 1);
    
    // Reload the profile
    loadProfile();
}

// Add new content to the profile
function addNewContent() {
    const profileContent = document.getElementById('profileContent');
    
    // Create a new editing interface for new content
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
        <textarea class="edit-textarea" id="new_content"></textarea>
        <button onclick="saveNewContent()">Add</button>
    `;
    
    profileContent.appendChild(newDiv);
}

// Save the new content
function saveNewContent() {
    const textarea = document.getElementById('new_content');
    const newText = textarea.value;
    
    if (newText.trim() !== '') {
        // Add new content to the constant data
        PROFILE_DATA.content.push(newText);
        
        // Reload the profile
        loadProfile();
    }
}