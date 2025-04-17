"use client";
import { useState } from "react";
import { addBook } from "@/api/bookService"; // adjust path if needed

export default function AddBookPage() {
  const [book, setBook] = useState({
    image: "",
    title: "",
    author: "",
    description: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Convert file to base64
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBook((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addBook(book);
      setSuccessMessage("✅ Book added successfully!");
      setBook({ image: "", title: "", author: "", description: "" });
    } catch (error) {
      console.error("Error adding book:", error);
      setSuccessMessage("❌ Failed to add book.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 p-6 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Add New Book
        </h2>

        {/* File input for base64 image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 border border-gray-300 rounded text-black"
        />

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded text-black"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded text-black"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={book.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded h-24 text-black"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Add Book
        </button>

        {/* Success or Error message */}
        {successMessage && (
          <p className="text-center text-green-600 mt-2">{successMessage}</p>
        )}
      </form>
    </div>
  );
}
