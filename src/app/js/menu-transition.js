$(document).ready(function(){
    var isChecked = false;
    var navIcon = $('#nav-icon');

    navIcon.click(function(){

        setTimeout(toggleVisualButton, 180);
        isChecked = !isChecked;
        document.getElementById("nav-trigger").checked = isChecked;
    });

    function toggleVisualButton() {

        navIcon.toggleClass('open');
    }


    $('.navigation a').bind('click', function () {
        navIcon.click()
    })

    $('#backdrop').bind('click', function () {
        navIcon.click()
    })
});