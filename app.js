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

catalogue.addEventListener('click', (event) => {
  const button = event.target.closest('.add');
  if (!button || button.disabled) return; // not an Add, or sold out

  const card = button.closest('.card');
  const id = card.dataset.id;
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
});


function renderCart() {
  let count = 0;
  for (const n of Object.values(cart)) count += n;
  cartCount.textContent = count;

  let total = 0;
  for (const [id, qty] of Object.entries(cart)) {
    const card = catalogue.querySelector(`.card[data-id="${id}"]`);
    total += Number(card.dataset.price) * qty; // dataset values are strings
  }
  cartTotal.textContent = count === 0 ? '' : ' · ' + total.toLocaleString('vi-VN') + ' đ';
}

// ---------------------------------------------------------------------------
// B2 — Filter as you type
// ---------------------------------------------------------------------------
function applyFilter() {
  const typed = searchInput.value;
  const query = typed.trim().toLowerCase();
  const cards = catalogue.querySelectorAll('.card');

  let shown = 0;
  for (const card of cards) {
    const name = card.querySelector('.name').textContent.toLowerCase();
    card.hidden = !name.includes(query); // '' is in every name: empty query shows all
    if (!card.hidden) shown += 1;
  }

  if (query === '') {
    statusBox.textContent = '';
  } else if (shown > 0) {
    statusBox.textContent = `Showing ${shown} of ${cards.length} products`;
  } else {
    statusBox.textContent = `No products match "${typed}"`;
  }
}

searchInput.addEventListener('input', applyFilter);


// ---------------------------------------------------------------------------
// B3 — The search form must not reload the page
// ---------------------------------------------------------------------------
// Press Enter in the search box: the browser submits the form, reloads the
// page and puts ?q=... in the address bar. Stop that: listen for 'submit' on
// the form, call event.preventDefault(), then applyFilter().
// This needs Part A first — the search box has to be inside a <form>.
// Hint: searchInput.form is the form the input belongs to.

searchInput.form.addEventListener('submit', (event) => {
  event.preventDefault(); // no reload, no ?q= in the address bar
  applyFilter();
});


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
