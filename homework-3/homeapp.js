'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

let getRequest = (url) => {
    return new Promise ((resolve, reject) => {
        var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200){
                        reject('Error');
                    } else {
                       resolve(xhr.responseText);
                    }
                }
            }
            xhr.send();
    })
}

// function getRequest(url, cb) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4) {
//             if (xhr.status !== 200){
//                 reject('Error');
//             } else {
//                resolve(xhr.responseText);
//             }
//         }
//     }
//     xhr.send();
// }

class ProductList {
    constructor (container = '.products', url = `/catalogData.json`){
        this.container = container;
        this.goods = [];
        this.productObjs = [];
        this.url = url;
        this.getJson().then(data => this.handleData(data));
        this.init();
        
        
    }
    
    init(){
        document.querySelector(this.container).addEventListener('click', event => {
            if(event.target.classList.contains('by-btn')){  
                // .addProduct();
            }
        });
        document.querySelector('.btn-cart').addEventListener('click', () => {
         document.querySelector(this.container).classList.toggle('invisible');
     });
    document.querySelector(this.container).addEventListener('click', event => {
         if (event.target.classList.contains('del-btn')){
            //  .removeProduct();
         }
     })
     }  ;

    handleData(data){
        this.goods = data;
        this.render();
    }
    getJson(url){
        return fetch(url ? url: `${API+this.url}`).then(result => result.json()).catch(error => {
            console.log(error);
        })
    }
       
   
    
    sum(){
        return this.productObjs.reduce((sum, {price}) => sum + price , 0);
    }
    
    
    render() {
        const catalogBlock = document.querySelector(this.container);
        for (let product of this.goods) {
            let productObj = null;
            this.productObjs.push(productObj);
            if(this.constructor.name === 'ProductList'){
                productObj = new ProductItem(product);
                catalogBlock.insertAdjacentHTML('beforeend', productObj.getHTMLString());
            } 
            if(this.constructor.name === 'BasketProductList'){
                productObj = new BasketProductItem(product);
                catalogBlock.insertAdjacentHTML('beforeend', productObj.getBasketHTMLString());
            } 
            if(!productObj) return;
            console.log(productObj);
        }
        
    }
}

class ProductItem {
    constructor (product, img = 'https://via.placeholder.com/150.jpg') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    getHTMLString() {
     return ` 
        <div class="product-item" data-id= "${this.id}">     
            <img src="https://via.placeholder.com/150.jpg" alt="">
            <div class="desc">
                <h3>${this.title}</h3>   
                <p>${this.price}</p>
                <button class="by-btn" data-id= "${this.id}" >Добавить</button>
     </div>           
</div>`;
    }
}


class BasketProductList extends ProductList{
    constructor(cart, container = ".cart-block", url = "/getBasket.json", quantity = 0){
        super(container, url, );
        this.cart = cart;
        this.quantity = quantity;
        this.getJson().then(data => this.handleData(data.contents));
    }
    
    addProduct(element){
        this.getJson(`${API}/addToBasket.json` ).then(data => {
            if (data.result === 1){
                let productId = +element.dataset['id']
                let find = this.goods.find(product => product.id_product === productId);
                if (find){
                    find.quantity++;
                    this.updateCart(find);
                }else{
                    let product = {
                        id_product: productId,
                        price: +element.dataset['price'],
                        product_name: element.dataset['name'],
                        quantity: 1
                    };
                    this.goods = [product];
                    this.render();
                }
            }else{
                console.log('error');
            }
        })
    }

    updateCart(product){
        let block = document.querySelector('cart-item[data-id=`${product.id_product}`]');
        block.querySelector('.product-quantity').textContent = `Count: ${product.quantity}`;
        block.querySelector('.data-price').textContent = `${product.quantity * product.price} rublev`;
    }
   
    
    removeProduct(element){
        this.getJson(`${API}`+this.url).then(data => {
            if(data.result === 1){
                let productId = +element.dataset['id'];
                let find = this.productObjs.find(product => product.id_product === productId);
                if (find.quantity > 1){
                    find.quantity--;
                    this.updateCart(find);
                }else{
                    this.productObjs.splice(this.productObjs.indexOf(find), 1);
                    document.querySelector(`cart-item[data-id="${productId}"]`).remove();
                }
            }else{
            console.log('error');
            }
        })
    }
  
}
    
class BasketProductItem extends ProductItem{
    constructor (product, img, title, price, id){
        super (product,img, title, price, id);
       
    }
    getBasketHTMLString() {
        return ` 
           <div class="cart-item" data-id= "${this.id}">   
           <button class=" del-btn">x</button>  
               <img src="https://via.placeholder.com/90.jpg" alt="">
               <div class="desc">
                   <h3 class ="data-name">${this.title}</h3>   
                   <p class="data-price">${this.price}</p>
                   <p class="product-quantity">${this.quantity} shtuk</p>
        </div>           
   </div>`;
       }
}


 let catalog = new ProductList();
 let cart = new BasketProductList();


