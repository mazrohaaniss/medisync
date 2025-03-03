import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PilihRole from './pages/PilihRole';
import Login from './pages/Login';
import Register from './pages/Register';
import ProdusenDashboard from './pages/dashboard/ProdusenDashboard';
import PBFDashboard from './pages/dashboard/PBFDashboard';
import ApotekDashboard from './pages/dashboard/ApotekDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/roles" element={<PilihRole />} />
                <Route path="/login/:role" element={<Login />} />
                <Route path="/register/:role" element={<Register />} />
                <Route path="/dashboard/produsen" element={<ProdusenDashboard />} />
                <Route path="/dashboard/pbf" element={<PBFDashboard />} />
                <Route path="/dashboard/apotek" element={<ApotekDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;