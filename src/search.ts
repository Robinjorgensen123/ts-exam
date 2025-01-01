import { fetchBooks } from './api'
import { Book } from './interface'

export const searchBooks = async (searchTerm: string):Promise<Book | null> => {
    try {
        const books = await fetchBooks()

        const foundBook = books.find(book => book.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()))

        return foundBook || null
    } catch (error) {
        console.error('error searching for books:', error)
        return null
    }
} 