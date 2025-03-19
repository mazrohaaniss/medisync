import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PilihRole from './pages/PilihRole';
import Login from './pages/Login';
import Register from './pages/Register';
import ProdusenDashboard from './pages/produsen/ProdusenDashboard';
import PBFDashboard from './pages/pbf/PbfDashboard';
import ApotekDashboard from './pages/apotek/ApotekDashboard';
import ManajemenProduksi from './pages/produsen/ManajemenProduksi';
import TambahProduksi from './pages/produsen/TambahProduksi';
import RiwayatProduksi from './pages/produsen/RiwayatProduksi';
import PengelolaanPengiriman from './pages/produsen/PengelolaanPengiriman';
import MonitoringStok from './pages/produsen/MonitoringStok';
import LaporanAnalitik from './pages/produsen/LaporanAnalitik';
import EditProduksi from './pages/produsen/EditProduksi';
import DetailProduksi from './pages/produsen/DetailProduksi';

function App() {
    return (
  
        <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/roles" element={<PilihRole />} />
            <Route path="/login/:role" element={<Login />} />
            <Route path="/register/:role" element={<Register />} />
            <Route path="/produsen/dashboard" element={<ProdusenDashboard />} />
            <Route path="/pbf/pbf" element={<PBFDashboard />} />
            <Route path="/apotek/apotek" element={<ApotekDashboard />} />
            <Route path="/produsen/manajemen-produksi" element={<ManajemenProduksi />} />
            <Route path="/produsen/riwayat-produksi" element={<RiwayatProduksi />} />
            <Route path="/produsen/produksi/tambah" element={<TambahProduksi />} />
            <Route path="/produsen/pengelolaan-pengiriman" element={<PengelolaanPengiriman />} />
            <Route path="/produsen/monitoring-stok" element={<MonitoringStok />} />
            <Route path="/produsen/laporan-analitik" element={<LaporanAnalitik />} />
            <Route path="/produsen/produksi/edit/:id" element={<EditProduksi />} />
            <Route path="/produsen/produksi/detail/:id" element={<DetailProduksi />} /> 


        </Routes>
    </Router>

      
    );
}

export default App;