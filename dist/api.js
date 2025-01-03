// modal för api anropet
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const fetchBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
        // Kontrollera om svaret är okej (statuskod 200)
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
        }
        // Logga svaret för att verifiera att vi får rätt data
        const responseData = yield response.json();
        console.log("Response Data:", responseData);
        // Returnera böckerna
        return responseData;
    }
    catch (error) {
        // Logga eventuella fel som kan uppstå
        console.error("Failed to fetch books:", error);
        return [];
    }
});
// Testa API-anropet för att se om vi får korrekt data
fetchBooks().then((books) => {
    console.log("Fetched Books:", books); // Loggar hela listan med böcker
}).catch(error => {
    console.error("Error in fetchBooks:", error);
});
