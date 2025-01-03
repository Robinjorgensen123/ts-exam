import { Book } from "./interface.js"


export const openModal = (book: Book, bookElement:HTMLElement): void => {
    const modal = document.querySelector('.modal') as HTMLElement
    const bookPreviewModal = document.querySelector('.book-preview-modal') as HTMLElement

    document.getElementById('title')!.innerText = book.title;
    document.getElementById('author')!.innerText = `By: ${book.author}`
    document.getElementById('plot')!.innerText = `Plot: ${book.plot}`
    document.getElementById('audience')!.innerText = `Audience: ${book.audience}`
    document.getElementById('year')!.innerText = `Year: ${book.year}`
    document.getElementById('pages')!.innerText = `Pages: ${book.pages}`
    document.getElementById('publisher')!.innerText = `Publisher: ${book.publisher}`

    modal.style.display = 'grid'

   const bookClone = bookElement.cloneNode(true) as HTMLElement
    bookClone.classList.add('book-preview-modal')

   bookPreviewModal.innerHTML = ''
   bookPreviewModal.appendChild(bookClone)
};

export const closeModal = (): void => {
    const modal = document.querySelector('.modal') as HTMLElement
    modal.style.display = 'none'
};