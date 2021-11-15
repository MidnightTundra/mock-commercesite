let dynamicHeaderNumber = 0;
let headerElementDisplay = document.getElementById("Intro");




window.addEventListener("load", () => {
    let scrollValue = $(window).scrollTop();
    let root = document.documentElement;
    window.scrollTo(0, 0);

    //Controls whether the header intro sequence functions or not
    
    //enableHeader(headerElementDisplay); 
     //FROM "scrollLock.js", DISABLES SCROLL UNTIL ENABLED
    if(window.innerWidth < 768) {
        localStorage.setItem("introDone", "true");
        enableScroll();
    }
    else {
        localStorage.setItem("introDone", "false");
        dynamicHeader(root, dynamicHeaderNumber, -1);
        disableScroll();
    }
});


//These event listeners are primarily used to trigger header intro sequence
window.addEventListener("scroll", () => {
    let scrollValue = $(window).scrollTop();
    let root = document.documentElement;
    TranslateBG(root, scrollValue);
    dynamicHeader(root, dynamicHeaderNumber, -1);
    dynamicHeaderNumber += 1;
    

});

window.addEventListener("wheel", () => {
    let root = document.documentElement;
    dynamicHeaderNumber += 1;
    dynamicHeader(root, dynamicHeaderNumber, -4);
});

window.addEventListener("resize", () => {
    if(window.innerWidth < 768) {
        enableScroll();
    }
});


//Moves background body image with scroll
function TranslateBG(bgOffset, scrollValue) { //bgOffset is for the root for css variables, root is passed through parameter "bgOffset" to manipulate css var for moving background
    bgOffset.style.setProperty('--moving-y', -400 + scrollValue * -0.2 + "px");
}


function translateHeader(ele, scrollValue) {
    ele.style.setProperty('--moving-y', scrollValue * -0.5 + "px");
}


//CHECKS IF HEADER INTRO IS LEGAL AND IF HEADER INTRO IS DONE TO LOAD REST OF PAGE
function dynamicHeader(ele, number, multiplier) {
    opacityCheck = window.getComputedStyle(document.querySelector('.my-picture')).opacity;
    if (opacityCheck != "0" && localStorage.getItem("introDone") != "true") {
        window.scrollTo(0, 0 );
        ele.style.setProperty('--header-value', number * multiplier);
    } else {
        enableScroll();
        localStorage.setItem("introDone", true);
        headerElementDisplay.style.height = "0";
        headerElementDisplay.style.opacity = "0";
        headerElementDisplay.style.paddingBottom = "0";
    }
}

//Controls whether header intro sequence is used in reload or not
function enableHeader(ele) {
    if (localStorage.getItem("introDone") == undefined) {
        localStorage.setItem("introDone", "false");
    } else if (localStorage.getItem("introDone") == "true") {
        ele.style.display = "none";
    }
}

