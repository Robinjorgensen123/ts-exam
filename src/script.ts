import { fetchBooks } from './api'
import { Book } from './interface';
import { openModal } from './modal.js';
import { searchBooks } from './search.js';

const modal = document.querySelector('.modal') as HTMLElement;
const closeBtn = document.querySelector('#close-btn') as HTMLElement;
const searchBtn = document.querySelector('#search-btn') as HTMLElement;
const searchInput = document.querySelector('#search-input') as HTMLInputElement;

// Funktion för att öppna modalen med rätt bok
const handleOpenModal = (bookId: number): void => {
    fetchBooks().then((books: Book[]) => {
        const book = books.find(b => b.id === bookId);
        const bookElement = document.querySelector(`#book${bookId}`) as HTMLElement;

        if (book && bookElement) {
            openModal(book, bookElement);  // Skicka hela bokobjektet till openModal
        } else {
            alert('Book not found!');
        }
    }).catch((error) => {
        console.error('Error fetching books:', error);
    });
};

// Hämta böckerna och sätt upp event-lyssnare för varje bok
fetchBooks().then((books: Book[]) => {
    const bookElements = document.querySelectorAll('.book-container article') as NodeListOf<HTMLElement>;

    bookElements.forEach((bookElement) => {
        const bookId = parseInt(bookElement.id.replace('book', ''));
        bookElement.addEventListener('click', () => handleOpenModal(bookId));
    });
}).catch((error) => {
    console.error('Error fetching books for event listeners:', error);
});

// Lägg till eventlyssnare för sökknappen
searchBtn.addEventListener('click', () => {
    const searchTerm: string = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        searchBooks(searchTerm).then((matchingBooks: Book[]) => {
            if (matchingBooks.length > 0) {
                showSearchResults(matchingBooks); // Visa träffarna i en lista
            } else {
                alert('No books found with that term!');
            }
        }).catch((error) => {
            console.error('Error searching books:', error);
        });
    }
});

// Visa resultat av sökningen i modalen
const showSearchResults = (books: Book[]): void => {
    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('search-results');

    books.forEach((book) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result-item');
        resultItem.innerText = book.title;  // Visa bokens titel
        resultItem.addEventListener('click', () => {
            const bookElement = document.querySelector(`#book${book.id}`) as HTMLElement;
            openModal(book, bookElement); // Skicka boken till modalen
        });

        resultsContainer.appendChild(resultItem);
    });

    // Lägg till resultatet till modalen
    const modalContent = document.querySelector('.modal-content') as HTMLElement;
    modalContent.innerHTML = '';  // Rensa eventuellt gammalt innehåll
    modalContent.appendChild(resultsContainer);
};

// Lägg till en event-lyssnare på modalen så att man stänger den genom att klicka på "Oh, I want to read"
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
modal.querySelector('.modal-content')?.addEventListener('click', (e) => e.stopPropagation());
