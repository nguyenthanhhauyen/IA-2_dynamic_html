// Session 4 — semantic catalogue. The TODOs below are the spec: give them to
// your assistant, then check the result against Done means in README.md.
// MDN: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
//
// This file is loaded with <script defer>, so the page already exists when it
// runs: querySelector finds every element below.

const catalogue = document.querySelector('#catalogue');
const cartCount = document.querySelector('#cart-count');
const cartTotal = document.querySelector('#cart-total');
const searchInput = document.querySelector('#q');
const statusBox = document.querySelector('#status');
const loadMoreButton = document.querySelector('#load-more');
const template = document.querySelector('#card-template');

// How many of each product is in the cart, by product id: { tshirt: 2, cap: 1 }
const cart = {};

// ---------------------------------------------------------------------------
// B1 — Add to cart, with ONE listener
// ---------------------------------------------------------------------------
// Listen for 'click' on `catalogue` itself, not on each button.
// When the click came from an .add button:
//   1. find its card:   event.target.closest('.card')
//   2. read its id:     card.dataset.id      (from data-id="...")
//   3. add 1 to cart[id]   (careful: the first time, cart[id] is undefined)
//   4. call renderCart()
// A click anywhere else inside the catalogue must do nothing.
//
// Test: "Load more", then Add on a new product. If the count does not move,
// your listener is on the old buttons, not on the list.

// TODO B1: catalogue.addEventListener(...)


function renderCart() {
  // TODO B1: write the number of items in the cart into cartCount.
  // Object.values(cart) gives [2, 1]; add them up. Use textContent.

  // Stretch B4: also write ' · 540.000 đ' into cartTotal.
  // Prices are in data-price on each card. dataset values are STRINGS:
  // '180000' + 1 is '1800001'. Convert with Number() first.
  // Format a number: total.toLocaleString('vi-VN') + ' đ'
}

// ---------------------------------------------------------------------------
// B2 — Filter as you type
// ---------------------------------------------------------------------------
function applyFilter() {
  // TODO B2:
  // 1. Read searchInput.value, trim() it, toLowerCase() it.
  // 2. For every .card: card.hidden = true unless its .name contains the query
  //    (compare lower-case with lower-case).
  // 3. Write ONE line into statusBox, with textContent — never innerHTML:
  //      query is empty   -> ''  (nothing)
  //      some cards match -> 'Showing 3 of 8 products'
  //      nothing matches  -> 'No products match "<exactly what the user typed>"'
}

// TODO B2: call applyFilter on every 'input' event of searchInput.


// ---------------------------------------------------------------------------
// B3 — The search form must not reload the page
// ---------------------------------------------------------------------------
// Press Enter in the search box: the browser submits the form, reloads the
// page and puts ?q=... in the address bar. Stop that: listen for 'submit' on
// the form, call event.preventDefault(), then applyFilter().
// This needs Part A first — the search box has to be inside a <form>.
// Hint: searchInput.form is the form the input belongs to.

// TODO B3


// ---------------------------------------------------------------------------
// Given: "Load more". Read it, do not change it.
// ---------------------------------------------------------------------------
const moreProducts = [
  { id: 'belt', name: 'Belt', price: 140000, stock: 'In stock' },
  { id: 'raincoat', name: 'Raincoat', price: 310000, stock: 'In stock' },
  { id: 'backpack', name: 'Backpack', price: 450000, stock: 'Low stock' },
  { id: 'beanie', name: 'Beanie', price: 85000, stock: 'In stock' },
];

function loadMore() {
  for (const p of moreProducts) {
    // Copy the card inside <template>, then fill it with textContent.
    // No innerHTML: a product name is data, not markup.
    const card = template.content.firstElementChild.cloneNode(true);
    card.dataset.id = p.id;
    card.dataset.price = String(p.price);
    card.querySelector('.name').textContent = p.name;
    card.querySelector('.price').textContent = p.price.toLocaleString('vi-VN') + ' đ';
    card.querySelector('.stock').textContent = p.stock;
    catalogue.append(card);
  }
  loadMoreButton.hidden = true;
  applyFilter(); // so a search that is already typed applies to the new cards
}

loadMoreButton.addEventListener('click', loadMore);
