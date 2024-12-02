
let cat = [];
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

let cart = [];

// Atualiza os dados do carrinho no topo
function updateCartSummary() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('cart-total').textContent = `R$ ${cartTotal}`;
}

// Renderiza os itens do carrinho na tabela
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>R$ ${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td><button onclick="removeFromCart(${index})">Remover</button></td>
        `;
        cartItems.appendChild(row);
    });

    updateCartSummary();
}

// Adiciona um item ao carrinho
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price: parseFloat(price), quantity: 1 });
    }
    renderCart();
}

// Remove um item do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

// Configura os botões de "Adicionar ao Carrinho"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');
        addToCart(name, price);
    });
});
// Captura o botão de finalizar compra
document.getElementById('checkout-button').addEventListener('click', finalizePurchase);

// Função para finalizar a compra
function finalizePurchase() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio! Adicione itens antes de finalizar a compra.');
        return;
    }

    // Exibe um resumo dos itens comprados
    const cartSummary = cart.map(item => `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`).join('\n');
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    alert(`Compra finalizada!\n\nResumo:\n${cartSummary}\n\nTotal: R$ ${totalPrice}`);
    
    // Limpa o carrinho após finalizar
    cart = [];
    renderCart();
}
