// Close W-box

$(document).ready(function(){
  $('.box-close').click(function(){
      $(this).parent().parent().fadeOut(100);
  });
  $('.btn-full').click(function(){
    $(this).parent().parent().toggleClass('fullscreen');
    $(this).parent().parent().css({"top": "0", "left": "0"});

});
});

function openBox(boxId) {
    $('#' + boxId).fadeIn(100);
}


// Component

var extension = ".html";

DomReady(() => {
        const aboutMe = new newComponent('../partials/about' + extension, 'aboutBox');
        const contact = new newComponent('../partials/contacts' + extension, 'contactBox');
        const work = new newComponent('../partials/works' + extension, 'workBox');
});

// Z-indexes

const windowBox = document.querySelectorAll(".window-box");

$().ready(function(){
    let z = 0;
    $(windowBox).on('mousedown',function(){
        z++;
        $(this).css("z-index", 9999 + z)
    });
});

