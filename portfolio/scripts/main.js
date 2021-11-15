let mainSections = document.getElementsByTagName("section");





window.addEventListener("load", () => {
    let scrollValue = $(window).scrollTop();
    let root = document.documentElement;
    hideAllSection(mainSections);
    populateContent(mainSections);
    welcomeGreeting();

});


//These event listeners are primarily used to trigger header intro sequence
window.addEventListener("scroll", () => {
    let scrollValue = $(window).scrollTop();
    let root = document.documentElement;
    TranslateBG(root, scrollValue);
    populateContent(mainSections);

});




//Moves background body image with scroll
function TranslateBG(bgOffset, scrollValue) { //bgOffset is for the root for css variables, root is passed through parameter "bgOffset" to manipulate css var
    bgOffset.style.setProperty('--moving-y', -400 + scrollValue * -0.2 + "px");
}



//Hides all section elements to be faded in by scrolling the page
function hideAllSection(pageSections) {
    for (let i = 0; i < pageSections.length; i++) {
        pageSections[i].style.opacity = "0";
        pageSections[i].style.transform = "translateY(30px)";
    }
}

//fades in section content by scrolling
function populateContent(pageSections) {
    for (let i = 0; i < pageSections.length; i++) {
        if (isScrolledIntoView(pageSections[i])) {
            pageSections[i].classList.add("fade-in-section");
            //console.log(isScrolledIntoView(pageSections[i]) + " element: " + pageSections[i] + " number: " + i);
        }
    }
}



function logIn(element) {
    let userName = element.elements['username'].value;
    localStorage.setItem("portfolio_Username", userName);
    console.log(userName);
}
//USED FOR FUTURE LOGIN SYSTEM I HAVE IN PLANNING STAGE
function checkForUsername(element) {
    if (localStorage.getItem("portfolio_Username") != undefined) {
        element.href = "account.html";
    } else {
        element.href = "login.html";
    }
}

function welcomeGreeting() {
    let userName = localStorage.getItem("portfolio_Username");
    let welcomeHeader = document.getElementById("welcomeUser")
    if (userName != undefined) {
        welcomeHeader.innerHTML = "Hi, " + userName;
    } else {
        return
    }
}

function toggleMenu(ele) {
    ele.classList.toggle("change");

    // Get the modal
    var modal = document.getElementById("myModal"); 
    if (modal.style.display == "none") {
        modal.style.display = "flex";
    } else {
        modal.style.display = "none";
    }

}


//checks to see if specified element is in view; This should work for every page

function isScrolledIntoView(elem) {
    let docViewTop = (window.innerHeight * 0.03) + ($(window).scrollTop() - ($(window).scrollTop() * 0.30));

    let docViewBottom = docViewTop + (0.3 * $(window).height());

    let elemTop = $(elem).offset().top - (0.05 * $(window).height());
    let elemBottom = elemTop;

    //console.log(docViewTop + ": Doc view Top, " + docViewBottom + ": Bottom, " + elemTop + " Element Top");

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function TwoDArray(row, length) {
    let array = new Array(row)
    for (i = 0; i < row; i++) {
        array[i] = new Array(length);
    }
    return array;
}