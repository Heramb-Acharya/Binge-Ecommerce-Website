// Image switching functionality (for product.html)
document.addEventListener('DOMContentLoaded', function() {
    var MainImg = document.getElementById("MainImg");
    var SmallImg = document.getElementsByClassName("SmallImg");

    // Only run image switching code if elements exist (product page)
    if (MainImg && SmallImg.length > 0) {
        SmallImg[0].onclick = function() {
            MainImg.src = SmallImg[0].src;
        }
        SmallImg[1].onclick = function() {
            MainImg.src = SmallImg[1].src;
        }
        SmallImg[2].onclick = function() {
            MainImg.src = SmallImg[2].src;
        }
        SmallImg[3].onclick = function() {
            MainImg.src = SmallImg[3].src;
        }
    }
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartBadge = document.querySelector('.cart-badge');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.textContent = '0';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h5>${item.name}</h5>
                    <p>Size: ${item.size}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
                <div class="cart-item-price">Rs. ${item.price * item.quantity}</div>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total;
    }
    
    // Update cart badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    } else if (totalItems > 0) {
        const cartIcon = document.querySelector('.navbar-links li:last-child');
        if (cartIcon) {
            cartIcon.innerHTML += `<span class="cart-badge">${totalItems}</span>`;
        }
    }
}

function addToCart() {
    const sizeSelect = document.querySelector('select');
    const quantityInput = document.querySelector('input[type="number"]');
    
    if (!sizeSelect || !quantityInput) {
        console.log('Add to cart elements not found');
        return;
    }
    
    const size = sizeSelect.value;
    const quantity = parseInt(quantityInput.value);
    
    if (size === 'Select Size') {
        alert('Please select a size');
        return;
    }
    
    const product = {
        id: Date.now(),
        name: 'Outcast Statement Tee',
        price: 799,
        size: size,
        quantity: quantity,
        image: 'img/clothes/4.png'
    };
    
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    openSidecart();
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function openSidecart() {
    document.getElementById('sidecart').classList.add('active');
    document.getElementById('sidecartOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidecart() {
    document.getElementById('sidecart').classList.remove('active');
    document.getElementById('sidecartOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners - wrapped in DOMContentLoaded to ensure elements exist
document.addEventListener('DOMContentLoaded', function() {
    // Add to cart button (only exists on product page)
    const addToCartBtn = document.querySelector('.single-product-details button');
    if (addToCartBtn) {
        addToCartBtn.onclick = addToCart;
    }
    
    // Close cart button
    const closeCartBtn = document.getElementById('closeCart');
    if (closeCartBtn) {
        closeCartBtn.onclick = closeSidecart;
    }
    
    // Overlay click to close
    const sidecartOverlay = document.getElementById('sidecartOverlay');
    if (sidecartOverlay) {
        sidecartOverlay.onclick = closeSidecart;
    }
    
    // Cart icon click to open
    const cartLink = document.querySelector('.navbar-links li:last-child a');
    if (cartLink) {
        cartLink.onclick = function(e) {
            e.preventDefault();
            openSidecart();
        };
    }
    
    // Initialize cart display
    updateCartDisplay();
});