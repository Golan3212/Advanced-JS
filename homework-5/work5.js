'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        addBasketUrl: '/addToBasket.json',
        getBasketUrl: '/getBasket.json',
        products: [],
        imgCatalog: 'https://via.placeholder.com/150.jpg',
        imgBasket: 'https://via.placeholder.com/90.jpg',
        searchLine: '',
        isVisibleCart: false,
        isVisibleItem: true,
        basket: [],
        filtered:[],
    },
    methods: {
        getRequest(url) { 
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
            },

        getJson(url){
            return fetch(url)
            .then(result => result.json())
            .catch(error => {
                alert(error);
            })
        },

        addProduct(product){
            this.getJson(`${API + this.addBasketUrl} ` ).then(data => {
                if (data.result === 1){
                    let id = +product.id_product;
                    let find = this.basket.find(product => product.id_product === id);
                    if (find){
                        find.quantity++;
                    }else{
                       let prod = Object.assign({quantity: 1}, product);
                       this.basket.push(prod)
                    }
                   
                }else{
                    console.log("error");
                }
            });
        },
        removeProduct(basketItem){
            this.getJson(`${API}/deleteFromBasket.json`).then(data => {
                if(data.result === 1){
                        this.basket.splice(this.basket.indexOf(basketItem), 1)    
                }
            })
        },
        minusQuantity(basketItem){
            this.getJson(`${API}/deleteFromBasket.json`).then(data => {
                if(data.result === 1){
                    if(basketItem.quantity > 1){
                        basketItem.quantity--
                    }else{
                        this.basket.splice(this.basket.indexOf(basketItem), 1)
                    }      
                }
            })
        },
        filter(){
            let regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },


    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
        .then(data => {
            for(let el of data){
                this.products.push(el)
                this.filtered.push(el)
            }
        });

        this.getJson(`${API + this.getBasketUrl}`)
        .then( data => {
            
           for(let  el of data.contents){
            this.basket.push(el);
           } 

            return this.basket,  console.log(this.basket);
          
        });
        
    },
    mount(){
        
    },
    computed: {
       
    }
});


