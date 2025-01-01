import { fetchBooks } from './api.js';
import { Book } from './interface.js';
import { openModal } from './modal.js';

// Söka efter böcker
export const searchBooks = async (searchTerm: string): Promise<Book[]> => {
    try {
        const books = await fetchBooks();

        // Filtrera böcker baserat på sökterm
        const matchingBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.year.toString().includes(searchTerm) // För att kunna söka på år
        );

        return matchingBooks;
    } catch (error) {
        console.error('Error searching for books:', error);
        return [];
    }
};

// Visa resultat av sökningen i modalen
export const showSearchResults = (books: Book[]): void => {
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
