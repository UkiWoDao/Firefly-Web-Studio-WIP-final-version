// TODO: make js keep track of section in view to update active li
// FIXME: overlay event flicker animation
// TODO: use scrollIntoView() for accessing section from active overlay
// TODO: hide navDOM when overlay is active
// TODO: snazzy animation when deactivating overlay
// TODO: socDOM, contactDOM, navDOm become sticky right before entering footer section

/********** SCROLL TO TOP ON REFRESH PAGE **************/
$(document).ready(function(){
    $(this).scrollTop(0);
 });

/*********** SCROLL EVENTS **********/
document.addEventListener('scroll', () => {
    changeHamburger();
    changeNav();
    changeSoc();
    changeContact();
 });

/************* CONTACT ICONS ****************/
var changeSoc = function() {
    var typoSectionTop = document.querySelector('.typography').getBoundingClientRect().top;
    var socDOM = document.querySelectorAll('.icons i');
        // if (activeNavDOM == false) {
            for (var i = 0; i < socDOM.length; i++) {
                if (socDOM[i].getBoundingClientRect().bottom > typoSectionTop) {
                    socDOM[i].style.color = 'black';
                } else {
                    socDOM[i].style.color = 'var(--turquoise)';
                }
            }
  };

/************** MENU ICON *****************/
var changeHamburger = function() {
  var hamburgerHeight = window.innerHeight - 32; // height of the viewport (= 1 section) - position top of hamburger
  var hamburgerDOM = document.querySelectorAll('.hamburger div');
      for (var i = 0; i < hamburgerDOM.length; i++) {
          if (document.body.scrollTop || document.documentElement.scrollTop > hamburgerHeight) {
              hamburgerDOM[i].style.backgroundColor = 'var(--deep-sea)';
          } else {
              hamburgerDOM[i].style.backgroundColor = 'var(--turquoise)';
          }
      }
  };


/***************** SIDEBAR LIST ITEMS ***********************/
// var typoSection = document.querySelector('.typography');
var navDOM = document.querySelectorAll('.sidebar li');

 $(navDOM).click(function() {
    $(navDOM).removeClass('active-2');
    $(navDOM).removeClass('active-1');
    $(this).filter($(navDOM[0])).toggleClass('active-1');
    $(this).not(navDOM[0]).toggleClass('active-2');
 });

var changeNav = function() {
    var typoSectionTop = document.querySelector('.typography').getBoundingClientRect().top;
        for (var i = 0; i < navDOM.length; i++) {
            if (navDOM[i].getBoundingClientRect().bottom > typoSectionTop) {
                navDOM[i].classList.replace('inactive-1', 'inactive-2');
            } else {
                navDOM[i].classList.replace('inactive-2', 'inactive-1');
            }
        }
  };

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
    // var overlayListItems = document.querySelectorAll('.nav-inner-wrapper a li');
    // let activeOverlay = false;
    overlayDOM.style.marginLeft = '0';
    navWrapDOM.style.right = '0';
    // $(overlayListItems).addClass('animate');
    disable_scroll();
    overlayDOM.addEventListener('click', function() {
        overlayDOM.style.marginLeft = '100vw';
        navWrapDOM.style.right = '-30%';
        // $(overlayListItems).removeClass('animate');
        // let activeOverlay = true;
        enable_scroll();
    })
 });

// var winH = window.innerHeight;
// document.documentElement.clientHeight
// document.body.clientHeight;
