import { fetchBooks } from './api.js';
import { Book } from './interface';
import { openModal, closeModal } from './modal.js';

const modal = document.querySelector('.modal') as HTMLElement;
const closeBtn = document.querySelector('#close-btn') as HTMLElement;
const searchBtn = document.querySelector('#search-btn') as HTMLElement;
const searchInput = document.querySelector('#search-input') as HTMLInputElement;

// Funktion för att öppna modalen med rätt bok
const handleOpenModal = (bookId: number): void => {
    fetchBooks().then((books: Book[]) => {
        const book = books.find(b => b.id === bookId);
        const bookElement = document.querySelector(`#book${bookId}`) as HTMLElement

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
        fetchBooks().then((books: Book[]) => {
            const foundBook = books.find((b) => b.title.toLowerCase().includes(searchTerm));
            if (foundBook) {
                const bookElement = document.querySelector(`#book${foundBook.id}`) as HTMLElement
                openModal(foundBook, bookElement); // Skicka hela bokobjektet
            } else {
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
            bookPreview.innerHTML = ''
        }
    }
});

// Förhindra att modalen stänger om man klickar på själva modalinnehållet
modal.querySelector('.modal-content')?.addEventListener('click', (e) => {
    e.stopPropagation()
});
