// TODO: stop js from overwriting active class colors on scroll
// TODO: make js keep track of section in view to update active li
// FIXME: overlay event flicker animation
// TODO: use scrollIntoView() for accessing section from active overlay
// TODO: hide navDOM when overlay is active

/*********** SCROLL EVENTS **********/
document.addEventListener('scroll', () => {
    changeHamburger();
    changeNav();
    changeSoc();
    changeContact();
});

// za active nav na skrol heightu promeniti css naziv klase

/************* CONTACT ICONS ****************/
var changeSoc = function() {
  var socDOM = document.querySelectorAll('.icons i');
      for (var i = 0; i < socDOM.length; i++) {
          if (socDOM[i].getBoundingClientRect().bottom > typoSection.getBoundingClientRect().top) {
              socDOM[i].style.color = 'black';
          } else {
              socDOM[i].style.color = 'var(--turquoise)';
          }
      }
};

/************** MENU ICON *****************/
var changeHamburger = function() {
  var hamburgerDOM = document.querySelectorAll('.hamburger div');
  if (document.body.scrollTop || document.documentElement.scrollTop > window.innerHeight) {
      for (var i = 0; i < hamburgerDOM.length; i++) {
          hamburgerDOM[i].style.backgroundColor = 'var(--deep-sea)';
      }
  }
  if (document.body.scrollTop || document.documentElement.scrollTop < window.innerHeight) {
      for (var i = 0; i < hamburgerDOM.length; i++) {
          hamburgerDOM[i].style.backgroundColor = 'var(--turquoise)';
       }
    }
};

/***************** SIDEBAR LIST ITEMS ***********************/
var typoSection = document.querySelector('.typography');
var navDOM = document.querySelectorAll('.sidebar li');
var changeNav = function() {
  for (var i = 0; i < navDOM.length; i++) // go through all list items
      // each list item that trespasses into the next section gets changed
      if (navDOM[i].getBoundingClientRect().bottom > typoSection.getBoundingClientRect().top) {
          navDOM[i].style.backgroundColor = 'var(--deep-sea)';
        } else {
          navDOM[i].style.backgroundColor = 'var(--turquoise)';
        }
}

$(document).ready(function(){
  $(navDOM).click(function(){
    $(navDOM).removeClass('active-1'); //ensure there will be only one with the class 'active'
    $(this).removeClass('inactive-1');
    $(this).addClass('active-1');
  });
})

/*************** ASIDE CONTACT ********************/
var changeContact = function() {
  var contDOM = document.getElementById('rotated-contact');
  var halfHeight = window.innerHeight / 2;
      if (document.body.scrollTop || document.documentElement.scrollTop > halfHeight) {
             contDOM.style.color = 'black';
      }
      if (document.body.scrollTop || document.documentElement.scrollTop < halfHeight) {
            contDOM.style.color = 'var(--turquoise)';
      }
};

/************* PREVENT SCROLL WHEN NAV IS ACTIVE ******************/
function wheel(e) {
  preventDefault(e);
}

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
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
        overlayDOM.style.marginLeft = '100vw';
        navWrapDOM.style.right = '-30%';
        enable_scroll();
    })
});

// var winH = window.innerHeight;
// document.documentElement.clientHeight
// document.body.clientHeight;
