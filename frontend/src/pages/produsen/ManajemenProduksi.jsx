// frontend/src/pages/produsen/ManajemenProduksi.jsx
import React, { useState, useEffect } from 'react';
import SidebarProdusen from './SidebarProdusen';
import NavbarProdusen from './NavbarProdusen';
import { useNavigate } from 'react-router-dom';

const ManajemenProduksi = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [produksiData, setProduksiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Silakan login terlebih dahulu');
  
        const response = await fetch('http://localhost:5000/api/produksi/jadwal', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Gagal mengambil data: ${response.status} - ${errorText}`);
        }
  
        const result = await response.json();
        if (!result.success) throw new Error(result.message);
        setProduksiData(result.data || []);
      } catch (error) {
        setError(error.message);
        if (error.message.includes('login')) navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAddProduction = () => {
    navigate('/produsen/produksi/tambah');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/produksi/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Gagal menghapus data');
      const result = await response.json();
      if (result.success) {
        setProduksiData(produksiData.filter(item => item.id !== id));
        alert('Data berhasil dihapus');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredData = produksiData.filter(item => {
    const batchId = item.batch_id ? item.batch_id.toLowerCase() : '';
    const namaObat = item.nama_obat ? item.nama_obat.toLowerCase() : '';
    return (
      batchId.includes(searchTerm.toLowerCase()) ||
      namaObat.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarProdusen isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        <NavbarProdusen onLogout={handleLogout} />
        <div className="pt-16 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manajemen Produksi</h1>
            <button
              onClick={handleAddProduction}
              className="bg-[#18A375] hover:bg-[#158c63] text-white py-2 px-4 rounded flex items-center"
            >
              <span>+ Jadwalkan Produksi</span>
            </button>
          </div>

          {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex border-b">
              <button className="py-3 px-6 text-center border-b-2 border-[#18A375] text-[#18A375] font-medium">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Jadwal Produksi
                </div>
              </button>
              <button
                className="py-3 px-6 text-center text-gray-600 hover:text-[#18A375]"
                onClick={() => navigate('/produsen/riwayat-produksi')}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Riwayat Produksi
                </div>
              </button>
            </div>

            {/* <div className="p-4 border-b">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#18A375]"
                  placeholder="Cari batch atau nama obat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div> */}

            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-4 text-center">Loading...</div>
              ) : filteredData.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  {searchTerm ? "Tidak ada data yang sesuai dengan pencarian" : "Tidak ada data jadwal produksi"}
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Obat</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Produksi</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Kadaluarsa</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioritas</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dokumen BPOM</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.batch_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nama_obat}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.tanggal_produksi).toLocaleDateString('id-ID')}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.tanggal_kadaluarsa).toLocaleDateString('id-ID')}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.jumlah} pcs</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.prioritas === 'High' ? 'bg-red-100 text-red-800' : item.prioritas === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                            {item.prioritas}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Selesai' ? 'bg-[#18A375]/20 text-[#18A375]' : item.status === 'Dalam Produksi' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.dokumen_bpom ? (
                            <a href={`http://localhost:5000/${item.dokumen_bpom}`} target="_blank" rel="noopener noreferrer" className="text-[#18A375] hover:text-[#158c63]">
                              Lihat Dokumen
                            </a>
                          ) : 'Tidak ada'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button onClick={() => navigate(`/produsen/produksi/detail/${item.id}`)} className="text-[#18A375] hover:text-[#158c63]">Detail</button>
                            <button onClick={() => navigate(`/produsen/produksi/edit/${item.id}`)} className="text-yellow-600 hover:text-yellow-900">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">Hapus</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenProduksi;