'use strict';
let basketCounterEl = document.querySelector('.countProduct');
let basket = {};
let openBasketBtn = document.querySelector('#basket');
let basketEl = document.querySelector('.basketInto');
let basketTotalEl = document.querySelector('.basketTotal');
let basketTotalValueEl = document.querySelector('.totalBasketValue');

openBasketBtn.addEventListener('click', function(){
    basketEl.classList.toggle('hiddenBasket');
});

function increaseBasketCount(){
basketCounterEl.textContent++;
}
function addProductToObj(productId){
    if (!(productId in basket)){
        basket[productId] = 1;
    }else{
        basket[productId]++;
    }
}
function renderInBasket(productId){
    let productExist = document.querySelector(`.productCount[data-productId="${productId}"]`);
    if(productExist){
        increaseProductCount(productId);
        recalculateSumCount(productId);
    }else{
        renderNewProductInBasket(productId);
    }
}

 function renderNewProductInBasket(productId){
    let productRow = `
    <div class="basketRow">
            <div>${productsObj[productId].name.value.textContent}</div>
            <div>
                <span class="productCount" data-productId="${productId}">1</span> шт.
            </div>
            <div>${productsObj[productId].cost.value.textContent}$</div>
            <div class="span productTotalRow" data-productId="${productId}">${productsObj[productId].cost.value.textContent}$</div>
        </div>
    `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}

function calculateAndRenderTotalBasketSum(){
    let totalSum = 0;
    for(let productId in basket){
        totalSum += basket[productId] * productsObj[productId].cost.value.textContent;
    }
    basketTotalValueEl.textContent = totalSum.toFixed(2);
}

function increaseProductCount(productId){
    let productCountEl = document.querySelector(`.productCount[data-productId="${productId}"]`);
    productCountEl.textContent++;
}

function recalculateSumCount(productId){
    let productTotalRowEl = document.querySelector(`.productTotalRow[data-productId="${productId}"]`);
    let totalPriceForRow = (basket[productId] * productsObj[productId].cost.value.textContent).toFixed(2);
    productTotalRowEl.textContent =`${totalPriceForRow} $` ;
}

function  addIntoBasket(productId){
 increaseBasketCount();
 addProductToObj(productId);
 renderInBasket(productId);
 calculateAndRenderTotalBasketSum();
}