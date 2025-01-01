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
// Funktion för att söka efter böcker
export const searchBooks = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield fetchBooks();
        // Filtrera böcker som matchar titeln, författaren, eller året
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
// Funktion för att visa resultatet av sökningen i en lista
export const showSearchResults = (books) => {
    const searchResultsContainer = document.querySelector('.search-results-container');
    searchResultsContainer.innerHTML = ''; // Rensa tidigare resultat
    books.forEach((book) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result-item');
        resultItem.innerText = `${book.title} by ${book.author}`; // Visa bokens titel och författare
        resultItem.addEventListener('click', () => {
            // När användaren klickar på ett resultat, öppna modalen med den boken
            const bookElement = document.querySelector(`#book${book.id}`);
            openModal(book, bookElement); // Skicka boken till modalen
        });
        searchResultsContainer.appendChild(resultItem);
    });
};
