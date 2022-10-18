let myLibrary = [];
const container = document.querySelector(".container")
const newBookButton = document.querySelector('#new')
const form = document.querySelector('#form')
const addBook = document.querySelector('.add')

newBookButton.addEventListener('click', () => {
    form.classList.toggle('active')
})



addBook.addEventListener('click', (e) => {
    e.preventDefault();
    let newTitle = document.getElementById('title').value;
    let newAuthor = document.getElementById('author').value;
    let newPages = document.getElementById('pages').value;
    let newRead = document.querySelector('input[name="read"]:checked').value;
    let newBook = new Book(newTitle, newAuthor, newPages, newRead)
    addBookToLibrary(newBook)
    displayLibrary()
    form.classList.toggle('active')
    
})

const addBookToLibrary = (book) => {
    myLibrary.push(book)
}

const displayLibrary = () => {
    myLibrary.map((el, i) => createCard(el, i))
}

const createCard = (book, i) => {
    const card = document.createElement('div');
    card.classList.add('card')
    card.dataset.index = i;
    const title = document.createElement('h1')
    const author = document.createElement('p')
    const pages = document.createElement('p')
    const status = document.createElement('p')

    const remove = document.createElement('button')
    remove.textContent = 'Remove Book'
    remove.classList.add('remove-button')
    remove.addEventListener('click', (e) => {
        const identifier = e.target.parentElement.dataset.index
        const removeCard = document.querySelector(`[data-index="${identifier}"]`)
        container.removeChild(removeCard)
    })
    
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    status.textContent = book.read ? 'read' : 'not read yet'
    card.appendChild(title)
    card.appendChild(author)
    card.appendChild(pages)
    card.appendChild(status)
    card.appendChild(remove)
    container.appendChild(card)
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    let status = this.read ? "read" : 'not read yet';
    return `${this.title} by ${this.author}, ${this.pages} pages, ${status}`;
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const harryPotter = new Book('Harry Potter', 'J.K. Rowling', 300, true);

addBookToLibrary(theHobbit);
addBookToLibrary(harryPotter)

displayLibrary()