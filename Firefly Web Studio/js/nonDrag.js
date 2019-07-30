/*********** NON-DRAG ONMOUSEMOVE HANDLE VARIANT ************/

container.addEventListener('mousemove', function(e){
    if(e.target === arrows){
        handle.style.left = e.clientX + 'px';
        left.style.width = e.clientX + 'px';
        right.style.width = (w - e.clientX - 19) + 'px';
        if(e.clientX > center){
            left.style.zIndex = 2;
            right.style.zIndex = 1;
        } else {
            left.style.zIndex = 1;
            right.style.zIndex = 2;
        }
    }
})