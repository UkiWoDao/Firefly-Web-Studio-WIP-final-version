// IDEA: use scrollIntoView() for accessing section from active overlay
// TODO: hide navDOM when overlay is active
// TODO: socDOM, contactDOM, navDOm become sticky right before entering footer section
// IDEA: when overlay active play with delay, scale and blur px to make achieve perspective
// FIX: panel width on window resize

// init page functionality on dom load
window.addEventListener('DOMContentLoaded', () => {
    // add scroll events
    document.addEventListener('scroll', () => {
        scrollEvents();
    });
    runDrag();
})

// scroll related functionality
var scrollEvents = () => {
    changeHamburger();
    changeInactiveNav();
    changeActiveNav();
    changeSoc();
    changeContact();
}

// scroll to top on refresh
window.onbeforeunload = () => {
    window.scrollTo(0, 0);
}

// encapsulate DOM data
var DOM = (() => {
    // grab DOM elements
    var domElems = {
        container: document.querySelector('.landing'),
        left : document.querySelector('.left'),
        right : document.querySelector('.right'),
        arrows : document.querySelector('#arrows'),
        handle : document.querySelector('.handle')
    };
    return {
        // dom elements getter
        getDOMelems: function(){
            return domElems;
        }
    }
})();

// dynamic split screen related code
var runDrag = () => {
    var dragActive = false, currentX, initialX, xOffset = 0;

    // get target element
    var elems = DOM.getDOMelems();
    var target = elems.container;

    target.addEventListener("touchstart", dragStart, false);
    target.addEventListener("touchmove", drag, false);
    target.addEventListener("touchend", dragEnd, false);
    
    target.addEventListener("mousedown", dragStart, false);
    target.addEventListener("mousemove", drag, false);
    target.addEventListener("mouseup", dragEnd, false);

    function dragStart(e){
        if(e.type === "touchstart"){
            initialX = e.touches[0].clientX - xOffset;
        } else {
            initialX = e.clientX - xOffset;
        }
    
        if(e.target === arrows){
            dragActive = true;
        }
    }
    
    function dragEnd(e){
        initialX = currentX;
    
        dragActive = false;
    }
    
    function drag(e){
        if(dragActive){
            e.preventDefault();
    
            if(e.type === 'touchmove'){
                currentX = e.touches[0].clientX - initialX;
            } else {
                currentX = e.clientX - initialX;
            }
            
            // make handle stay
            xOffset = currentX;
    
            setTranslate(currentX, elems.handle);
            resizePanels(event, elems.left, elems.right);
        }
    }
    
    function setTranslate(xPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, 0, 0)";
    }
    
    function resizePanels(event, left, right) {
        var w = window.innerWidth;
        var center = w / 2;
    
        left.style.width = event.clientX + 'px';
        right.style.width = (w - event.clientX - 19) + 'px';
    
        if(event.clientX > center){
            left.style.zIndex = 2;
            right.style.zIndex = 1;
        } else {
            left.style.zIndex = 1;
            right.style.zIndex = 2;
        }
    }
};

/*********** NON-DRAG ONMOUSEMOVE HANDLE VARIANT ************/
// container.addEventListener('mousemove', function(e){
//     if(e.target === arrows){
//         handle.style.left = e.clientX + 'px';
//         left.style.width = e.clientX + 'px';
//         right.style.width = (w - e.clientX - 19) + 'px';
//         if(e.clientX > center){
//             left.style.zIndex = 2;
//             right.style.zIndex = 1;
//         } else {
//             left.style.zIndex = 1;
//             right.style.zIndex = 2;
//         }
//     }
// })

/************* CONTACT ICONS ****************/
var changeSoc = function() {
    var typoSectionTop = document.querySelector('.typography').getBoundingClientRect().top;
    var socDOM = document.querySelectorAll('.icons i');
    // social icons change color as they pass the boundary between sections
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


/****************** SIDEBAR LIST ITEMS ***********************/
var navDOM = document.querySelectorAll('.sidebar li');
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
    // make list item active when the appropriate section occupies more than half of viewport (except contact section)
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
    } else {
        $(navDOM[3]).removeClass('active-2');
        $(navDOM[4]).addClass('active-2');
    }
}


/****************** ASIDE CONTACT ********************/
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


/***************** ACTIVATING OVERLAY *********************/
document.getElementById('hamburger-svg').addEventListener('click', function() {
    var overlayDOM = document.querySelector('.overlay');
    var navWrapDOM = document.querySelector('.nav-wrapper');
    let typography = document.querySelector('.typography');
    let prototype = document.querySelector('.uiprototype');
    let branding = document.querySelector('.branding');
    let contact = document.querySelector('.contact');
    let socDOM = document.querySelector('.icons');
    let contDOM = document.getElementById('rotated-contact');
    let headerDOM = document.querySelector('.firefly-header h1');
    var blurredArrayDOM = [typography, prototype, branding, contact, contDOM, headerDOM];

    headerDOM.classList.add('translucent');
    overlayDOM.classList.add('overlay-active');
    navWrapDOM.classList.add('nav-wrapper-active');
    socDOM.classList.add('translucent');
    for (var i = 0; i < blurredArrayDOM.length; i++) {
        blurredArrayDOM[i].classList.add('blurred');
    }
    disable_scroll();
    overlayDOM.addEventListener('click', function() {
        overlayDOM.classList.remove('overlay-active');
        navWrapDOM.classList.remove('nav-wrapper-active');
        headerDOM.classList.remove('translucent');
        socDOM.classList.remove('translucent');
        for (var i = 0; i < blurredArrayDOM.length; i++) {
            blurredArrayDOM[i].classList.remove('blurred');
        }
        enable_scroll();
    })
});


/************** PREVENT SCROLL WHEN NAV IS ACTIVE ******************/
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
