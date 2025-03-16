import React, { useState, useEffect } from 'react';
import SidebarProdusen from './SidebarProdusen';
import NavbarProdusen from './NavbarProdusen';
import { useNavigate } from 'react-router-dom';

const MonitoringStok = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('stok_gudang');
  const [stokData, setStokData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua_status');

  // Fetch data berdasarkan tab aktif
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token'); // Opsional, hapus jika autentikasi tidak diperlukan
        if (!token) {
          throw new Error('Token tidak ditemukan. Silakan login ulang.');
        }

        // Tentukan endpoint berdasarkan tab aktif
        const endpointMap = {
          stok_gudang: '/api/stok/gudang',
          riwayat_distribusi: '/api/stok/riwayat-distribusi',
        };
        const endpoint = endpointMap[activeTab] || '/api/stok/gudang';

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
        console.log('Data dari API (Stok):', result); // Debugging
        const data = result.data || [];
        setStokData(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

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

  const filteredData = stokData.filter(item => {
    const batchId = item.batch_id ? item.batch_id.toLowerCase() : '';
    const namaObat = item.nama_obat ? item.nama_obat.toLowerCase() : '';
    const statusMatch =
      statusFilter === 'semua_status' ||
      (statusFilter === 'tersedia' && item.status === 'Tersedia') ||
      (statusFilter === 'menipis' && item.status === 'Menipis');
    return (
      (batchId.includes(searchTerm.toLowerCase()) || namaObat.includes(searchTerm.toLowerCase())) &&
      statusMatch
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
          <h1 className="text-2xl font-bold mb-6">Monitoring Stok</h1>

          {/* Statistik Kartu */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Stok</p>
                <p className="text-2xl font-bold">10,284</p>
              </div>
              <span className="text-green-500 flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7 7 7-7"></path>
                </svg>
                +12.5%
              </span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Distribusi Bulan Ini</p>
                <p className="text-2xl font-bold">1,284</p>
              </div>
              <span className="text-green-500 flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7 7 7-7"></path>
                </svg>
                +12.5%
              </span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Stok Menipis</p>
                <p className="text-2xl font-bold">1,284</p>
              </div>
              <span className="text-red-500 flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7-7-7 7"></path>
                </svg>
                +12.5%
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b">
              <button
                className={`py-3 px-6 text-center ${
                  activeTab === 'stok_gudang'
                    ? 'border-b-2 border-[#18A375] text-[#18A375] font-medium'
                    : 'text-gray-600 hover:text-[#18A375]'
                }`}
                onClick={() => setActiveTab('stok_gudang')}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 6h18M3 14h18M3 18h18"></path>
                  </svg>
                  Stok Gudang
                </div>
              </button>
              <button
                className={`py-3 px-6 text-center ${
                  activeTab === 'riwayat_distribusi'
                    ? 'border-b-2 border-[#18A375] text-[#18A375] font-medium'
                    : 'text-gray-600 hover:text-[#18A375]'
                }`}
                onClick={() => setActiveTab('riwayat_distribusi')}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Riwayat Distribusi
                </div>
              </button>
            </div>

            {/* Filter Section */}
            <div className="p-4 border-b flex justify-between items-center">
              <div className="relative w-1/3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#18A375]"
                  placeholder="Cari stok..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#18A375]"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="semua_status">Semua status</option>
                <option value="tersedia">Tersedia</option>
                <option value="menipis">Menipis</option>
              </select>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-4 text-center">Loading...</div>
              ) : filteredData.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  {searchTerm ? "Tidak ada data yang sesuai dengan pencarian" : "Tidak ada data stok"}
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Obat</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exp. Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufaktur</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.batch_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nama_obat}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.stok}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.exp_date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              item.status === 'Menipis'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-[#18A375]/20 text-[#18A375]'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.manufaktur}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => navigate(`/produsen/stok/detail/${item.id}`)}
                            className="text-[#18A375] hover:text-[#158c63]"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                          </button>
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

export default MonitoringStok;