'use strict';
// мне кажется можно убрать id, так как оно не используется в коде кроме как порядковый номер, но похоже я зря это сделал =)
let products = [
    { title: 'Notebook', price: 1000},
    { title: 'Mouse', price: 100},
    { title: 'Keyboard', price: 250},
    { title: 'Gamepad', price: 150},
];

const renderProduct = (title, price) => {
    return ` <div class="product-item">
    <h3>${title}</h3>
    <img src="https://via.placeholder.com/150.jpg" alt="">
    <p>${price}</p>
    <button class="by-btn">Добавить</button>
</div>`;
};
//Здесь дал метод мэп сразу массиву продуктов
const renderCatalog = () => {
    const productList = products.map((item) =>renderProduct(item.title, item.price));
   //Добавил метод join массиву, спасибо Артему =))
    document.querySelector('.products').innerHTML = productList.join('');
};

renderCatalog(products);