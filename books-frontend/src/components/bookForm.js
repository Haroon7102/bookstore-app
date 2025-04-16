import { useState } from 'react';
import { addBook } from '../services/bookService';

export default function BookForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !author) return;

        await addBook({ title, author });
        setTitle('');
        setAuthor('');
        onAdd(); // Refresh list
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
            <h2 className="text-xl font-bold">Add New Book</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border px-3 py-2 rounded"
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full border px-3 py-2 rounded"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Add Book
            </button>
        </form>
    );
}
