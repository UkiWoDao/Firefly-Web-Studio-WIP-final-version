// IDEA: use scrollIntoView() for accessing section from active overlay
// IDEA: blur when overlay is active
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
    changeInactiveNav();
    changeActiveNav();
    changeSoc();
    changeContact();
});


/************* CONTACT ICONS ****************/
var changeSoc = function() {
    var typoSectionTop = document.querySelector('.typography').getBoundingClientRect().top;
    var socDOM = document.querySelectorAll('.icons i');
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
    var hamburgerDOM = document.getElementById('hamburger-svg');
        if (document.body.scrollTop || document.documentElement.scrollTop > hamburgerHeight) {
            hamburgerDOM.style.fill = 'var(--deep-sea)';
        } else {
            hamburgerDOM.style.fill = 'var(--turquoise)';
        }
};


/***************** SIDEBAR LIST ITEMS ***********************/
var navDOM = document.querySelectorAll('.sidebar li');

// navDOM.addEventListener('click', function () {
//     navDOM.classList.remove('active-1', 'active-2');
//
// })

// use vanilla
 $(navDOM).click(function() {
    $(navDOM).removeClass('active-2');
    $(navDOM).removeClass('active-1');
    $(this).filter($(navDOM[0])).toggleClass('active-1');
    $(this).not(navDOM[0]).toggleClass('active-2');
});

var changeInactiveNav = function() {
    var typoSectionTop = document.querySelector('.typography').getBoundingClientRect().top;
    for (var i = 0; i < navDOM.length; i++) {
        if (navDOM[i].getBoundingClientRect().bottom > typoSectionTop && !navDOM[i].classList.contains('active-1', 'active-2')) {
            navDOM[i].classList.replace('inactive-1', 'inactive-2');
        } else if (navDOM[i].getBoundingClientRect().bottom < typoSectionTop && !navDOM[i].classList.contains('active-1', 'active-2')){
            navDOM[i].classList.replace('inactive-2', 'inactive-1');
        }
    }
};

var changeActiveNav = function() {
    var fullHeight = document.getElementById('landing').clientHeight; // a section height
    var y = window.pageYOffset;
    if (y < fullHeight * 0.5) {
        $(navDOM[0]).addClass('active-1');
        $(navDOM[1]).removeClass('active-2');
    } else if (y >= fullHeight * 0.5 && y < fullHeight * 1.5) {
        $(navDOM[0]).removeClass('active-1')
        $(navDOM[1]).addClass('active-2');
        $(navDOM[2]).removeClass('active-2');
    } else if (y >= fullHeight * 1.5 && y < fullHeight * 2.5) {
        $(navDOM[1]).removeClass('active-2');
        $(navDOM[2]).addClass('active-2');
        $(navDOM[3]).removeClass('active-2');
    } else if (y >= fullHeight * 2.5 && y < fullHeight * 3.2) {
        $(navDOM[2]).removeClass('active-2');
        $(navDOM[3]).addClass('active-2');
        $(navDOM[4]).removeClass('active-2');
    } else if (y >= fullHeight * 3.2) {
        $(navDOM[3]).removeClass('active-2');
        $(navDOM[4]).addClass('active-2');
    }
}


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


/**************** ACTIVATING OVERLAY *********************/

document.getElementById('hamburger-svg').addEventListener('click', function() {
    var overlayDOM = document.querySelector('.overlay');
    var navWrapDOM = document.querySelector('.nav-wrapper');
    // var overlayListItems = document.querySelectorAll('.nav-inner-wrapper a li');
    // let activeOverlay = false;
    overlayDOM.classList.add('overlay-active');
    navWrapDOM.classList.add('nav-wrapper-active');
    // $(overlayListItems).addClass('animate');
    disable_scroll();
    overlayDOM.addEventListener('click', function() {
        overlayDOM.classList.remove('overlay-active');
        navWrapDOM.classList.remove('nav-wrapper-active');
        // $(overlayListItems).removeClass('animate');
        // let activeOverlay = true;
        enable_scroll();
    })
});


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



// var winH = window.innerHeight;
// document.documentElement.clientHeight
// document.body.clientHeight;
