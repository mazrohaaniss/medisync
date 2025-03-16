import React, { useState, useEffect } from 'react';
import SidebarProdusen from './SidebarProdusen';
import NavbarProdusen from './NavbarProdusen';
import { useNavigate } from 'react-router-dom';

const RiwayatProduksi = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [produksiData, setProduksiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data untuk riwayat produksi
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token'); // Opsional, hapus jika autentikasi tidak diperlukan
        if (!token) {
          throw new Error('Token tidak ditemukan. Silakan login ulang.');
        }

        const endpoint = '/api/produksi/riwayat';
        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to fetch data:', response.status, errorText);
          throw new Error(`Gagal mengambil data: ${response.status} ${errorText}`);
        }

        const result = await response.json();
        console.log('Data dari API (Riwayat):', result); // Debugging
        const data = result.data || [];
        setProduksiData(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      navigate('/');
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
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <NavbarProdusen onLogout={handleLogout} />
        <div className="pt-16 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Riwayat Produksi</h1>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b">
              <button
                className="py-3 px-6 text-center text-gray-600 hover:text-[#18A375]"
                onClick={() => navigate('/produsen/manajemen-produksi')}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Jadwal Produksi
                </div>
              </button>
              <button
                className="py-3 px-6 text-center border-b-2 border-[#18A375] text-[#18A375] font-medium"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Riwayat Produksi
                </div>
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b">
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
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-4 text-center">Loading...</div>
              ) : filteredData.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  {searchTerm ? "Tidak ada data yang sesuai dengan pencarian" : "Tidak ada data riwayat produksi"}
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
                    {filteredData.map((item) => {
                      const prodDate = new Date(item.tanggal_produksi).toLocaleDateString('id-ID');
                      const expDate = new Date(item.tanggal_kadaluarsa).toLocaleDateString('id-ID');
                      return (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.batch_id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nama_obat}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prodDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.jumlah} pcs</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                item.prioritas === 'High' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {item.prioritas}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                item.status === 'Selesai'
                                  ? 'bg-[#18A375]/20 text-[#18A375]'
                                  : item.status === 'Dalam Produksi'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.dokumen_bpom ? (
                              <a href={`/${item.dokumen_bpom}`} target="_blank" rel="noopener noreferrer" className="text-[#18A375] hover:text-[#158c63]">
                                Lihat Dokumen
                              </a>
                            ) : (
                              'Tidak ada'
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() => navigate(`/produsen/produksi/detail/${item.id}`)}
                              className="text-[#18A375] hover:text-[#158c63]"
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      );
                    })}
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

export default RiwayatProduksi;