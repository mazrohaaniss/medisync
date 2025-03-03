import { useEffect, useState } from 'react';


function ApotekDashboard() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) setUsername(storedUsername);
    }, []);

    return (
        <div className="container">
            <h1>Dashboard Apotek</h1>
            <p>Selamat datang, {username || 'Apotek'}! Anda dapat mengelola penjualan obat di sini.</p>
        </div>
    );
}

export default ApotekDashboard;