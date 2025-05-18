var education_options = document.getElementById('education_options');
var add_morefields = document.getElementById('add_morefields');
var remove__fields = document.getElementById('remove__fields');

add_morefields.onclick = function(){
    var new__Field = document.createElement('input');
    new__Field.setAttribute('type','dum');
    new__Field.setAttribute('placeholder','Another Field');
    education_options.appendChild(new__Field);
}

remove__fields.onclick = function(){
    var input__tags = education_options.getElementsByTagName('input');
    if(input__tags.length > 1) {
        education_options.removeChild(input__tags[(input__tags.length) - 1]);
    }
}