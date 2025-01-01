var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchBooks } from './api';
export const searchBooks = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield fetchBooks();
        const foundBook = books.find(book => book.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
        return foundBook || null;
    }
    catch (error) {
        console.error('error searching for books:', error);
        return null;
    }
});
