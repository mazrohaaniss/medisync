import React, { useState, useEffect } from 'react';
import SidebarProdusen from './SidebarProdusen';
import NavbarProdusen from './NavbarProdusen';
import { useNavigate } from 'react-router-dom';

const PengelolaanPengiriman = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('semua');
  const [pengirimanData, setPengirimanData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState(''); // Untuk dropdown urutkan
  const [dateRange, setDateRange] = useState(''); // Untuk date picker

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
          semua: '/api/pengiriman/semua',
          perlu_dikirim: '/api/pengiriman/perlu-dikirim',
          dikirim: '/api/pengiriman/dikirim',
          selesai: '/api/pengiriman/selesai',
          pembatalan: '/api/pengiriman/pembatalan',
        };
        const endpoint = endpointMap[activeTab] || '/api/pengiriman/semua';

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
        console.log('Data dari API (Pengiriman):', result); // Debugging
        const data = result.data || [];
        setPengirimanData(data);
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

  const filteredData = pengirimanData.filter(item => {
    const idPesanan = item.id_pesanan ? item.id_pesanan.toLowerCase() : '';
    const pesananProduk = item.pesanan_produk ? item.pesanan_produk.toLowerCase() : '';
    return (
      idPesanan.includes(searchTerm.toLowerCase()) ||
      pesananProduk.includes(searchTerm.toLowerCase())
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
            <h1 className="text-2xl font-bold">Pengelolaan Pengiriman</h1>
            <div className="flex space-x-2">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
              >
                Atur Pengiriman Massal
              </button>
              <button
                className="bg-[#18A375] hover:bg-[#158c63] text-white py-2 px-4 rounded flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 6h18M3 14h18M3 18h18"></path>
                </svg>
                Pengiriman Massal
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b">
              {['Semua', 'Perlu Dikirim', 'Dikirim', 'Selesai', 'Pembatalan'].map(tab => (
                <button
                  key={tab}
                  className={`py-3 px-6 text-center ${
                    activeTab === tab.toLowerCase().replace(' ', '_')
                      ? 'border-b-2 border-[#18A375] text-[#18A375] font-medium'
                      : 'text-gray-600 hover:text-[#18A375]'
                  }`}
                  onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '_'))}
                >
                  {tab}
                </button>
              ))}
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
                  placeholder="Cari batch atau nama obat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <select
                  className="border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#18A375]"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Urutkan</option>
                  <option value="terbaru">Terbaru</option>
                  <option value="terlama">Terlama</option>
                </select>
                <input
                  type="text"
                  className="border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#18A375]"
                  placeholder="Waktu Pesanan Dibuat"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)} // Ganti dengan date picker library jika perlu
                />
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-4 text-center">Loading...</div>
              ) : filteredData.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  {searchTerm ? "Tidak ada data yang sesuai dengan pencarian" : "Tidak ada data pengiriman"}
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Pesanan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pesanan Produk</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Harga</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jasa Kirim</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id_pesanan}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>{item.pesanan_produk}</div>
                          <div className="text-xs text-gray-400">Batch ID: {item.batch_id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.qty}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.total_harga}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              item.status === 'Perlu Dikirim'
                                ? 'bg-yellow-100 text-yellow-800'
                                : item.status === 'Pembatalan'
                                ? 'bg-red-100 text-red-800'
                                : item.status === 'Selesai'
                                ? 'bg-[#18A375]/20 text-[#18A375]'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>{item.jasa_kirim}</div>
                          <div className="text-xs text-gray-400">{item.konfirmasi}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => navigate(`/produsen/pengiriman/atur/${item.id}`)}
                            className="text-[#18A375] hover:text-[#158c63]"
                          >
                            Atur Pengiriman
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

export default PengelolaanPengiriman;