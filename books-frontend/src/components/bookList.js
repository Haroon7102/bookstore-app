import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/bookService';

export default function BookList({ refresh }) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks().then(res => setBooks(res.data));
    }, [refresh]);

    const handleDelete = async (id) => {
        await deleteBook(id);
        setBooks(books.filter(book => book.id !== id));
    };

    return (
        <div className="mt-6 space-y-3">
            <h2 className="text-xl font-bold">Book List</h2>
            {books.length === 0 && <p>No books available.</p>}
            {books.map((book) => (
                <div
                    key={book.id}
                    className="flex justify-between items-center border p-4 rounded"
                >
                    <div>
                        <h3 className="font-semibold">{book.title}</h3>
                        <p className="text-gray-600">{book.author}</p>
                    </div>
                    <button
                        onClick={() => handleDelete(book.id)}
                        className="text-red-600 hover:text-red-800"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
