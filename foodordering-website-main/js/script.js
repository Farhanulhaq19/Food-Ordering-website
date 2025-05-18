let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  section.forEach(sec =>{

    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height){
      navLinks.forEach(links =>{
        links.classList.remove('active');
        document.querySelector('header .navbar a[href*='+id+']').classList.add('active');
      });
    };

  });

}

// When the search icon is clicked
document.querySelector('#search-icon').onclick = () => {
  document.querySelector('#search-form').classList.toggle('active'); // Toggle search form visibility
};

// When the close icon is clicked
document.querySelector('#close').onclick = () => {
  document.querySelector('#search-form').classList.remove('active'); // Hide the search form
};


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
  loop:true,
});

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  loop:true,
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

function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 3000);
}

window.onload = fadeOut;

    
        // Existing cart-related functionality

let cartCount = 0;
let cartItems = [];

const cartDisplay = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.btn');
const cartIcon = document.getElementById('cart-icon');
const cartBox = document.getElementById('cart-box');
const cartItemsList = document.getElementById('cart-items');

function updateCart() {
    cartDisplay.textContent = cartCount;
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        if (this.textContent.trim().toLowerCase() === 'add to cart') {
            e.preventDefault();

            const parent = this.parentElement;
            const itemName = parent.querySelector('h3')?.innerText || 'Item';
            const itemPrice = parent.querySelector('span')?.innerText || 'Price N/A';

            // Store item name and price as object
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

    // Clear existing items
    cartItemsList.innerHTML = '';

    // Add updated items
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}`;
        cartItemsList.appendChild(li);
    });
});

// Liked Dishes Functionality
let likedDishesList = document.getElementById('liked-dishes-list');


// Adding click event to each "like" button (heart icon)
let likeButtons = document.querySelectorAll('.dishes .box .fa-heart');

likeButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the default link behavior

        const parent = this.parentElement;
        const dishName = parent.querySelector('h3').innerText; // Get the dish name
        const dishPrice = parent.querySelector('span').innerText; // Get the dish price
        
        // Check if the dish is already in the liked list
        let isAlreadyLiked = false;
        const allLikedItems = likedDishesList.querySelectorAll('li');
        allLikedItems.forEach(item => {
            if (item.innerText.includes(dishName)) {
                isAlreadyLiked = true;
            }
        });

        if (!isAlreadyLiked) {
            // If not already liked, add the dish to the list
            const li = document.createElement('li');
            li.textContent = `${dishName} - ${dishPrice}`; // Add dish name and price
            likedDishesList.appendChild(li); // Append it to the liked dishes list
        } else {
            alert('This dish is already in your liked list.'); // Alert if already liked
        }

        // Change the color of the heart icon to red (liked state)
        this.style.color = this.style.color === 'red' ? '#eee' : 'red'; // Toggle color
    });
});




