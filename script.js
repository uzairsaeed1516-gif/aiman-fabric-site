
const WA = "923413002751";

document.querySelectorAll("#year").forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Save favourite designs in this browser
const getFavourites = () => JSON.parse(localStorage.getItem("aimanFavourites") || "[]");
const saveFavourites = items => localStorage.setItem("aimanFavourites", JSON.stringify(items));

document.addEventListener("click", event => {
  const button = event.target.closest(".favourite-btn");
  if (!button) return;

  const id = button.dataset.id;
  let favourites = getFavourites();

  if (favourites.includes(id)) {
    favourites = favourites.filter(item => item !== id);
  } else {
    favourites.push(id);
  }

  saveFavourites(favourites);
  button.classList.toggle("active", favourites.includes(id));
  button.textContent = favourites.includes(id) ? "♥" : "♡";
  button.setAttribute("aria-label", favourites.includes(id) ? "Remove favourite" : "Add favourite");

  const count = document.querySelector("#favouriteCount");
  if (count) count.textContent = favourites.length;
});

function favouriteButton(id) {
  const active = getFavourites().includes(id);
  return `<button class="favourite-btn ${active ? "active" : ""}" data-id="${id}" aria-label="Add favourite">${active ? "♥" : "♡"}</button>`;
}

// Local views: stored only in this visitor's browser
function recordView(id) {
  const key = "aimanViews_" + id;
  const count = Number(localStorage.getItem(key) || 0) + 1;
  localStorage.setItem(key, count);
  return count;
}

// Reveal animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Ladies products
const productContainer = document.getElementById("ladiesProducts");

if (productContainer) {
  for (let i = 1; i <= 19; i++) {
    const number = String(i).padStart(2, "0");
    const id = "ladies-" + number;
    const message = encodeURIComponent(
      `Assalam o Alaikum! Mujhe Aiman Fabric ka Ladies Design ${number} pasand aaya hai. Iski price aur details bata dein.`
    );
    const views = recordView(id);

    productContainer.insertAdjacentHTML("beforeend", `
      <article class="product-card reveal">
        <div class="product-image">
          <img src="images/${id}.jpg" alt="Aiman Fabric Ladies Design ${number}" loading="lazy">
          ${i <= 3 ? '<span class="product-tag">Featured</span>' : ""}
          ${favouriteButton(id)}
        </div>
        <div class="product-info">
          <span class="product-number">AIMAN FABRIC • DESIGN ${number}</span>
          <h3>Ladies Design ${number}</h3>
          <p>Elegant unstitched ladies suit</p>
          <div class="product-meta"><span>♡ Favourite</span><span>Views on this device: ${views}</span></div>
          <a class="btn product-order" href="https://wa.me/${WA}?text=${message}" target="_blank" rel="noopener">Ask Price on WhatsApp</a>
        </div>
      </article>
    `);
  }

  productContainer.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

// Favourite count
const count = document.querySelector("#favouriteCount");
if (count) count.textContent = getFavourites().length;
