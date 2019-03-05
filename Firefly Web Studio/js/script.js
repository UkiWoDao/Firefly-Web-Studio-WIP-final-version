// TODO: make list items colors change sequentially on scroll
// TODO: stop js from overwriting active class colors on scroll
// TODO: make js keep track of section to update active li
// FIXME: aside soc artefact in overlay event
// IDEA: put pulsing yellow blur that imitates mix blend mode on firefly header

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

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
      }
  window.onmousewheel = document.onmousewheel = wheel;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}

document.querySelector('.hamburger').addEventListener('click', function() {
    var overlayDOM = document.querySelector('.overlay');
    var navWrapDOM = document.querySelector('.nav-wrapper');
    overlayDOM.style.marginLeft = '0';
    navWrapDOM.style.right = '0';
    disable_scroll();
    overlayDOM.addEventListener('click', function() {
        overlayDOM.style.marginLeft = '160vw';
        navWrapDOM.style.right = '-60vw';
        enable_scroll();
    })
});

$(document).ready(function(){
  $(navDOM).click(function(){
    $(navDOM).removeClass('active-1'); //ensure there will be only one with the class 'active'
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
