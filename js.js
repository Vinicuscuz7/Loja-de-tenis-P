
let cart = [];
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");


function updateCart() {
    let total = 0;
    cart.forEach(item => total += item.price);
    cartCount.textContent = cart.length;
    cartTotal.textContent = `R$${total.toFixed(2)}`;
}


function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}


const buttons = document.querySelectorAll(".add-to-cart");
buttons.forEach(button => {
    button.addEventListener("click", function() {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        addToCart(name, price);
    });
});
