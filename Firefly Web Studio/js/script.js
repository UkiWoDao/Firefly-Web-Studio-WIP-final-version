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
    initDrag();
    activeOverlay();
    activeLiClick();
})

// scroll related functionality
var scrollEvents = () => {
    changeHamburger();
    inactiveLiScroll();
    activeLiScroll();
    changeSoc();
    changeContact();
}

window.addEventListener("resize", toDefaultPos);

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
    return {
        // dom elements getter
        getDOMelems: function() {
            return domElems;
        }
    }
})();

// dynamic split screen related code
function initDrag() {
    // handle element flag and position variables
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

    function dragStart(e) {
        if(e.type === "touchstart"){
            initialX = e.touches[0].clientX - xOffset;
        } else {
            initialX = e.clientX - xOffset;
        }
    
        if(e.target === arrows) {
            dragActive = true;
        }
    }
    
    function dragEnd() {
        initialX = currentX;
    
        dragActive = false;   
    }
    
    function drag(e) {
        if(dragActive) {
            e.preventDefault();
    
            if(e.type === 'touchmove'){
                currentX = e.touches[0].clientX - initialX;
            } else {
                currentX = e.clientX - initialX;
            }
            
            xOffset = currentX;
    
            moveHandle(currentX, elems.handle);
            resizePanels(e, currentX);
        }
    }
    
    // make handle stay after dragging
    function moveHandle(xPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, 0, 0)";
    }
};

function resizePanels(e) {
    // get DOM elements
    var elems = DOM.getDOMelems();

    var w = window.innerWidth;
    var center = w / 2;

    elems.left.style.width = e.clientX + 'px';
    elems.right.style.width = (w - e.clientX - 19) + 'px';
    
    // make larger section on top
    if(e.clientX > center){
        elems.left.style.zIndex = 2;
        elems.right.style.zIndex = 1;
    } else {
        elems.left.style.zIndex = 1;
        elems.right.style.zIndex = 2;
    }
}

function toDefaultPos() {
    // get DOM elements
    var elems = DOM.getDOMelems();

    var w = window.innerWidth;
    var half = w / 2;

    // handle default position
    elems.handle.style.left = half + 'px';
    elems.handle.style.transform = "translate(-50%)";
    
    // panels default position
    elems.left.style.width = half + 'px';
    elems.right.style.width = (half - 19) + 'px';

    elems.left.style.zIndex = 1;
    elems.right.style.zIndex = 1;
}

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
function changeSoc() {
    // grab dom elements
    var elems = DOM.getDOMelems();
    
    // grab boundary between landing page and typography section
    var typoTop = elems.typo.getBoundingClientRect().top;

    // get target element
    var icons = elems.allSocIcon;

    // social icons change color as they pass the boundary
    for (var i = 0; i < icons.length; i++) {
        if (icons[i].getBoundingClientRect().bottom > typoTop) {
            icons[i].style.color = 'black';
        } else {
            icons[i].style.color = 'var(--turquoise)';
        }
    }
};


/************** MENU ICON *****************/
function changeHamburger() {
    // grab dom elements
    var elems = DOM.getDOMelems();

    // get target element
    var hamb = elems.hamb;

    // shorthands
    var docEl = document.documentElement;
    var docBody = document.body;

    // get hamburger height
    var hambH = window.innerHeight - 32; // height of the viewport (= 1 section) - position top of hamburger

    if (docBody.scrollTop || docEl.scrollTop > hambH) {
        hamb.style.fill = 'var(--deep-sea)';
    } else {
        hamb.style.fill = 'var(--turquoise)';
    }
};


/****************** SIDEBAR LIST ITEMS ***********************/
// var navDOM = document.querySelectorAll('.sidebar li');
//  $(navDOM).click(function() {
//     $(navDOM).removeClass('active-2');
//     $(navDOM).removeClass('active-1');
//     $(this).filter($(navDOM[0])).toggleClass('active-1');
//     $(this).not(navDOM[0]).toggleClass('active-2');
// });

function activeLiClick() {
    // grab dom elements
    var elems = DOM.getDOMelems();

    // get target element
    var li = elems.allLi;

    var liArr = nodeListToArray(li);
    var liExceptFirst = liArr.shift();

    // var liArrExceptFirst = exceptFirst(liArr);

    // add event listener on each li element
    [].forEach.call(li, (el) => {
        el.addEventListener('click', () => {
            removeClass(li, 'active-2');
            removeClass(li, 'active-1');
            liArr[0].classList.toggle('active-1');
            liExceptFirst.classList.toggle('active-2');
        });
    });

// function removes class from all node list items
function removeClass (nodeList, className) {
    [].forEach.call(nodeList, function(el) {
        el.classList.remove(className);
    })
}

function nodeListToArray(nodeList) {
    var nodeArray = [];
    for (var i = 0; i < nodeList.length; i++) {
        nodeArray.push(nodeList[i]);
    }
    return nodeArray;
}

function exceptFirst(array) {
    var nodeArray = array.shift();
    return nodeArray;
}
    // //jQuery version
    // $(navDOM).click(function() {
    //     $(navDOM).removeClass('active-2');
    //     $(navDOM).removeClass('active-1');
    //     $(this).filter($(navDOM[0])).toggleClass('active-1');
    //     $(this).not(navDOM[0]).toggleClass('active-2');
    // })
}

function inactiveLiScroll() {
    // grab dom elements
    var elems = DOM.getDOMelems();

    // get target element
    var typoTop = elems.typo.getBoundingClientRect().top;

    // shorthand for sidebar li
    var li = elems.allLi;

    // apply different styling to list items depending on scroll position
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
    var elems = DOM.getDOMelems();

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


/****************** ASIDE CONTACT ********************/
function changeContact() {
    // grab dom elements
    var elems = DOM.getDOMelems();

    // get target element color property
    var cont = elems.rotContact;
    var halfH = window.innerHeight / 2;

    // get document root node
    var doc = document.documentElement;

    // get document body
    var body = document.body;

    if (body.scrollTop || doc.scrollTop > halfH) {
           cont.style.color = 'black';
    }
    if (body.scrollTop || doc.scrollTop < halfH) {
           cont.style.color = 'var(--turquoise)';
    }
};


/***************** ACTIVATING OVERLAY *********************/
function activeOverlay() {
    document.getElementById('hamburger-svg').addEventListener('click', () => {
        // get dom elements
        var elems = DOM.getDOMelems();
    
        // create array of elements that will be blurred in animation
        var blurDOMarr = [elems.typo, elems.proto, elems.branding, elems.contact, elems.rotContact, elems.header];
    
        // animation start
        elems.header.classList.add('translucent');
        elems.overlay.classList.add('overlay-active');
        elems.navWrap.classList.add('nav-wrapper-active');
        elems.socIcons.classList.add('translucent');

        for (var i = 0; i < blurDOMarr.length; i++) {
            blurDOMarr[i].classList.add('blurred');
        }
        disable_scroll();
    
        // animation end
        elems.overlay.addEventListener('click', () => {
            elems.overlay.classList.remove('overlay-active');
            elems.navWrap.classList.remove('nav-wrapper-active');
            elems.header.classList.remove('translucent');
            elems.socIcons.classList.remove('translucent');

            for (var i = 0; i < blurDOMarr.length; i++) {
                blurDOMarr[i].classList.remove('blurred');
            }
            enable_scroll();
        })
    });
}

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
