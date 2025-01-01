export const openModal = (book, bookElement) => {
    const modal = document.querySelector('.modal');
    const bookPreviewModal = document.querySelector('.book-preview-modal');
    document.getElementById('title').innerText = book.title;
    document.getElementById('author').innerText = `By: ${book.author}`;
    document.getElementById('plot').innerText = `Plot: ${book.plot}`;
    document.getElementById('audience').innerText = `Audience: ${book.audience}`;
    document.getElementById('year').innerText = `Year: ${book.year}`;
    document.getElementById('pages').innerText = `Pages: ${book.pages}`;
    document.getElementById('publisher').innerText = `Publisher: ${book.publisher}`;
    modal.style.display = 'grid';
    const bookClone = bookElement.cloneNode(true);
    bookClone.classList.add('book-preview-modal');
    bookPreviewModal.innerHTML = '';
    bookPreviewModal.appendChild(bookClone);
};
export const closeModal = () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
};
