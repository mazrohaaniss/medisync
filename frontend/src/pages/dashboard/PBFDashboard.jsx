import { useEffect, useState } from 'react';


function PBFDashboard() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) setUsername(storedUsername);
    }, []);

    return (
        <div className="container">
            <h1>Dashboard PBF</h1>
            <p>Selamat datang, {username || 'PBF'}! Anda dapat mengelola distribusi obat di sini.</p>
        </div>
    );
}

export default PBFDashboard;