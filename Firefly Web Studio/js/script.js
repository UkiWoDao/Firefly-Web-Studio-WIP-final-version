// sidebar menja boju po sekcijama
// dodati active klasu za nav active
// contact i soc icons menjaju boju po sekcijama

// // make hamburger change color on scroll
// // if (scroll  > innerHeight) {
//     hamburgerDOM.classList.remove('defaultColor');
//     hamburgerDOM.classList.add('secondaryColor');
// }

var hamburgerDOM = document.querySelectorAll('.hamburger div');
var navDOM = document.querySelectorAll('.sidebar li');
var socDOM = document.querySelectorAll('.icons i');
var contDOM = document.getElementById('rotated-contact');
var winH = window.innerHeight / 2;

function changeHamburger() {
  if (document.body.scrollTop || document.documentElement.scrollTop > winH) {
      for (var i = 0; i < hamburgerDOM.length; i++) {
          hamburgerDOM[i].style.backgroundColor = 'var(--deep-sea)';
      }
  }
  if (document.body.scrollTop || document.documentElement.scrollTop < winH) {
      for (var i = 0; i < hamburgerDOM.length; i++) {
          hamburgerDOM[i].style.backgroundColor = 'var(--turquoise)';
      }
  }
};

function changeNav() {
  if (document.body.scrollTop || document.documentElement.scrollTop > winH) {
      for (var i = 0; i < navDOM.length; i++) {
          navDOM[i].style.backgroundColor = 'var(--deep-sea)';
      }
  }
  if (document.body.scrollTop || document.documentElement.scrollTop < winH) {
      for (var i = 0; i < navDOM.length; i++) {
          navDOM[i].style.backgroundColor = 'var(--turquoise)';
      }
  }
};

function changeSoc() {
  if (document.body.scrollTop || document.documentElement.scrollTop > winH) {
      for (var i = 0; i < socDOM.length; i++) {
          socDOM[i].style.color = 'black';
      }
  }
  if (document.body.scrollTop || document.documentElement.scrollTop < winH) {
      for (var i = 0; i < socDOM.length; i++) {
          socDOM[i].style.color = 'var(--turquoise)';
      }
  }
};

function changeContact() {
  if (document.body.scrollTop || document.documentElement.scrollTop > winH) {
         contDOM.style.color = 'black';
  }
  if (document.body.scrollTop || document.documentElement.scrollTop < winH) {
        contDOM.style.color = 'var(--turquoise)';
  }
};

document.addEventListener('scroll', () => {
    changeHamburger();
    changeNav();
    changeSoc();
    changeContact();
});

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
