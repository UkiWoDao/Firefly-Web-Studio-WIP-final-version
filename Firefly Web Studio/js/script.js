// IDEA: use scrollIntoView() for accessing section from active overlay
// TODO: hide navDOM when overlay is active
// TODO: socDOM, contactDOM, navDOm become sticky right before entering footer section
// IDEA: when overlay active play with delay, scale and blur px to make achieve perspective

// init page functionality on dom load
window.addEventListener('DOMContentLoaded', () => {
    // add scroll events
    document.addEventListener('scroll', () => {
        scrollEvents();
    });
    initDrag();
    activeOverlay();
    activeLiClick();
})

// scroll related functionality
var scrollEvents = () => {
    changeHamburger();
    inactiveLiScroll();
    activeLiScroll();
    changeSocIcons();
    changeContact();
}

// scroll to top on refresh
window.onbeforeunload = () => {
    window.scrollTo(0, 0);
}

// encapsulate DOM data
var globalVars = (() => {
    // grab DOM elements
    var domElems = {
        container: document.querySelector('.landing'),
        left : document.querySelector('.left'),
        right : document.querySelector('.right'),
        arrows : document.querySelector('#arrows'),
        handle : document.querySelector('.handle'),
        hamb: document.getElementById('hamburger-svg'),
        overlay: document.querySelector('.overlay'),
        navWrap: document.querySelector('.nav-wrapper'),
        typo: document.querySelector('.typography'),
        proto: document.querySelector('.uiprototype'),
        branding: document.querySelector('.branding'),
        contact: document.querySelector('.contact'),
        rotContact: document.getElementById('rotated-contact'),
        socIcons: document.querySelector('.icons'),
        allSocIcon: document.querySelectorAll('.icons i'),
        header: document.querySelector('.firefly-header h1'),
        allLi: document.querySelectorAll('.sidebar li')
    };
    var dragVars = {
        dragActive: false,
        currentX: 0,
        initialX: 0,
        xOffset: 0
    };
    var colors = {
        primary: 'var(--deep-sea)',
        secondary: 'var(--turquoise)',  
        ternary: 'black'
    };
    return {
        // dom elements getter
        getDOMelems: function() {
            return domElems;
        },
        // drag related variables getter
        getDragVars: function() {
            return dragVars;
        },
        // colors getter
        getColors: function() {
            return colors;
        }
    }
})();

// dynamic split screen related code
function initDrag() {
    // get drag variables
    const vars = globalVars.getDragVars();

    // create shorthands
    var dragActive = vars.dragActive;
        currentX = vars.currentX,
        initialX = vars.initialX,
        xOffset = vars.xOffset;

    // get target element
    var elems = globalVars.getDOMelems();
    var target = elems.container;

    window.addEventListener("resize", function() {
        // get DOM elements
        var elems = globalVars.getDOMelems();

        var width = window.innerWidth;
        var half = width / 2;

        // handle default position
        moveHandle(0);
        
        // panels default position
        elems.left.style.width =  elems.handle.style.left;
        elems.right.style.width = (half - 2) + 'px';

        elems.left.style.zIndex = 2;
        elems.right.style.zIndex = 1;
    });

    target.addEventListener("touchstart", dragStart, false);
    target.addEventListener("touchmove", drag, false);
    target.addEventListener("touchend", dragEnd, false);
    
    target.addEventListener("mousedown", dragStart, false);
    target.addEventListener("mousemove", drag, false);
    target.addEventListener("mouseup", dragEnd, false);

    function dragStart(e) {
        if(e.target === arrows) {
            dragActive = true;
        }
    }
      
    function drag(e) {
        var width = window.innerWidth;
        var halfW = width / 2;

        initialX = halfW;

        if(dragActive) {
            e.preventDefault();
    
            if(e.type === 'touchmove'){
                currentX = e.touches[0].clientX - initialX;
            } else {
                currentX = e.clientX - initialX;
            }
            
            xOffset = currentX;
    
            moveHandle(currentX);
            resizePanels(e, currentX);
        }
    }
   
    function dragEnd() {
        initialX = currentX;
    
        dragActive = false;   
    }

    // make handle stay after dragging
    function moveHandle(xPos) {
        elems.handle.style.transform = "translate3d(" + xPos + "px, 0, 0)";
    }
};

function resizePanels(e) {
    // get DOM elements
    var elems = globalVars.getDOMelems();

    var w = window.innerWidth;
    var center = w / 2;

    elems.left.style.width = elems.handle.style.left;
    elems.right.style.width = (w - e.clientX - 10) + 'px';
    
    // make larger section on top
    if(e.clientX > center){
        elems.left.style.zIndex = 2;
        elems.right.style.zIndex = 1;
    } else {
        elems.left.style.zIndex = 1;
        elems.right.style.zIndex = 2;
    }
}

// change contact icons according to scroll position
function changeSocIcons() {
    // grab dom elements
    var elems = globalVars.getDOMelems();
    
    // get colors
    var colors = globalVars.getColors();

    // shorthands
    var primary = colors.primary;
    var secondary = colors.secondary;

    // grab boundary between landing page and typography section
    var typoTop = elems.typo.getBoundingClientRect().top;

    // get target element
    var icons = elems.allSocIcon;

    // social icons change color as they pass the boundary
    for (var i = 0; i < icons.length; i++) {
        if (icons[i].getBoundingClientRect().bottom > typoTop) {
            icons[i].style.color = primary;
        } else {
            icons[i].style.color = secondary;
        }
    }
};


// change hamburger icon according to scroll position
function changeHamburger() {
    // grab dom elements
    var elems = globalVars.getDOMelems();

    // get colors
    var colors = globalVars.getColors();

    // shorthands
    var primary = colors.primary;
    var secondary = colors.secondary;

    // get target element
    var hamb = elems.hamb;

    // vertical scroll amount
    var y = window.pageYOffset;

    // get hamburger height
    var hambH = window.innerHeight - 32; // height of the viewport (= 1 section) - position top of hamburger

    if (y > hambH) {
        hamb.style.fill = primary;
    } else {
        hamb.style.fill = secondary;
    }
};


// manage nav list items click behavior
function activeLiClick() {
    // grab dom elements
    var elems = globalVars.getDOMelems();
    var li = elems.allLi;

    $(li).click(function() {
        $(li).removeClass('active-2');
        $(li).removeClass('active-1');
        $(this).filter($(li[0])).toggleClass('active-1');
        $(this).not(li[0]).toggleClass('active-2');
    })
}

// apply different color to nav list items depending on scroll position
function inactiveLiScroll() {
    // grab dom elements
    var elems = globalVars.getDOMelems();

    // get target element
    var typoTop = elems.typo.getBoundingClientRect().top;

    // shorthand for sidebar li
    var li = elems.allLi;

    for (var i = 0; i < li.length; i++) {
        if (li[i].getBoundingClientRect().bottom > typoTop) {
            if(!li[i].classList.contains('active-1', 'active-2')) {
                li[i].classList.replace('inactive-1', 'inactive-2')
            };
        } else if (li[i].getBoundingClientRect().bottom < typoTop) {
            if (!li[i].classList.contains('active-1', 'active-2')) {
                li[i].classList.replace('inactive-2', 'inactive-1')
            };
        }
    }
};

function activeLiScroll() {
    // grab dom elements
    var elems = globalVars.getDOMelems();

    // get height of a section (they are equal)
    var fullH = elems.container.clientHeight;

    // vertical scroll amount
    var y = window.pageYOffset;

    // shorthand for li node list
    var li = elems.allLi;

    // section boundary heights
    var h05 = fullH * 0.5,
        h15 = fullH * 1.5,
        h25 = fullH * 2.5,
        h32 = fullH * 3.2; 

    // make list item active when the appropriate section occupies more than half of viewport (except contact section)
    if (y < h05) {
        li[0].classList.add('active-1');
        li[1].classList.remove('active-2');
    } else if (y >= h05 && y < h15) {
        li[0].classList.remove('active-1')
        li[1].classList.add('active-2');
        li[2].classList.remove('active-2');
    } else if (y >= h15 && y < h25) {
        li[1].classList.remove('active-2');
        li[2].classList.add('active-2');
        li[3].classList.remove('active-2');
    } else if (y >= h25 && y < h32) {
        li[2].classList.remove('active-2');
        li[3].classList.add('active-2');
        li[4].classList.remove('active-2');
    } else {
        li[3].classList.remove('active-2');
        li[4].classList.add('active-2');
    }
}


// apply style according to scroll position to rotated contact
function changeContact() {
    // grab dom elements
    var elems = globalVars.getDOMelems();

    // get colors
    var colors = globalVars.getColors();
    var ternary = colors.ternary;
    var secondary = colors.secondary;

    // get target element color property
    var cont = elems.rotContact;
    var halfH = window.innerHeight / 2;

    // vertical scroll amount
    var y = window.pageYOffset;

    if (y > halfH) {
           cont.style.color = ternary;
    }
    if (y < halfH) {
           cont.style.color = secondary;
    }
};


// handle overlaying side menu
function activeOverlay() {
    // get dom elements
    var elems = globalVars.getDOMelems();
    var hamb = elems.hamb;

    hamb.addEventListener('click', () => {
        // get dom elements
        var elems = globalVars.getDOMelems();

        // shorthands
        var header = elems.header;
        var overlay = elems.overlay;
        var navWrap = elems.navWrap;
        var socIcons = elems.socIcons;
    
        // create array of elements that will be blurred in animation
        var blurDOMarr = [elems.typo, elems.proto, elems.branding, elems.contact, elems.rotContact, elems.header];
    
        // animation start
        header.classList.add('translucent');
        overlay.classList.add('overlay-active');
        navWrap.classList.add('nav-wrapper-active');
        socIcons.classList.add('translucent');

        for (var i = 0; i < blurDOMarr.length; i++) {
            blurDOMarr[i].classList.add('blurred');
        }

        disable_scroll();
    
        // animation end
        overlay.addEventListener('click', () => {
            overlay.classList.remove('overlay-active');
            navWrap.classList.remove('nav-wrapper-active');
            header.classList.remove('translucent');
            socIcons.classList.remove('translucent');

            for (var i = 0; i < blurDOMarr.length; i++) {
                blurDOMarr[i].classList.remove('blurred');
            }

            enable_scroll();
        })
    });
}


// prevent scroll when overlay menu is displayed 
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
        window.addEventListener('wheel', wheel, false);
        }

    window.onmousewheel = document.onmousewheel = wheel;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('wheel', wheel, false);
    }
    
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}
