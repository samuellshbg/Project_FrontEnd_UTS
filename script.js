// Tampilkan input pencarian dan sembunyikan ikon pencarian
document.getElementById('search-icon').addEventListener('click', function() {
    var searchForm = document.getElementById('search-form');
    var searchIcon = document.getElementById('search-icon');
    
    // Sembunyikan ikon pencarian dan tampilkan form
    searchIcon.style.display = 'none';
    searchForm.classList.remove('hidden');
    searchForm.classList.add('active');
    
    // Fokus ke input pencarian
    document.getElementById('search-input').focus();
});

// Kembalikan ikon pencarian ketika input pencarian kehilangan fokus atau form di-submit
document.getElementById('search-input').addEventListener('blur', function() {
    var searchForm = document.getElementById('search-form');
    var searchIcon = document.getElementById('search-icon');
    
    // Jika tidak ada pencarian, kembalikan ke ikon
    searchIcon.style.display = 'inline-block';
    searchForm.classList.add('hidden');
    searchForm.classList.remove('active');
});

$('#search-form').on('submit', function(e) {
    e.preventDefault();
    var keyword = $('#search-input').val().toLowerCase();
    $('.product').each(function() {
        var productName = $(this).find('h4').text().toLowerCase();
        if (productName.includes(keyword)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
    
    // Kembalikan ikon pencarian setelah pencarian selesai
    var searchForm = document.getElementById('search-form');
    var searchIcon = document.getElementById('search-icon');
    searchIcon.style.display = 'inline-block';
    searchForm.classList.add('hidden');
    searchForm.classList.remove('active');
});

$(document).ready(function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    function updateCartCount() {
        $('#cart-count').text(cart.length);
    }

    function updateFavoriteCount() {
        $('#favorite-count').text(favorites.length);
    }

    updateCartCount();
    updateFavoriteCount();

    $(document).on('click', '.add-to-cart', function () {
        let productElement = $(this).parent();
        let productName = productElement.data('name');
        let productPrice = productElement.data('price');
        let productImage = productElement.data('image');

        let itemInCart = cart.find(item => item.name === productName);
        if (itemInCart) {
            itemInCart.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    });

    $('.add-to-cart').on('click', function () {
        let productElement = $(this).parent();
        let productName = productElement.data('name');
        let productPrice = productElement.data('price');
        let productImage = productElement.data('image'); // Mengambil gambar produk

        let itemInCart = cart.find(item => item.name === productName);
        if (itemInCart) {
            itemInCart.quantity += 1; // Tambah kuantitas jika produk sudah ada di keranjang
        } else {
            cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
        }

        // Simpan keranjang ke localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount(); // Perbarui jumlah item di navbar
    });
// Fungsi untuk memperbarui total harga di halaman keranjang
    function updateTotalPrice() {
        let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        $('#total-price').text(totalPrice);
    }
function updateCartItems() {
    let cartItemsContainer = $('#cart-items');
    cartItemsContainer.empty(); // Hapus semua item sebelumnya

    cart.forEach((item, index) => {
        cartItemsContainer.append(`
            <div class="cart-item">
                <input type="checkbox" class="item-checkbox">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <p class="item-name">${item.name}</p>
                    <p class="item-price">Rp. ${item.price}</p>
                    <input type="number" class="item-quantity" value="${item.quantity}" min="1" data-index="${index}">
                </div>
            </div>
        `);
    });
    // Update total harga setiap kali ada perubahan jumlah barang
    updateTotalPrice();
}
$('#checkout-btn').on('click', function () {
    if (cart.length > 0) {
        alert('Checkout berhasil!');
        cart = []; // Kosongkan keranjang
        localStorage.removeItem('cart');
        updateCartItems(); // Render ulang keranjang yang sekarang kosong
        updateCartCount(); // Perbarui jumlah item di navbar
    } else {
        alert('Keranjang belanja kosong!');
    }
});

    $(document).on('click', '.save-to-favorite', function () {
        let productElement = $(this).parent();
        let productName = productElement.data('name');
        let productPrice = productElement.data('price');
        let productImage = productElement.data('image');

        let itemInFavorites = favorites.find(item => item.name === productName);
        if (itemInFavorites) {
            favorites = favorites.filter(item => item.name !== productName);
        } else {
            favorites.push({ name: productName, price: productPrice, image: productImage });
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteCount();
    });
});

// Saat input quantity berubah, perbarui jumlah item dan total harga
$(document).on('change', '.item-quantity', function () {
    let index = $(this).data('index');
    let newQuantity = $(this).val();
    cart[index].quantity = parseInt(newQuantity); // Update quantity di cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Simpan perubahan ke localStorage
    updateTotalPrice(); // Perbarui total harga
});
    if (window.location.pathname.includes('cart.html')) {
        updateCartItems();
    }

    // Saat halaman favorit dibuka, tampilkan item dari localStorage
    if (window.location.pathname.includes('favorites.html')) {
        updateFavoriteItems();
    }