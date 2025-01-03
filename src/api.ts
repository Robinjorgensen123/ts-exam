// modal för api anropet

import { Book } from './interface.js';

export const fetchBooks = async (): Promise<Book[]> => {
    try {
        const response = await fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
        
        // Kontrollera om svaret är okej (statuskod 200)
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
        }

        // Logga svaret för att verifiera att vi får rätt data
        const responseData:Book [] = await response.json();
        console.log("Response Data:", responseData);

        // Returnera böckerna
        return responseData;
    } catch (error) {
        // Logga eventuella fel som kan uppstå
        console.error("Failed to fetch books:", error);
        return [];
    }
};

// Testa API-anropet för att se om vi får korrekt data
fetchBooks().then((books) => {
    console.log("Fetched Books:", books); // Loggar hela listan med böcker
}).catch(error => {
    console.error("Error in fetchBooks:", error);
});
