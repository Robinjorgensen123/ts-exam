var _a;
import { fetchBooks } from './api.js';
import { openModal } from './modal.js';
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('#close-btn');
const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');
// Funktion för att öppna modalen med rätt bok
const handleOpenModal = (bookId) => {
    fetchBooks().then((books) => {
        const book = books.find(b => b.id === bookId);
        const bookElement = document.querySelector(`#book${bookId}`);
        if (book && bookElement) {
            openModal(book, bookElement); // Skicka hela bokobjektet till openModal
        }
        else {
            alert('Book not found!');
        }
    }).catch((error) => {
        console.error('Error fetching books:', error);
    });
};
// Hämta böckerna och sätt upp event-lyssnare för varje bok
fetchBooks().then((books) => {
    const bookElements = document.querySelectorAll('.book-container article');
    bookElements.forEach((bookElement) => {
        const bookId = parseInt(bookElement.id.replace('book', ''));
        bookElement.addEventListener('click', () => handleOpenModal(bookId));
    });
}).catch((error) => {
    console.error('Error fetching books for event listeners:', error);
});
// Lägg till eventlyssnare för sökknappen
searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        fetchBooks().then((books) => {
            const foundBook = books.find((b) => b.title.toLowerCase().includes(searchTerm));
            if (foundBook) {
                const bookElement = document.querySelector(`#book${foundBook.id}`);
                openModal(foundBook, bookElement); // Skicka hela bokobjektet
            }
            else {
                alert('The book with this title was not found!');
            }
        }).catch((error) => {
            console.error('Error fetching books:', error);
        });
    }
});
// Lägg till en event-lyssnare på modalen så att man stänger den genom att klicka på oh, i want to read
modal.addEventListener('click', (e) => {
    if (e.target === closeBtn) {
        modal.style.display = 'none';
        const bookPreview = document.querySelector('.book-preview-modal');
        if (bookPreview) {
            bookPreview.innerHTML = '';
        }
    }
});
// Förhindra att modalen stänger om man klickar på själva modalinnehållet
(_a = modal.querySelector('.modal-content')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
    e.stopPropagation();
});
