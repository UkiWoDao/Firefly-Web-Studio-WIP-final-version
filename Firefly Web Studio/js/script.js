function changeHamburger() {
  var hamburgerDOM = document.querySelectorAll('.hamburger div');
  var fullHeight = window.innerHeight;
  if (document.body.scrollTop || document.documentElement.scrollTop > fullHeight) {
      for (var i = 0; i < hamburgerDOM.length; i++) {
          hamburgerDOM[i].style.backgroundColor = 'var(--deep-sea)';
      }
  }
  if (document.body.scrollTop || document.documentElement.scrollTop < fullHeight) {
      for (var i = 0; i < hamburgerDOM.length; i++) {
          hamburgerDOM[i].style.backgroundColor = 'var(--turquoise)';
      }
  }
};

// try make list items change sequentially on scroll
// stop js from overwriting active class colors on scroll
var navDOM = document.querySelectorAll('.sidebar li');
function changeNav() {
  var halfHeight = window.innerHeight / 2;
  if (document.body.scrollTop || document.documentElement.scrollTop > halfHeight) {
      for (var i = 0; i < navDOM.length; i++) {
          if (navDOM[i].style.backgroundColor = 'var(--turquoise)') {
              navDOM[i].style.backgroundColor = 'var(--deep-sea)';
          }
      }
  }
  if (document.body.scrollTop || document.documentElement.scrollTop < halfHeight) {
      for (var i = 0; i < navDOM.length; i++) {
          navDOM[i].style.backgroundColor = 'var(--turquoise)';
      }
  }
};

function changeSoc() {
  var socDOM = document.querySelectorAll('.icons i');
  var smallHeight = window.innerHeight / 10;
  if (document.body.scrollTop || document.documentElement.scrollTop > smallHeight) {
      for (var i = 0; i < socDOM.length; i++) {
          socDOM[i].style.color = 'black';
      }
  }
  if (document.body.scrollTop || document.documentElement.scrollTop < smallHeight) {
      for (var i = 0; i < socDOM.length; i++) {
          socDOM[i].style.color = 'var(--turquoise)';
      }
  }
};

function changeContact() {
  var contDOM = document.getElementById('rotated-contact');
  var halfHeight = window.innerHeight / 2;
  if (document.body.scrollTop || document.documentElement.scrollTop > halfHeight) {
         contDOM.style.color = 'black';
  }
  if (document.body.scrollTop || document.documentElement.scrollTop < halfHeight) {
        contDOM.style.color = 'var(--turquoise)';
  }
};

document.addEventListener('scroll', () => {
    changeHamburger();
    changeNav();
    changeSoc();
    changeContact();
});

$(document).ready(function(){
  $(navDOM).click(function(){
    $(navDOM).removeClass('active-1'); //to make sure there will be only one with the class 'active'
    $(this).removeClass('inactive-1');
    $(this).addClass('active-1');
  });
})


// document.addEventListener('DOMContentLoaded', function() {
//     document.addEventListener('scroll', function() {
//         // if scrolled height > viewport height, change color of element
//         if (document.body.scrollTop || document.documentElement.scrollTop > winH) {
//             for (var i = 0; i < hamburgerDOM.length; i++) {
//                 hamburgerDOM[i].style.backgroundColor = 'var(--deep-sea)';
//             }
//         }
//         if (document.body.scrollTop || document.documentElement.scrollTop < winH) {
//             for (var i = 0; i < hamburgerDOM.length; i++) {
//                 hamburgerDOM[i].style.backgroundColor = 'var(--turquoise)';
//             }
//         }
//     })
// });

// var winH = window.innerHeight;
// document.documentElement.clientHeight
// document.body.clientHeight;
