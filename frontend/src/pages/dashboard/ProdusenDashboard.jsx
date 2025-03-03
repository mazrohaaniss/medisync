import { useEffect, useState } from 'react';


function ProdusenDashboard() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) setUsername(storedUsername);
    }, []);

    return (
        <div className="container">
            <h1>Dashboard Produsen</h1>
            <p>Selamat datang, {username || 'Produsen'}! Anda dapat mengelola produksi obat di sini.</p>
        </div>
    );
}

export default ProdusenDashboard;