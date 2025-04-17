// 'use client';
// import { useEffect, useState } from 'react';
// import { getBooks, deleteBook } from '../api/bookService';

// export default function BookList({ refresh }) {
//     const [books, setBooks] = useState([]);

//     useEffect(() => {
//         getBooks().then(res => {
//             console.log(res.data); // Debug the structure
//             setBooks(res.data)
//         });
//     }, [refresh]);

//     const handleDelete = async (id) => {
//         await deleteBook(id);
//         setBooks(books.filter(book => book.id !== id));
//     };

//     return (
//         <div className="mt-6 space-y-3">
//             <h2 className="text-xl font-bold">Book List</h2>
//             {books.length === 0 && <p>No books available.</p>}
//             {books.map((book) => (
//                 <div
//                     key={book._id}
//                     className="flex justify-between items-center border p-4 rounded"
//                 >
//                     <div>
//                         <h3 className="font-semibold">{book.title}</h3>
//                         <p className="text-gray-600">{book.author}</p>
//                     </div>
//                     <button
//                         onClick={() => handleDelete(book._id)}
//                         className="text-red-600 hover:text-red-800"
//                     >
//                         Delete
//                     </button>
//                 </div>
//             ))}

//         </div>
//     );
// }



// Updated BookList.js component to show grid view with interactive card features
import { useState, useEffect } from 'react';
import { getBooks, deleteBook, updateBook } from '../api/bookService';

export default function BookList() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getBooks()
            .then((res) => setBooks(res.data))
            .catch((err) => console.error('Failed to fetch books:', err));
    }, [refresh]);

    const handleCardClick = (book) => {
        setSelectedBook(book);
    };

    const handleDelete = async (id) => {
        try {
            await deleteBook(id);
            setSelectedBook(null);
            setRefresh((prev) => !prev);
        } catch (err) {
            console.error('Failed to delete:', err);
        }
    };

    const handleEditClick = () => {
        setEditForm(selectedBook);
        setShowModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBook(editForm._id || editForm.id, editForm);
            setShowModal(false);
            setSelectedBook(null);
            setRefresh((prev) => !prev);
        } catch (err) {
            console.error('Failed to update:', err);
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditForm((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {books.map((book) => (
                    <div
                        key={book._id || book.id}
                        onClick={() => handleCardClick(book)}
                        className="cursor-pointer rounded-lg shadow-lg bg-white p-4 hover:shadow-2xl transition-all"
                    >
                        {book.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={book.image}
                                alt={book.title}
                                className="rounded mb-2 object-cover h-48 w-full"
                            />
                        )}

                        <h2 className="text-lg font-bold text-black">{book.title}</h2>
                        <h3 className="text-sm text-gray-600">by {book.author}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{book.description}</p>
                    </div>
                ))}
            </div>

            {selectedBook && (
                <div className="mt-6 p-4 border-t border-gray-200">
                    <h2 className="text-2xl font-bold mb-2">{selectedBook.title}</h2>
                    {selectedBook.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={selectedBook.image}
                            alt={selectedBook.title}
                            className="rounded mb-4 w-full max-h-[300px] object-cover"
                        />
                    )}
                    <p className="text-md text-gray-700 mb-2">Author: {selectedBook.author}</p>
                    <p className="text-gray-600 mb-4">{selectedBook.description}</p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => handleDelete(selectedBook._id || selectedBook.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                        <button
                            onClick={handleEditClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4 text-black">Edit Book</h3>
                        <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
                            <input
                                name="title"
                                value={editForm.title}
                                onChange={handleEditChange}
                                placeholder="Title"
                                className="border p-2 rounded text-black"
                                required
                            />
                            <input
                                name="author"
                                value={editForm.author}
                                onChange={handleEditChange}
                                placeholder="Author"
                                className="border p-2 rounded text-black"
                                required
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e)}
                                className="border p-2 rounded text-black"
                            />

                            <textarea
                                name="description"
                                value={editForm.description}
                                onChange={handleEditChange}
                                placeholder="Description"
                                className="border p-2 rounded text-black"
                                rows={4}
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
