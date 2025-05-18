var skills_options = document.getElementById('skills_options');
var addmore_fields = document.getElementById('addmore_fields');
var removefields = document.getElementById('removefields');

addmore_fields.onclick = function(){
    var new_Field = document.createElement('input');
    new_Field.setAttribute('type','text');
    new_Field.setAttribute('placeholder','Another Field');
    skills_options.appendChild(new_Field);
}

removefields.onclick = function(){
    var inputtags = skills_options.getElementsByTagName('input');
    if(inputtags.length > 1) {
        skills_options.removeChild(inputtags[(inputtags.length) - 1]);
    }
}