import { fetchBooks } from './api'
import { Book } from './interface'

export const searchBooks = async (searchTerm: string): Promise<Book[]> => {
    try {
        const books = await fetchBooks()

        // Filtrera böcker som matchar titeln, författaren, eller året
        const matchingBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.year.toString().includes(searchTerm) // För att kunna söka på år
        )

        return matchingBooks
    } catch (error) {
        console.error('Error searching for books:', error)
        return []
    }
}