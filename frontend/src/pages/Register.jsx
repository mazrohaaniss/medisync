import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Register() {
    const [form, setForm] = useState({ username: '', password: '' });
    const { role } = useParams(); // Ambil role dari URL
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { ...form, role });
            alert('Registrasi berhasil, silakan login');
            navigate(`/login/${role}`);
        } catch (error) {
            alert(error.response?.data?.message || 'Terjadi kesalahan saat registrasi');
        }
    };

    return (
        <div className="container">
            <h1>Register sebagai {role.charAt(0).toUpperCase() + role.slice(1)}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p>
                Sudah punya akun? <a href={`/login/${role}`}>Login di sini</a>
            </p>
        </div>
    );
}

export default Register;