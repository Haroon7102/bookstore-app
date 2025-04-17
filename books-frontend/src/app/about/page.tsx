import Link from "next/link";
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-pink-100 p-6">
      <nav className="flex justify-between items-center mb-6 p-4 bg-white rounded shadow">
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
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">About Us</h1>
        <p className="text-gray-700 leading-relaxed">
          Welcome to Book Store! This app allows you to manage your book
          collection with ease. Add, edit, or remove books as needed. Perfect
          for avid readers and collectors!
        </p>
      </div>
    </div>
  );
}
