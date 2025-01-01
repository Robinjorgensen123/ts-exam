var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchBooks } from './api.js';
import { openModal } from './modal.js';
// Söka efter böcker
export const searchBooks = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield fetchBooks();
        // Filtrera böcker baserat på sökterm
        const matchingBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.year.toString().includes(searchTerm) // För att kunna söka på år
        );
        return matchingBooks;
    }
    catch (error) {
        console.error('Error searching for books:', error);
        return [];
    }
});
// Visa resultat av sökningen i modalen
export const showSearchResults = (books) => {
    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('search-results');
    books.forEach((book) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result-item');
        resultItem.innerText = book.title; // Visa bokens titel
        resultItem.addEventListener('click', () => {
            const bookElement = document.querySelector(`#book${book.id}`);
            openModal(book, bookElement); // Skicka boken till modalen
        });
        resultsContainer.appendChild(resultItem);
    });
    // Lägg till resultatet till modalen
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = ''; // Rensa eventuellt gammalt innehåll
    modalContent.appendChild(resultsContainer);
};
