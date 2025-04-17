// src/app/pages/index.js
"use client";
import Link from "next/link";
import BookList from "@/components/bookList"; // Make sure this is the correct path
import { useState } from "react";
import { Plus } from "lucide-react";

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const toggleRefresh = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 p-6">
      <nav className="flex justify-between items-center mb-6 p-4 bg-white rounded shadow border-radius: 55px">
        <div className="text-2xl font-bold text-blue-800">Book Store</div>
        <div className="space-x-4">
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <Link href="/about" className="text-blue-600 hover:underline">
            About
          </Link>
          <Link href="/contact" className="text-blue-600 hover:underline">
            Contact Us
          </Link>
        </div>
      </nav>

      <BookList refresh={refresh} onRefresh={toggleRefresh} />

      <Link href="/add">
        <button className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700">
          <Plus size={24} />
        </button>
      </Link>
    </div>
  );
}
