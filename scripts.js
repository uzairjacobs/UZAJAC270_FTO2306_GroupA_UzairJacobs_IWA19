//imports
import { authors, genres, books, BOOKS_PER_PAGE } from "./data.js";

//global scope variables
let matches = books;
let page = 1;
let range = [0, 36];

// DOM elements
const items = document.querySelector("[data-list-items]");
const settingsOverlay = document.querySelector("[data-settings-overlay]");
const settingsTheme = document.querySelector("[data-settings-theme]");
const searchOverlay = document.querySelector("[data-search-overlay]");
const listActive = document.querySelector("[data-list-active]");
const listButton = document.querySelector("[data-list-button]");
const listClose = document.querySelector("[data-list-close]");

const day = {
  dark: "10, 10, 20",
  light: "255, 255, 255",
};

const night = {
  dark: "255, 255, 255",
  light: "10, 10, 20",
};

//to check for errors
if (!matches && !Array.isArray(matches)) throw new Error("Source required");
if (!range && range.length < 2)
  throw new Error("Range must be an array with two numbers");

// Function to create a preview button
const createPreview = ({ author, id, image, title }) => {
  // Create a new button element for the book preview
  const preview = document.createElement("button");
  preview.classList = "preview"; // Add the 'preview' class to the button
  preview.setAttribute("data-preview", id);
  // Set the 'data-preview' attribute to the book's ID for reference

  // Set the inner HTML of the button to display book information
  preview.innerHTML = /* html */ `
    <img class = "preview__image" src="${image}" alt="${title}">
    <div class="preview__info">
    <h2 class="preview__title">${title}</h2>
    <h3 class="preview__author">${authors[author]}</h3> 
    </div>
    `;

  // Return the created preview button element
  return preview;
};

// creating fragments which will hold the preview elements
let fragment = document.createDocumentFragment();
let extracted = matches.slice(range[0], range[1]);

for (const { author, image, title, id } of extracted) {
  //for...of loop to iterate through an object

  const preview = createPreview({
    author,
    id,
    image,
    title,
  });

  fragment.appendChild(preview); //adds each preview element to the document fragment.
}
items.append(fragment); //fragment with all the preview elements is appended to <items> in the html

//need to create fragment to hold genre option elements
// a drop down menu
const genresFragment = document.createDocumentFragment();
let elementGenre = document.createElement("option"); //creating html option element
elementGenre.value = "any";
elementGenre.innerText = "All Genres";
genresFragment.appendChild(elementGenre); //appends the elementGenre (representing the "All Genres" option) to the genresFragment.

for (const [id, name] of Object.entries(genres)) {
  // for each entry, the loop creates a new <option> element to represent a genre.
  let elementGenre = document.createElement("option"); // variable is scoped to the loop and won't conflict with the elementGenre variable defined outside the loop
  elementGenre.value = id;
  elementGenre.innerText = name;
  genresFragment.appendChild(elementGenre); //appends the elementGenre (representing a genre) to the genresFragment
}
const searchGenre = document.querySelector("[data-search-genres]");
searchGenre.appendChild(genresFragment); //appends the entire genresFragment (containing both "All Genres" and genre options) to an HTML element with the id searchGenre

// need to create a fragment to hold authors option elements
// a drop down menu
const authorsFragment = document.createDocumentFragment();
let elementAuthor = document.createElement("option");
elementAuthor.value = "any";
elementAuthor.innerText = "All Authors"; // all authors option
authorsFragment.appendChild(elementAuthor); //attaches the "All Authors" option to the author fragment

for (const [id, name] of Object.entries(authors)) {
  // for each entry, the loop creates a new <option> element to represent an author
  let elementAuthor = document.createElement("option"); // variable is scoped to the loop
  elementAuthor.value = id;
  elementAuthor.innerText = name;
  authorsFragment.appendChild(elementAuthor); // appends the author to fragment
}

const searchAuthor = document.querySelector("[data-search-authors]");
searchAuthor.appendChild(authorsFragment); // appends it the HTML element

// text content of show more button
listButton.innerText = `Show more (${books.length - [page * BOOKS_PER_PAGE]})`;

// Set the inner HTML of the listButton to display a "Show more" button
// along with the remaining number of books to be displayed, if any.
// The number of remaining books is calculated based on 'matches' array length
// and the current 'page' and 'BOOKS_PER_PAGE' values.
listButton.innerHTML = /* html */ [
  `<span>Show more</span>
    <span class="list__remaining"> (${
      matches.length - [page * BOOKS_PER_PAGE] > 0
        ? matches.length - [page * BOOKS_PER_PAGE]
        : 0
    })</span>`,
];

//show more button click
function displayBooks(startIndex, endIndex, books) {

  const fragment = document.createDocumentFragment();

  for (let i = startIndex; i < endIndex && i < books.length; i++) {
    const book = books[i];

    // Use the createPreview function to generate the button element
    const element = createPreview({
      author: book.author,
      id: book.id,
      image: book.image,
      title: book.title,
    });

    // Append the button to the fragment
    fragment.appendChild(element);
  }

  // Append the fragment to the 'items' element
  items.appendChild(fragment);
}

// Event listener for the "Show more" button
listButton.addEventListener("click", () => {
  const startIndex = (page - 1) * BOOKS_PER_PAGE;
  const endIndex = page * BOOKS_PER_PAGE;

  // Display the next set of books
  displayBooks(startIndex, endIndex, matches);

  // Increment the page number
  page++;

  const remaining = matches.length - endIndex;
  listButton.disabled = endIndex >= matches.length;
  listButton.textContent = `Show more (${remaining})`;
});

// Event listener for the search form submission
const searchForm = document.querySelector("[data-search-form]");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get search filters from the form
  const formData = new FormData(searchForm);
  const filters = Object.fromEntries(formData);
  const result = [];

  // Filter books based on search criteria
  for (const book of matches) {
    const titleMatch =
      filters.title.trim() === "" ||
      book.title.toLowerCase().includes(filters.title.toLowerCase());
    const authorMatch =
      filters.author === "any" || book.author === filters.author;
    const genreMatch =
      filters.genre === "any" || book.genres.includes(filters.genre);

    if (titleMatch && authorMatch && genreMatch) {
      result.push(book);
    }
  }

  // Show a message if no books match the criteria
  const listMessage = document.querySelector("[data-list-message]");
  if (result.length < 1) {
    listMessage.classList.add("list__message_show");
    items.innerHTML = "";
  } else {
    listMessage.classList.remove("list__message_show");
    items.innerHTML = "";

    const fragment = document.createDocumentFragment();

    // Display filtered books
    for (const book of result) {
      const { author, image, title, id } = book;

      const element = createPreview({
        author,
        id,
        image,
        title,
      });

      fragment.appendChild(element);
    }

    items.appendChild(fragment);
  }
  searchOverlay.open = false;
  listButton.disabled = true;
  listButton.textContent = `Show more (0)`;
});

// Event listener for clicking on book items
items.addEventListener("click", (event) => {
  // Get various elements for displaying book details
  const listDescription = document.querySelector("[data-list-description]");
  const listSubtitle = document.querySelector("[data-list-subtitle]");
  const listTitle = document.querySelector("[data-list-title]");
  const listBlur = document.querySelector("[data-list-blur]");
  const listImage = document.querySelector("[data-list-image]");

  // Open the book details panel
  listActive.open = true;

  let pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  // Find the clicked book
  for (const node of pathArray) {
    if (active) break;
    const previewId = node?.dataset?.preview;

    for (const singleBook of matches) {
      if (singleBook.id === previewId) {
        active = singleBook;
        break;
      }
    }
  }

  // Display book details
  if (!active) return;
  listImage.setAttribute("src", active.image);
  listBlur.style.backgroundImage = `url(${active.image})`;
  listTitle.textContent = active.title;
  listSubtitle.textContent = `${authors[active.author]} (${new Date(
    active.published
  ).getFullYear()})`;
  listDescription.textContent = active.description;
});

// Event listener for closing the book details panel
listClose.addEventListener("click", (event) => {
  listActive.close = true;
});

// Event listeners for canceling search and settings
const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener("click", () => {
  searchOverlay.open = false;
});

const settingsCancel = document.querySelector("[data-settings-cancel]");
settingsCancel.addEventListener("click", () => {
  settingsOverlay.open = false;
});

// Event listener for submitting settings form
const settingsForm = document.querySelector("[data-settings-form]");
settingsForm.addEventListener("submit", () => {});

// Event listener for closing the book details panel
listClose.addEventListener("click", () => {
  listActive.open = false;
});

// Event listener for opening the search overlay
const headerSearch = document.querySelector("[data-header-search]");
const searchTitle = document.querySelector("[data-search-title]");
headerSearch.addEventListener("click", () => {
  searchOverlay.open = true;
  searchTitle.focus();
});
