'use strict';
function addEventListenersForAddToCardBtn(){
    addToCardBtns.forEach(function(button){
        button.addEventListener('click', addedProductHandler);
    });
}

let nameProducts = document.querySelectorAll('h3[class="heading_mini"]');
let addToCardBtns = document.querySelectorAll('button[data-productId]');
let prices = document.querySelectorAll('.cardPrice');
let productsObj = [];



for(let i = 1; i < nameProducts.length + 1; i++)
{ 
    productsObj[i] =  ( {
        productId: {
            value: addToCardBtns[i - 1]
        },
        name: {
            value: nameProducts[i - 1]
        },
        cost:{
            value: prices[i - 1]
        }
    });
}

function addedProductHandler(event){
    let productId = event.currentTarget.getAttribute('data-productId');

    addIntoBasket(productId);
}

addEventListenersForAddToCardBtn();
