var dragX, dragY;
var objX, objY;
var isDown = false;

function touchStart(evt) {
    var input = document.getElementById("move-input");
    objX = input.style.left;
    objY = input.style.top;
    dragX = evt.targetTouches[0].clientX;
    dragY = evt.targetTouches[0].clientY;
    isDown = true;
}

function touchMove(evt) {
    var input = document.getElementById("move-input");
    var x = evt.targetTouches[0].clientX;
    var y = evt.targetTouches[0].clientY;
    if (isDown) {
        input.style.left = parseInt(objX) + parseInt(x) - parseInt(dragX) + "px";
        input.style.top = parseInt(objY) + parseInt(y) - parseInt(dragY) + "px";
    }
}

function touchEnd(evt) {
    if (isDown) {
        // var x = evt.targetTouches[0].clientX;
        // var y = evt.targetTouches[0].clientY;
        var input = document.getElementById("move-input");
        // input.style.left = (parseInt(x) - parseInt(dragX) + parseInt(objX)) + "px";
        // input.style.top = (parseInt(y) - parseInt(dragY) + parseInt(objY)) + "px";
        // dragX = x;
        // dragY = y;
        input.style.cursor = "default";
        isDown = false;
    }
}

function Init() {
    var moveableInput = document.getElementById("move-input");
    window.screen.availHeight = '640px';
    window.screen.availWidth = '960px';

    if (moveableInput.addEventListener) { // all browsers except IE before version 9
        // Firefox from version 3.5, Google Chrome, Safari, Internet Exlorer
        moveableInput.addEventListener("touchstart", touchStart, false);
        // Firefox, Google Chrome, Safari, Internet Exlorer
        moveableInput.addEventListener("touchmove", touchMove, false);
        // Firefox, Google Chrome, Safari, Internet Exlorer
        moveableInput.addEventListener("touchend", touchEnd, false);

    } else {
        if (moveableInput.attachEvent) { // IE before version 9

        }
    }
}