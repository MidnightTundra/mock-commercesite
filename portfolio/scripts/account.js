window.addEventListener("load", () => {
    getAccountDetails();
})


function saveAccountDetails (formEle) {
    let form = formEle.elements;
    console.log(form[1].id);
    for (let i = 0; i < form.length - 1; i++) {
        localStorage.setItem(form[i].id, form[i].value);
        console.log(i);
        console.log(form[i].id);
        
    }
}

function getAccountDetails () {
    let userNameReturn = document.getElementById("userName_Account");
    userNameReturn.innerHTML = localStorage.getItem("portfolio_Username");
    let form = document.getElementById("Form_Register").elements;
    console.log(form[1].id);
    for (let i = 0; i < form.length - 1; i++) {
        form[i].value = localStorage.getItem(form[i].id);
        console.log(i);
        console.log(form[i].id);
        
    }
}