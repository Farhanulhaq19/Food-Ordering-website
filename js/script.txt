let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    section.forEach(sec => {
        let top = window.scrollY;
        let height = sec.offsetHeight;
        let offset = sec.offsetTop - 150;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header .navbar a[href*=' + id + ']').classList.add('active');
            });
        };
    });
}

// Search form toggle
document.querySelector('#search-icon').onclick = () => {
    document.querySelector('#search-form').classList.toggle('active');
};

document.querySelector('#close').onclick = () => {
    document.querySelector('#search-form').classList.remove('active');
};

// Swiper for home slider
var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
});

// Swiper for review slider
var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

// Loader animation
function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut() {
    setInterval(loader, 3000);
}

window.onload = fadeOut;

// Cart functionality
let cartCount = 0;
let cartItems = [];

const cartDisplay = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.btn');
const cartIcon = document.getElementById('cart-icon');
const cartBox = document.getElementById('cart-box');
const cartItemsList = document.getElementById('cart-items');

function updateCart() {
    cartDisplay.textContent = cartCount;
    cartItemsList.innerHTML = '';
    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ${item.price} <span class="remove-btn" data-index="${index}"><i class="fas fa-trash"></i></span>`;
        cartItemsList.appendChild(li);
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index'));
            cartItems.splice(index, 1);
            cartCount--;
            updateCart();
        });
    });
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        if (this.textContent.trim().toLowerCase() === 'add to cart') {
            e.preventDefault();
            const parent = this.parentElement;
            const itemName = parent.querySelector('h3')?.innerText || 'Item';
            const itemPrice = parent.querySelector('span')?.innerText || 'Price N/A';
            cartItems.push({ name: itemName, price: itemPrice });
            cartCount++;
            updateCart();
            this.textContent = 'Added!';
            setTimeout(() => {
                this.textContent = 'Add to Cart';
            }, 1000);
        }
    });
});

cartIcon.addEventListener('click', function (e) {
    e.preventDefault();
    cartBox.style.display = cartBox.style.display === 'none' ? 'block' : 'none';
    updateCart();
});

// Liked Dishes Functionality
let likedDishesList = document.getElementById('liked-dishes-list');
let likeButtons = document.querySelectorAll('.dishes .box .fa-heart');

likeButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const parent = this.parentElement;
        const dishName = parent.querySelector('h3').innerText;
        const dishPrice = parent.querySelector('span').innerText;
        let isAlreadyLiked = false;
        const allLikedItems = likedDishesList.querySelectorAll('li');
        allLikedItems.forEach(item => {
            if (item.innerText.includes(dishName)) {
                isAlreadyLiked = true;
            }
        });
        if (!isAlreadyLiked) {
            const li = document.createElement('li');
            li.textContent = `${dishName} - ${dishPrice}`;
            likedDishesList.appendChild(li);
        } else {
            alert('This dish is already in your liked list.');
        }
        this.style.color = this.style.color === 'red' ? '#eee' : 'red';
    });
});

// Feedback form submission
document.getElementById("feedbackForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    if (name && message) {
        document.getElementById("response").innerText = "Thanks for your feedback, " + name + "!";
        document.getElementById("feedbackForm").reset();
    } else {
        document.getElementById("response").innerText = "Please fill out all fields.";
    }
});
