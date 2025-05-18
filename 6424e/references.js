// Store reference information as constants
const REFERENCES_DATA = [
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

// Initialize references when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadReferences();
});

// Load references data into HTML
function loadReferences() {
    const referenceContent = document.getElementById('referenceContent');
    referenceContent.innerHTML = '';
    
    REFERENCES_DATA.forEach((reference, index) => {
        const refDiv = document.createElement('div');
        refDiv.className = 'reference-item';
        refDiv.id = `reference_${index}`;
        refDiv.innerHTML = `
            <h3 class="section-name">${reference.name}</h3>
            <h3 class="section-jtitle">${reference.title}</h3>
            <p class="section-text">Phone: ${reference.phone}</p>
            <p class="section-text">Email: ${reference.email}</p>
        `;
        referenceContent.appendChild(refDiv);
    });
}

// Toggle references visibility
function toggleRefDropdown() {
    const content = document.getElementById('referenceContent');
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
}

// Enable editing of references
function enableRefEditing() {
    const referenceContent = document.getElementById('referenceContent');
    referenceContent.innerHTML = '';
    
    REFERENCES_DATA.forEach((reference, index) => {
        const refDiv = document.createElement('div');
        refDiv.className = 'reference-item';
        refDiv.innerHTML = `
            <input type="text" class="edit-input" value="${reference.name}" id="refName_${index}">
            <input type="text" class="edit-input" value="${reference.title}" id="refTitle_${index}">
            <input type="text" class="edit-input" value="${reference.phone}" id="refPhone_${index}">
            <input type="text" class="edit-input" value="${reference.email}" id="refEmail_${index}">
            <div class="reference-actions">
                <button onclick="saveReference(${index})">Save</button>
                <button onclick="deleteReference(${index})">Delete</button>
            </div>
        `;
        referenceContent.appendChild(refDiv);
    });
}

// Save edited reference
function saveReference(index) {
    REFERENCES_DATA[index] = {
        name: document.getElementById(`refName_${index}`).value,
        title: document.getElementById(`refTitle_${index}`).value,
        phone: document.getElementById(`refPhone_${index}`).value,
        email: document.getElementById(`refEmail_${index}`).value
    };
    
    loadReferences();
}

// Delete a reference
function deleteReference(index) {
    REFERENCES_DATA.splice(index, 1);
    loadReferences();
}

// Add new reference
function addNewReference() {
    const referenceContent = document.getElementById('referenceContent');
    
    const newRefDiv = document.createElement('div');
    newRefDiv.className = 'reference-item';
    newRefDiv.innerHTML = `
        <h3>Add New Reference</h3>
        <input type="text" class="edit-input" placeholder="Full Name" id="newRefName">
        <input type="text" class="edit-input" placeholder="Job Title / Company" id="newRefTitle">
        <input type="text" class="edit-input" placeholder="Phone" id="newRefPhone">
        <input type="text" class="edit-input" placeholder="Email" id="newRefEmail">
        <div class="reference-actions">
            <button onclick="saveNewReference()">Add Reference</button>
            <button onclick="loadReferences()">Cancel</button>
        </div>
    `;
    
    referenceContent.appendChild(newRefDiv);
}

// Save the new reference
function saveNewReference() {
    const newRef = {
        name: document.getElementById('newRefName').value,
        title: document.getElementById('newRefTitle').value,
        phone: document.getElementById('newRefPhone').value,
        email: document.getElementById('newRefEmail').value
    };
    
    if (newRef.name.trim() !== '') {
        REFERENCES_DATA.push(newRef);
        loadReferences();
    }
}