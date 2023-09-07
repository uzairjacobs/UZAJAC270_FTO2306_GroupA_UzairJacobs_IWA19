//imports 
import { 
    authors, 
    genres, 
    books,
    BOOKS_PER_PAGE
} from "./data.js"

//global scope variables
let matches = books;
let page = 1;
let range = [0, 36];

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

// DOM elements
const items = document.querySelector('[data-list-items]')

const headerSearch = document.querySelector('[data-header-search]')
const headerSettings = document.querySelector('[data-header-settings]')

const settingsCancel = document.querySelector('[data-settings-cancel]')
const settingsForm = document.querySelector('[data-settings-form]')
const settingsOverlay = document.querySelector('[data-settings-overlay]')
const settingsTheme = document.querySelector('[data-settings-theme]')

const searchAuthor = document.querySelector('[data-search-authors]')
const searchCancel = document.querySelector('[data-search-cancel]')
const searchForm = document.querySelector('[data-search-form]')
const searchGenre = document.querySelector('[data-search-genres]')
const searchTitle = document.querySelector('[data-search-title]')
const searchOverlay = document.querySelector('[data-search-overlay]')

const listActive = document.querySelector('[data-list-active]')
const listDescription = document.querySelector('[data-list-description]')
const listSubtitle = document.querySelector('[data-list-subtitle]')
const listTitle = document.querySelector('[data-list-title]')
const listBlur = document.querySelector('[data-list-blur]')
const listImage = document.querySelector('[data-list-image]')
const listButton = document.querySelector('[data-list-button]')
const listClose = document.querySelector('[data-list-close]')
const listMessage = document.querySelector('[data-list-message]')

//to check for errors
if (!matches && !Array.isArray(matches)) throw new Error('Source required') 
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

//function to create preview "button"
const createPreview = ({ author, id, image, title}) => {
    const preview = document.createElement('button');
    preview.classList = 'preview'; //styling button
    preview.setAttribute('data-preview', id); 

    preview.innerHTML = /* html */ `
    <img class = "preview__image" src="${image}" alt="${title}">
    <div class="preview__content">
    <h2 class="preview__title">${title}</h2>
    <h3 class="preview__author">${authors[author]}</h3> 
    </div>
    `;

    return preview
};


// creating fragments which will hold the preview elements
let fragment = document.createDocumentFragment()
let extracted = matches.slice(range[0], range[1]);


for  (const { author, image, title, id } of extracted) { //for...of loop to iterate through an object - for each iteration, it destructures the object
 
    const preview = createPreview({
        author,
        id,
        image,
        title
    });

    fragment.appendChild(preview) //adds each preview element to the document fragment.
}
items.append(fragment) //fragment with all the preview elements is appended to <items> in the html





//need to create fragment to hold genre option elements
const genresFragment = document.createDocumentFragment()
let element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Genres'
genresFragment.appendChild(element)


for (const [id, name] of Object.entries(genres)) {
    let elementGenre = document.createElement('option')
    element.value = id
    element.innerText = name
    genresFragment.appendChild(elementGenre)
}

searchGenre.appendChild(genresFragment)



// need to create a fragment to hold authors option elements
const authorsFragment = document.createDocumentFragment()
let elementAuthor = document.createElement('option')
elementAuthor.value = 'any'
elementAuthor.innerText = 'All Authors'
authorsFragment.appendChild(elementAuthor)

for (const [id, name]of Object.entries(authors)) {
   let elementAuthor = document.createElement('option')
    elementAuthor.value = id
    elementAuthor.innerText = name
    authorsFragment.appendChild(elementAuthor)
}

searchAuthor.appendChild(authorsFragment)



//code to set the them to day or night (probably)
data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'

documentElement.style.setProperty('--color-dark', css[v].dark);
documentElement.style.setProperty('--color-light', css[v].light);




// code to handle show more button
listButton = "Show more (books.length - BOOKS_PER_PAGE)"

data-list-button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

data-list-button.innerHTML = /* html */ [
    '<span>Show more</span>',
    '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
]

data-search-cancel.click() { data-search-overlay.open === false }
data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
data-settings-form.submit() { actions.settings.submit }
data-list-close.click() { data-list-active.open === false }

data-list-button.click() {
    document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
    actions.list.updateRemaining()
    page = page + 1
}

data-header-search.click() {
    data-search-overlay.open === true ;
    data-search-title.focus();
}

data-search-form.click(filters) {
    preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    result = []

    for (book; booksList; i++) {
        titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
        authorMatch = filters.author = 'any' || book.author === filters.author

        {
            genreMatch = filters.genre = 'any'
            for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
        }

        if titleMatch && authorMatch && genreMatch => result.push(book)
    }

    if display.length < 1 
    data-list-message.class.add('list__message_show')
    else data-list-message.class.remove('list__message_show')
    

    data-list-items.innerHTML = ''
    // fragment = document.createDocumentFragment()
    //const extracted = source.slice(range[0], range[1])

    for ({ author, image, title, id }; extracted; i++) {
        const { author: authorId, id, image, title } = props

        element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)

        element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

        fragment.appendChild(element)
    }
    
    data-list-items.appendChild(fragments)
    initial === matches.length - [page * BOOKS_PER_PAGE]
    remaining === hasRemaining ? initial : 0
    data-list-button.disabled = initial > 0

    data-list-button.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

    window.scrollTo({ top: 0, behavior: 'smooth' });
    data-search-overlay.open = false
}

data-settings-overlay.submit; {
    preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    data-settings-overlay).open === false
}

data-list-items.click() {
    pathArray = Array.from(event.path || event.composedPath())
    active;

    for (node; pathArray; i++) {
        if active break;
        const previewId = node?.dataset?.preview
    
        for (const singleBook of books) {
            if (singleBook.id === id) active = singleBook
        } 
    }
    
    if !active return
    data-list-active.open === true
    data-list-blur + data-list-image === active.image
    data-list-title === active.title
    
    data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
    data-list-description === active.description
}

