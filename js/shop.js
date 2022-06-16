// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
   {
        id: 1,
        name: 'Cooking oil',
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

    // const clearCartRows = document.getElementById("clearRow");
    // clearCartRows.remove();

    // console.log(typeof clearCartRows);
    // console.log(clearCartRows);



    document.getElementById("cartList").innerHTML = "";
    document.getElementById("totalPrice").innerHTML = total;
}


// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    let i;

    for (i= 0; i < cartList.length; i++){
        // total = total + cartList[i].price;
        total += cartList[i].price;
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


function printCart(){
    let productPrice;
    
    const dinamicCart = document.getElementById("cartList");
    const fragmentCart = document.createDocumentFragment();

    // cart.forEach((product) =>{
    for (let i = 0; i < cart.length; i++) {
        productPrice = cart[i].price * cart[i].quantity;
        console.log(productPrice);

        const rowProduct = document.createElement(`tr`);
        rowProduct.setAttribute('id', 'domRow');
        //asignar id o class par acceder desde cleanCart() y eliminar el nodo

        const rowProductName = document.createElement(`th`);
        rowProductName.textContent = `${cart[i].name}`;
        //es necesario agregar scope="row" ?????

        const rowProductPrice = document.createElement(`td`);
        rowProductPrice.textContent = `$${cart[i].price}`;
        
        const rowProductQuantity = document.createElement(`td`);
        rowProductQuantity.textContent = `${cart[i].quantity}`;
        console.log(rowProductQuantity);
        
        const rowProductProductPrice = document.createElement(`td`);
        rowProductProductPrice.textContent = `$${productPrice}`;
        
        rowProduct.append(rowProductName);
        rowProduct.append(rowProductPrice);
        rowProduct.append(rowProductQuantity);
        rowProduct.append(rowProductProductPrice);

        fragmentCart.append(rowProduct);
        
    };
    calculateTotal();
    dinamicCart.append(fragmentCart);
}


function printCart() {
    document.getElementById("cartList").innerHTML = "";
    let productPrice;


    // const dinamicCart = document.querySelector("#cartList");
    // const fragmentCart = document.createDocumentFragment();

    // const a = document.getElementById("cartList");
    
    
    for (let i = 0; i < cart.length; i++) {
        productPrice = cart[i].price * cart[i].quantity;



        document.querySelector("#cartList").insertAdjacentHTML('afterbegin',`<tr class="tr"></tr>`);
        document.querySelector(".tr").insertAdjacentHTML('afterbegin',`<th class="th">${cart[i].name}</th>`);
        document.querySelector(".tr").insertAdjacentHTML('beforeend',`<td class="td">${cart[i].price}</td>`);
        document.querySelector(".tr").insertAdjacentHTML('beforeend',`<td class="td">${cart[i].quantity}</td>`);
        if (cart[i].id === 1 && cart[i].quantity >= cart[i].offer['number']) {
            promotionApplied = calculatePromotion(cart, i);
        } else if (cart[i].id === 3 && cart[i].quantity >= cart[i].offer['number']) {
            promotionApplied = calculatePromotion(cart, i);
        } else {
            document.querySelector(".tr").insertAdjacentHTML('beforeend',`<td class="td">${productPrice}</td>`);
        }
        
        //promotion
        
        // document.getElementById("cartList").insertAdjacentElement('afterbegin','tr');
        // document.querySelector("").insertAdjacentElement('afterbegin','tr');
        
        // const rowProduct = document.createElement(`tr`);
        // const rowProductName = document.createElement(`th`);
        // const rowProductPrice = document.createElement(`td`);
        // const rowProductQuantity = document.createElement(`td`);
        // const rowProductQuantityPrice = document.createElement(`td`);


        // document.getElementById("cartList").insertAdjacentHTML('afterbegin','fragmentCart');        document.getElementById("cartList").insertAdjacentHTML('afterbegin','fragmentCart');

    }
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