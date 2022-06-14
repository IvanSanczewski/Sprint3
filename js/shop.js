// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
   {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'

    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    
    let newProduct = {};
    let i;

    for (i = 0; i < products.length; i++) {
        if (i == id - 1) {
            newProduct = products[i]; // es necesario/bueno crear una variable que contenga el objeto para luego meterlo en el array o se puede meter directamente?
            cartList.push(newProduct);
            
            // cartList.push(products[i]);            
            // console.log(typeof(newProduct), newProduct, typeof(cartList), cartList, typeof(products), products);
        }
    }

    generateCart(cartList);
}


// Exercise 2
function cleanCart() {
    cartList = [];
    cart = [];
    total = 0;

    document.getElementById("totalPrice").innerHTML = total;
}


// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    let i;

    for (i= 0; i < cartList.length; i++){
        total = total + cartList[i].price;
    }
    
    document.getElementById("totalPrice").innerHTML = total;
    total = 0;
}


// Exercise 4
function generateCart(cartList) {
// Using the "cartlist" array that contains all the items in the shopping cart, 
// generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.

    //inicializamos variables
    let i, k;
    let isAlreadyInCart;


    // loop para el array original
    for (i = ((cartList.length) - 1); i < cartList.length; i++) {

        if (cart.length === 0){
            // cartList[i].quantity = 1;
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
            // console.log(cart)
        }
    }
    applyPromotionsCart(cart);
}

// Exercise 5
function applyPromotionsCart(cart) {
    // Apply promotions to each item in the array "cart"

    for(let i = 0; i < cart.length; i++) {
        if ((cart[i].id === 1 ) && (cart[i].quantity >= cart[i].offer['number'])) {
            // cart[i].subtotalWithDiscount = (cart[i].quantity * cart[i].price) * ((100 - cart[i].offer['percent'])/100).toFixed(2);
            promotionApplied = calculatePromotion(cart, i);
        } else if (cart[i].id === 3 && cart[i].quantity >= cart[i].offer['number']) {
            promotionApplied = calculatePromotion(cart, i);
            // cart[i].subtotalWithDiscount = (cart[i].quantity * cart[i].price) * ((100 - cart[i].offer['percent'])/100).toFixed(2);
        }
    }
    
}

function calculatePromotion(cart, i) {
    cart[i].subtotalWithDiscount = (cart[i].quantity * cart[i].price) * ((100 - cart[i].offer['percent'])/100).toFixed(2);
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    let productPrice;

    for (let i = 0; i < cart.length; i++) {
        // document.getElementById("firstProduct").innerHTML = cart[i].name;
        // document.getElementById("firstProductPrice").innerHTML = cart[i].price;
        // document.getElementById("firstProductQuantity").innerHTML = cart[i].quantity;
        // productPrice = cart[i].price * cart[i].quantity;
        // document.getElementById("firstProductTotal").innerHTML = productPrice;
        
        
        productPrice = cart[i].price * cart[i].quantity;
        const rowProduct = document.createElement(`tr${i}`);
        const rowProductName = document.createElement(`th${i}`);
        const rowProductPrice = document.createElement(`td${i}`);
        const rowProductQuantity = document.createElement(`td${i}`);
        const rowProductProductPrice = document.createElement(`td${i}`);

        rowProductName.innerHTML = `${cart[i].name}`;
        rowProductPrice.innerHTML = `$${cart[i].price}`;
        rowProductQuantity.innerHTML = `${cart[i].quantity}`;
        rowProductProductPrice.innerHTML = `$${cart[i].productPrice}`;

        
        // rowProduct.innerHTML = `<th id="${i}ProductName" scope="row">${cart[i].name}</th>`
        
    //    `<td id="${i}ProductPrice">$${cart[i].price}</td>
    //     <td id="${i}ProductQuantity">${cart[i].quantity}</td>
    //     <td id="${i}ProductTotal">$${productPrice}</td>
    //     </br>`

        const showCart = document.getElementById("cartList");
        showCart.append(rowProduct);
        
        const showRowProduct = document.getElementById(`tr${i}`);
        showRowProduct.append(rowProductName);
        
        const showRowProduct = document.getElementById(`tr${i}`);
        showRowProduct.append(rowProductName);
        
        const showRowProduct = document.getElementById(`tr${i}`);
        showRowProduct.append(rowProductName);
        
        const showRowProduct = document.getElementById(`tr${i}`);
        showRowProduct.append(rowProductName);
        // showCart.append(rowProduct);
        // showCart.append(rowProduct);
        // showCart.append(rowProduct);


        // document.getElementById("cartList").innerHTML = `<tr id="${i}Product">`
        // productPrice = cart[i].price * cart[i].quantity;
        // document.getElementById("cartList").innerHTML = `<th id="${i}ProductName" scope="row">${cart[i].name}</th>
        // <td id="${i}ProductPrice">$${cart[i].price}</td>
        // <td id="${i}ProductQuantity">${cart[i].quantity}</td>
        // <td id="${i}ProductTotal">$${productPrice}</td>`
    }

    calculateTotal();
}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
}

function open_modal(){
	console.log("Open Modal");
	printCart();
}