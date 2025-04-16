import { useState } from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';

export default function Home() {
    const [refresh, setRefresh] = useState(false);
    const triggerRefresh = () => setRefresh(!refresh);

    return (
        <div className="max-w-xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-6">📘 Book Manager</h1>
            <BookForm onAdd={triggerRefresh} />
            <BookList refresh={refresh} />
        </div>
    );
}
