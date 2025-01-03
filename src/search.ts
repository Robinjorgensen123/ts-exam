// modul för att söka efter böcker

import { fetchBooks } from './api.js';
import { Book } from './interface.js';
import { openModal } from './modal.js';

// Funktion för att söka efter böcker
export const searchBooks = async (searchTerm: string): Promise<Book[]> => {
    try {
        const books = await fetchBooks();

        // Filtrera böcker som matchar titeln, författaren, eller året
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

// Funktion för att visa resultatet av sökningen i en lista
export const showSearchResults = (books: Book[]): void => {
    const searchResultsContainer = document.querySelector('.search-results-container') as HTMLElement;
    searchResultsContainer.innerHTML = '';  // Rensa tidigare resultat

    books.forEach((book) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result-item');
        resultItem.innerText = `${book.title} by ${book.author}`;  // Visa bokens titel och författare
        resultItem.addEventListener('click', () => {
            // När användaren klickar på ett resultat, öppna modalen med den boken
            const bookElement = document.querySelector(`#book${book.id}`) as HTMLElement;
            openModal(book, bookElement);  // Skicka boken till modalen
        });

        searchResultsContainer.appendChild(resultItem);
    });
};
