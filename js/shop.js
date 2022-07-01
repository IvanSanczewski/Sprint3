// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
// var products = [
//    {
//         id: 1,
//         name: 'Cooking oil',
//         price: 10.5,
//         type: 'grocery',
//         offer: {
//             number: 3,
//             percent: 20
//         }
//     },
//     {
//         id: 2,
//         name: 'Pasta',
//         price: 6.25,
//         type: 'grocery'

//     },
//     {
//         id: 3,
//         name: 'Instant cupcake mixture',
//         price: 5,
//         type: 'grocery',
//         offer: {
//             number: 10,
//             percent: 30
//         }
//     },
//     {
//         id: 4,
//         name: 'All-in-one',
//         price: 260,
//         type: 'beauty'
//     },
//     {
//         id: 5,
//         name: 'Zero Make-up Kit',
//         price: 20.5,
//         type: 'beauty'
//     },
//     {
//         id: 6,
//         name: 'Lip Tints',
//         price: 12.75,
//         type: 'beauty'
//     },
//     {
//         id: 7,
//         name: 'Lawn Dress',
//         price: 15,
//         type: 'clothes'
//     },
//     {
//         id: 8,
//         name: 'Lawn-Chiffon Combo',
//         price: 19.99,
//         type: 'clothes'
//     },
//     {
//         id: 9,
//         name: 'Toddler Frock',
//         price: 9.99,
//         type: 'clothes'
//     }
// ]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

//Controls de total ammount of product units in the cart and it's displayed in the rounded pill inside the cart button in the menu
var countProducts = 0;   

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    
    // let newProduct = {};
    // let i;

    // for (i = 0; i < products.length; i++) {
    //     if (i == id - 1) {
    //         newProduct = products[i]; // es necesario/bueno crear una variable que contenga el objeto para luego meterlo en el array o se puede meter directamente?
    //         cartList.push(newProduct);
            
    //         // cartList.push(products[i]);            
    //         // console.log(typeof(newProduct), newProduct, typeof(cartList), cartList, typeof(products), products);
    //     }
    // }
    // generateCart(cartList);


    addToCart(id);
}


// Exercise 2
function cleanCart() {
    cartList = [];
    cart = [];
    total = 0;

    document.getElementById("cartList").innerHTML = "";
    document.getElementById("totalPrice").innerHTML = total;

    // la sentencia siguiente funciona, pero como ya hay una función que se encarga de calcular y mostrar el total de productos en el pill buton del menú, mejor llamar a dicha función
    // document.getElementById("countProducts").innerHTML = countProducts; 
    totalProducts();


}


// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
        
    for (i= 0; i < cart.length; i++){
        if (cart[i].id === 1 && cart[i].quantity >= cart[i].offer['number']) {
            total += cart[i].subtotalWithDiscount;
        } else if (cart[i].id === 3 && cart[i].quantity >= cart[i].offer['number']) {
            total += cart[i].subtotalWithDiscount;
        } else {
            total += cart[i].price * cart[i].quantity;
        }
    }
    document.getElementById("totalPrice").innerHTML = total.toFixed(2);
    total = 0;
}


// Exercise 4
function generateCart(cartList) {
// Using the "cartlist" array that contains all the items in the shopping cart, 
// generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.

    let i, k;
    let isAlreadyInCart;


    // loop para el array original
    for (i = ((cartList.length) - 1); i < cartList.length; i++) {

        if (cart.length === 0){
            cart.push(cartList[i]);
            cart[0].quantity = 1; // podríamos añadir parámetro y valor al objeto del segundo array una vez hecho el push
        } else {
            isAlreadyInCart = false;
            // loop al segundo array
            for (k = 0; k < cart.length; k++) {
                if (cartList[i].id === cart[k].id){
                    cart[k].quantity ++;
                    isAlreadyInCart = true;
                }
            }
            if (!isAlreadyInCart){
                cartList[i].quantity = 1;
                cart.push(cartList[i])
            }
        }
    }
}

// Exercise 5
// function applyPromotionsCart(cart) {
//     // Apply promotions to each item in the array "cart"

//     for(let i = 0; i < cart.length; i++) {
//         if (cart[i].id === 1  && cart[i].quantity >= cart[i].offer['number']) {
//             promotionApplied = calculatePromotion(cart, i);
//             // return cart[i].subtotalWithDiscount = (cart[i].quantity * cart[i].price) * ((100 - cart[i].offer['percent'])/100).toFixed(2);
//         } else if (cart[i].id === 3 && cart[i].quantity >= cart[i].offer['number']) {
//             promotionApplied = calculatePromotion(cart, i);
//             // return cart[i].subtotalWithDiscount = (cart[i].quantity * cart[i].price) * ((100 - cart[i].offer['percent'])/100).toFixed(2);
//         }
//     }
    
// }


//se puede eliminar gracias al return dentro de las condiciones de function applyPromotionsCart(cart)
function calculatePromotion(cart, i) {
    return cart[i].subtotalWithDiscount = (cart[i].quantity * cart[i].price) * ((100 - cart[i].offer['percent'])/100);
}

// Exercise 6
function printCart() {
    document.getElementById("cartList").innerHTML = "";
    let productPrice;
    let promotionApplied;
    
    for (let i = 0; i < cart.length; i++) {
        productPrice = cart[i].price * cart[i].quantity;
        
        document.querySelector("#cartList").insertAdjacentHTML('afterbegin',`<tr class="tr"></tr>`);
        document.querySelector(".tr").insertAdjacentHTML('afterbegin',`<th class="th">${cart[i].name}</th>`);
        document.querySelector(".tr").insertAdjacentHTML('beforeend',`<td class="td">$${cart[i].price}</td>`);
        document.querySelector(".tr").insertAdjacentHTML('beforeend',`<td class="td">${cart[i].quantity}</td>`);
        document.querySelector(".tr").insertAdjacentHTML('beforeend',`<td class="td">${cart[i].quantity}</td>`);
        
        if (cart[i].id === 1 && cart[i].quantity >= cart[i].offer['number']) {
            // promotionApplied = applyPromotionsCart(cart).toFixed(2);
            promotionApplied = calculatePromotion(cart, i).toFixed(2);
            document.querySelector(".tr").insertAdjacentHTML('beforeend',`<td class="td">$${promotionApplied}</td>`);
        } else if (cart[i].id === 3 && cart[i].quantity >= cart[i].offer['number']) {
            // promotionApplied = applyPromotionsCart(cart).toFixed(2);
            promotionApplied = calculatePromotion(cart, i).toFixed(2);
            document.querySelector(".tr").insertAdjacentHTML('beforeend',`<td class="td">$${promotionApplied}</td>`);
        } else {
            document.querySelector(".tr").insertAdjacentHTML('beforeend',`<td class="td">$${productPrice}</td>`);
        }
    }
    calculateTotal();
}

// ** Nivell II **

// Exercise 8
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously
    let i;

    // let countProducts = 0; comentamos para que una función totalProducts() realice el recuento de productos y así modularizamos
    let isAlreadyInCart = false; 
    
    if (cart.length === 0) { //si cart esta vacío
        isAlreadyInCart = false;
    } else {
        for (i = 0; i < cart.length; i++){ //comparar el id del objeto del array products con el id de los objetos que ya están en cart
            if (id === cart[i].id) {
                isAlreadyInCart = true;
                break;
            } else {
                isAlreadyInCart = false;
            }
        }        
    }    

    if (isAlreadyInCart) {
        cart[i].quantity++;
    } else {
        products[id-1].quantity = 1; //añadir propiedad quantity al objeto
        cart.push(products[id-1]); //añadir objeto del array products al array al cart
    }
    

    // ********     
    // hacer el ciclo mediante un forEach()
    // ********     


    // if (cart.length === 0) { //si cart esta vacío
    //     isAlreadyInCart = false;
    
    // } else {
    //     cart.forEach(item => { //para cada item del cart
    //         if (id === item.id) { //find: ya está el id
    //             isAlreadyInCart = true;
    //             break;
    //         } else {
    //             isAlreadyInCart = false;
    //         }
    //     })
    // }
    // if (isAlreadyInCart) {
    //     item.quantity++;
    // } else {
    //     products[id-1].quantity = 1; //añadir propiedad quantity al objeto
    //     cart.push(products[id-1]); //añadir objeto del array products al array al cart
    // }

    // ********     
    // ********     

    totalProducts(); // sacamos el contador total de productos a una función externa y la llamamos cada vez que se hace click en añadir o eliminar
    
}

// Exercise 9
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to delete to cart
    // 2. Delete one unit of found product from the cart array  

    let existsInCart;
    existsInCart = cart.some(item => item.id === id);

    if (!existsInCart) {
        alert('Este producto no se encuentra en tu carrito.');
        return;
    }
    
    for (let i = 0; i < cart.length; i++) {
        if (id === cart[i].id && cart[i].quantity > 1) {
            cart[i].quantity--;
            totalProducts();
        } else if (id === cart[i].id && cart[i].quantity == 1 ) {
            cart.splice(i, 1);
            totalProducts();
        }
    }
}

function totalProducts() {
    let countProducts = 0;
    for (let i = 0; i < cart.length; i++) {
        countProducts += cart[i].quantity;
    }
    document.getElementById("countProducts").innerHTML = countProducts;
}

function open_modal(){
	printCart();
}