//THIS SCRIPT GENERATES CARDS AND ALLOWS THE MANIPULATION OF CART ITEMS STORED IN MEMORY

/* SCRIPT WILL BE USED TO ACCESS THE "itemObjects.json" FILE TO 
PROVIDE "itemCardGen.js" DATA TO POPULATE ECOMMERCE SITE.
*/

/* JSON OBJECT FORMAT; DXXXX ARE ITEM CODES
{
"items": {
    "D0000" : {
        "imagePath"  : "images/D0000.jpg",
        "itemName"  : "Rubber Dog Bone",
        "price"    : "$12.99",
        "tags" : {
            "Toy", "Dog"
        },
        "decription" : "Fun loving dog toy!"
    },
    "D0011" : {
        "imagePath"  : "images/D0011.jpg",
        "itemName"  : "Cat Fur Toy",
        "price"    : "$7.99",
        "tags" : {
            "Toy", "Cat"
        },
        "decription" : "A cat attention stealer!"
        }
    }
}
*/


window.addEventListener("load", () => {
    if (document.URL.includes("shoppingcart.html")) {
        populateItemCart();
        calculateTotalPrice();
    } else {
        itemCardGenerator();
    }
});

window.addEventListener("input", () => {
    calculateTotalPrice();
});



function addToCart(ele) {
    let cartKeys;
    if (localStorage.getItem("cartKeys") != undefined) {
        cartKeys = JSON.parse(localStorage.getItem("cartKeys"));
    } else {
        cartKeys = [];
    }

    let selectedEle = ele.parentNode.id;
    cartKeys.push(selectedEle);
    console.log(selectedEle);
    //localStorage.setItem(selectedEle, JSON.stringify(itemObjectsData[selectedEle]));
    localStorage.setItem("cartKeys", JSON.stringify(cartKeys));
}

function deleteFromCart(_itemEle) {
    let parentContainer = _itemEle.closest(".cart-line-container");
    console.log(parentContainer.id);
    let keyArr = JSON.parse(localStorage.getItem("cartKeys"));
    console.log(keyArr);
    for (j = 0; j < keyArr.length; j++) {
        if (_itemEle.closest(".cart-line-container").id == keyArr[j]) {
            keyArr.splice(j, 1);
            j--;
        }
    }
    if (keyArr.length == 0) {
        deleteAllFromCart();
    } else {
        localStorage.setItem("cartKeys", JSON.stringify(keyArr));
        parentContainer.remove();
        console.log(keyArr);
        calculateTotalPrice();
    }
}






function deleteAllFromCart() {
    localStorage.removeItem("cartKeys");
    let totalDeleteArr = document.getElementsByClassName("cart-line-container");
    for (i = 0; i < totalDeleteArr.length; i++) {
        totalDeleteArr[i].remove();
        i--;
    }

    document.getElementById("outcome_Control").remove();

    //SET UP TO WRITE A LINK TO DOM FOR ESY RETURN HOME.
    let baseDiv = document.getElementsByClassName('cart-body')[0];
    let returnToHome = document.createElement("a");
    returnToHome.setAttribute("href", "shoppinglist.html");
    returnToHome.innerHTML = "Return to Item List";
    baseDiv.appendChild(returnToHome);

    console.log("does it work???");




}

function calculateTotalPrice() {

    //SET UP TO GET ITEM PRICES
    let itemPrices = []
    let quantity = document.getElementsByClassName("cart-quant-input");
    let costHost = document.getElementById("costHost");

    //ITERATES THROUGH ALL CART ITEMS WITH CLASS "CART-PRICE" AND GETS THE STRING VALUE TO CONVERT TO FLOAT TYPE FOR ARRAY
    function getPrices() {
        let items = document.getElementsByClassName("cart-price");
        let arr = [];
        for (i = 0; i < quantity.length; i++) {
            arr.push(parseFloat(items[i].firstChild.innerHTML.substring(1)));
        }
        return arr;
    }


    itemPrices = getPrices();
    console.log(itemPrices);

    let totalPrice = 0.0;
    for (i = 0; i < quantity.length; i++) {
        totalPrice += itemPrices[i] * parseInt(quantity[i].value);
    }
    console.log(totalPrice.toFixed(2));
    costHost.innerHTML = "Total Cost: \t    $" + totalPrice.toFixed(2);
}

function notificationText() {
    let fixedNotify = document.getElementById("fixedNotify");

}



function itemCardGenerator() {
    let loops;

    let itemsBody = document.getElementsByClassName("items-body");
    let itemsImport = itemObjectsData;
    let allKeys = Object.keys(itemsImport);

    //CHECKS WHAT DOCUMENT IS LOADED TO SEE HOW MANY LOOPS SHOULD BE PREFORMED.
    if (document.URL.includes("index.html")) {
        loops = 3;
    } else {
        loops = allKeys.length;
    }

    console.log(allKeys);


    for (i = 0; i < loops; i++) {
        let itemCardContainer = document.createElement("div");
        itemCardContainer.setAttribute("class", "item-card-container");
        itemCardContainer.setAttribute("id", allKeys[i]);

        //SET UP FOR CARD IMAGE
        let itemImage = document.createElement("div");
        let img = document.createElement("img");
        itemImage.appendChild(img);
        itemImage.setAttribute("class", "card-image");
        img.setAttribute("src", itemsImport[allKeys[i]].imagePath); // gets the item image path from object
        img.setAttribute("alt", itemsImport[allKeys[i]].itemName);
        itemCardContainer.appendChild(itemImage);

        //SET UP FOR CARD TITLE
        let itemTitle = document.createElement("div");
        let titleText = document.createElement("h1");
        titleText.innerHTML = itemsImport[allKeys[i]].itemName;
        itemTitle.setAttribute("class", "card-title");
        itemTitle.appendChild(titleText);
        itemCardContainer.appendChild(itemTitle);

        //SET  UP FOR CARD DESCRIPTION
        let itemDesc = document.createElement("div");
        let descText = document.createElement("p");
        descText.innerHTML = itemsImport[allKeys[i]].description;
        itemDesc.setAttribute("class", "card-desc");
        itemDesc.appendChild(descText);
        itemCardContainer.appendChild(itemDesc);

        //SET UP CARD PRICE
        let itemPrice = document.createElement("div");
        let priceText = document.createElement("h1");
        priceText.innerHTML = itemsImport[allKeys[i]].price
        itemPrice.setAttribute("class", "card-price");
        itemPrice.appendChild(priceText);
        itemCardContainer.appendChild(itemPrice);

        //SET UP BUTTON FOR ADD TO CARD FUNCTION
        let itemButton = document.createElement("BUTTON");
        itemButton.innerHTML = "ADD";
        itemButton.setAttribute("onclick", "addToCart(this)");
        itemButton.setAttribute("class", "card-button");
        itemCardContainer.appendChild(itemButton);

        //APPENDS EVERYTHING TO THE MAIN DIV HOLDING ITEM CARDS
        itemsBody[0].appendChild(itemCardContainer);
        console.log(i + " " + itemsBody[0] + " line got it!");
    }
}


function populateItemCart() {
    let itemArray = JSON.parse(localStorage.getItem("cartKeys")); // INITIAL LOOP OF CART KEYS
    console.log(itemArray);

    //Gets cart base body and the object data to fill fields
    let cartBody = document.getElementsByClassName("cart-body");
    let itemsImport = itemObjectsData;
    let allKeys = Object.keys(itemsImport);


    //First loop iterates through the array.length; I'm setting up cart items to fill tray and delete duplicates to add them to
    if (itemArray != undefined) {


        for (i = 0; i < itemArray.length; i++) {
            let cartItemContainer = document.createElement("div");
            cartItemContainer.setAttribute("class", "cart-line-container");
            cartItemContainer.setAttribute("id", itemArray[i]);

            //SET UP FOR ITEM IMAGE
            let itemImage = document.createElement("div");
            let img = document.createElement("img");
            itemImage.appendChild(img);
            itemImage.setAttribute("class", "cart-image");
            img.setAttribute("src", itemsImport[itemArray[i]].imagePath); // gets the item image path from object
            img.setAttribute("alt", itemsImport[itemArray[i]].itemName);
            cartItemContainer.appendChild(itemImage);

            //SET UP FOR ITEM TITLE
            let itemTitle = document.createElement("div");
            let titleText = document.createElement("h1");
            titleText.innerHTML = itemsImport[itemArray[i]].itemName;
            itemTitle.setAttribute("class", "cart-title");
            itemTitle.appendChild(titleText);
            cartItemContainer.appendChild(itemTitle);

            //SET UP FOR ITEM PRICE
            let itemPrice = document.createElement("div");
            let priceText = document.createElement("h1");
            priceText.innerHTML = itemsImport[itemArray[i]].price
            itemPrice.setAttribute("class", "cart-price");
            itemPrice.appendChild(priceText);
            cartItemContainer.appendChild(itemPrice);


            //Set UP ITEM QUANITY

            let itemQuantity = document.createElement("form");
            itemQuantity.setAttribute("class", "cart-quantity");
            itemQuantity.setAttribute("action", "#");
            itemQuantity.setAttribute("onsubmit", "return false");
            let quantityText = document.createElement("h1");
            quantityText.innerHTML = "Quantity:"
            itemQuantity.appendChild(quantityText);
            let quantityInput = document.createElement("input");
            quantityInput.setAttribute("class", "cart-quant-input");
            quantityInput.setAttribute("placeholder", "0");
            quantityInput.setAttribute("value", "0");
            quantityInput.addEventListener('change', calculateTotalPrice());
            itemQuantity.appendChild(quantityInput);

            let repeatKeys = 1; // Will delete repeated keys from array; adds +1 for quantity; Normalizes the array
            for (j = 0; j < itemArray.length; j++) {
                if (j == i) {
                    continue;
                } else {
                    if (itemArray[i] == itemArray[j]) {
                        repeatKeys++;
                        itemArray.splice(j, 1);
                        j--;
                    }

                }
            }
            console.log("Spliced keys: " + repeatKeys);
            quantityInput.value = repeatKeys;
            cartItemContainer.appendChild(itemQuantity);

            // SET UP FOR DELETE FROM CART
            let deleteButton = document.createElement("button");
            deleteButton.setAttribute("onclick", "deleteFromCart(" + itemArray[i] + ")");
            deleteButton.setAttribute("class", "delete-button");
            deleteButton.innerHTML = "Delete";
            cartItemContainer.appendChild(deleteButton);


            cartBody[0].appendChild(cartItemContainer);
            //console.log(itemArray);


            //Iterates to get quantity of repeated items added to cart

        }
    } else {
        deleteAllFromCart();
    }
}


/*

//FOR LOCAL MOCK DATABASE
function readyLocalFilesTest () {
   //let object = itemObjectsData.D0000.itemName;
    //console.log(object);

    localStorage.setItem("D0000", JSON.stringify(itemObjectsData.D0000));
    console.log(localStorage.getItem("D0000"));
}

//JQUERY FOR WEBSERVER USING JSON FILE
$(document).ready(function(){
    $.getJSON("itemObjects.json", function(data){
        console.log(data["D0011"].itemName); 
  });
  readyLocalFilesTest();
});

*/