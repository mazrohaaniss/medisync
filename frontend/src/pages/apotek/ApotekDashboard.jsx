import React, { useEffect, useState } from 'react';

const ApotekDashboard = () => {
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Paracetamol', batch: 'B001', stock: 120, expiry: '2025-12-31' },
    { id: 2, name: 'Amoxicillin', batch: 'B002', stock: 85, expiry: '2025-06-30' },
    { id: 3, name: 'Omeprazole', batch: 'B003', stock: 42, expiry: '2026-03-15' },
    { id: 4, name: 'Cetirizine', batch: 'B004', stock: 63, expiry: '2025-09-30' },
    { id: 5, name: 'Metformin', batch: 'B005', stock: 94, expiry: '2025-08-22' }
  ]);
  
  const [orders, setOrders] = useState([
    { id: 1, date: '2025-02-28', medicine: 'Paracetamol', batch: 'B001', quantity: 50, status: 'Diterima', supplier: 'PBF Medika' },
    { id: 2, date: '2025-03-01', medicine: 'Amoxicillin', batch: 'B002', quantity: 30, status: 'Diproses', supplier: 'PBF Farma' },
    { id: 3, date: '2025-03-02', medicine: 'Omeprazole', batch: 'B003', quantity: 25, status: 'Dikirim', supplier: 'PBF Sehat' }
  ]);
  
  const [salesData, setSalesData] = useState([
    { id: 1, medicine: 'Paracetamol', quantity: 10, total: 50000 },
    { id: 2, medicine: 'Amoxicillin', quantity: 5, total: 75000 },
    { id: 3, medicine: 'Omeprazole', quantity: 3, total: 90000 }
  ]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const getExpiryStatus = (date) => {
    const today = new Date();
    const expiryDate = new Date(date);
    const diffMonths = (expiryDate - today) / (1000 * 60 * 60 * 24 * 30);
    
    if (diffMonths < 3) return 'bg-red-100 text-red-800';
    if (diffMonths < 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Menunggu konfirmasi': return 'bg-blue-100 text-blue-800';
      case 'Diproses': return 'bg-yellow-100 text-yellow-800';
      case 'Dikirim': return 'bg-purple-100 text-purple-800';
      case 'Diterima': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1.586l-1.707-1.707A1 1 0 0011.293 2h-2.586a1 1 0 00-.707.293L6.293 4H4zm5 5a1 1 0 10-2 0v4a1 1 0 102 0V9zm6 0a1 1 0 10-2 0v4a1 1 0 102 0V9z" clipRule="evenodd" />
            </svg>
            <h1 className="text-2xl font-bold">PharmaSistem</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">{username || 'Apotek'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center border-l-4 border-blue-500">
            <div className="bg-blue-100 rounded-full p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Stok Obat</p>
              <p className="text-2xl font-bold text-gray-800">{medicines.reduce((acc, med) => acc + med.stock, 0)}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex items-center border-l-4 border-green-500">
            <div className="bg-green-100 rounded-full p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Penjualan</p>
              <p className="text-2xl font-bold text-gray-800">Rp {salesData.reduce((acc, sale) => acc + sale.total, 0).toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex items-center border-l-4 border-yellow-500">
            <div className="bg-yellow-100 rounded-full p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pesanan Aktif</p>
              <p className="text-2xl font-bold text-gray-800">{orders.filter(o => o.status !== 'Diterima').length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex items-center border-l-4 border-red-500">
            <div className="bg-red-100 rounded-full p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Obat Kedaluwarsa Segera</p>
              <p className="text-2xl font-bold text-gray-800">{medicines.filter(m => new Date(m.expiry) - new Date() < 90 * 24 * 60 * 60 * 1000).length}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 bg-white rounded-lg shadow-md">
          <div className="flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`flex-grow px-4 py-3 text-center font-medium ${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('stock')} 
              className={`flex-grow px-4 py-3 text-center font-medium ${activeTab === 'stock' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
            >
              Stok Obat
            </button>
            <button 
              onClick={() => setActiveTab('order')} 
              className={`flex-grow px-4 py-3 text-center font-medium ${activeTab === 'order' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
            >
              Pesan Obat
            </button>
            <button 
              onClick={() => setActiveTab('history')} 
              className={`flex-grow px-4 py-3 text-center font-medium ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
            >
              Riwayat Pembelian
            </button>
            <button 
              onClick={() => setActiveTab('sales')} 
              className={`flex-grow px-4 py-3 text-center font-medium ${activeTab === 'sales' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
            >
              Penjualan
            </button>
            <button 
              onClick={() => setActiveTab('reports')} 
              className={`flex-grow px-4 py-3 text-center font-medium ${activeTab === 'reports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
            >
              Laporan & Analitik
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Stok Obat Terbaru</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Obat</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kedaluwarsa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {medicines.slice(0, 3).map((medicine) => (
                      <tr key={medicine.id}>
                        <td className="px-4 py-3 text-sm text-gray-900">{medicine.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{medicine.batch}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{medicine.stock}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${getExpiryStatus(medicine.expiry)}`}>
                            {new Date(medicine.expiry).toLocaleDateString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Pesanan Terbaru</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Obat</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-4 py-3 text-sm text-gray-500">{order.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{order.medicine}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{order.quantity}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stock' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Manajemen Stok Obat</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tambah Obat
              </button>
            </div>
            <div className="mb-4">
              <div className="flex">
                <div className="relative flex-grow">
                  <input 
                    type="text"
                    placeholder="Cari obat..." 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute left-3 top-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Obat</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor Batch</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Kedaluwarsa</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {medicines.map((medicine) => (
                    <tr key={medicine.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{medicine.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{medicine.batch}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{medicine.stock}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${getExpiryStatus(medicine.expiry)}`}>
                          {new Date(medicine.expiry).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'order' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-6 text-gray-800">Pemesanan Obat ke PBF</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Nama Apotek</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nama Apotek" 
                    value={username || 'Apotek'}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Alamat Apotek</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Alamat lengkap apotek"
                    rows="3"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">PBF Tujuan</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>PBF Medika</option>
                    <option>PBF Farma</option>
                    <option>PBF Sehat</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Nama Obat</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Pilih Obat</option>
                    <option>Paracetamol</option>
                    <option>Amoxicillin</option>
                    <option>Omeprazole</option>
                    <option>Cetirizine</option>
                    <option>Metformin</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Jumlah</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Jumlah obat" 
                    min="1"
                  />
                </div>
                <div className="mt-6 text-right">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Kirim Pesanan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-6 text-gray-800">Penjualan Obat ke Konsumen</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Tambah Obat</label>
                  <div className="flex space-x-2">
                    <select className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Pilih Obat</option>
                      <option>Paracetamol</option>
                      <option>Amoxicillin</option>
                      <option>Omeprazole</option>
                      <option>Cetirizine</option>
                      <option>Metformin</option>
                    </select>
                    <input 
                      type="number" 
                      className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Qty" 
                      min="1"
                    />
                    <button className="bg-blue-600 text-white px-3 py-2 rounded-md">
                      Tambah
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Obat</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {salesData.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.medicine}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">Rp {(item.total/item.quantity).toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">Rp {item.total.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm">
                            <button className="text-red-600 hover:text-red-800">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-4">Ringkasan Transaksi</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">Rp {salesData.reduce((acc, item) => acc + item.total, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pajak:</span>
                    <span className="font-medium">Rp {Math.round(salesData.reduce((acc, item) => acc + item.total, 0) * 0.1).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="text-gray-800 font-medium">Total:</span>
                    <span className="text-blue-600 font-bold">Rp {Math.round(salesData.reduce((acc, item) => acc + item.total, 0) * 1.1).toLocaleString()}</span>
                  </div>
                </div>
                <button className="w-full bg-green-600 text-white font-medium py-2 rounded-lg mb-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Proses Pembayaran
                </button>
                <button className="w-full bg-blue-100 text-blue-600 font-medium py-2 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  Scan QR Code
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-6 text-gray-800">Riwayat Pembelian dari PBF</h2>
            <div className="mb-4 flex flex-wrap gap-3">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Cari transaksi..." 
                  className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute left-3 top-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Semua Status</option>
                <option>Menunggu Konfirmasi</option>
                <option>Diproses</option>
                <option>Dikirim</option>
                <option>Diterima</option>
              </select>
              <input 
                type="date"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Obat</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PBF</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-4 py-3 text-sm text-gray-500">{order.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{order.medicine}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{order.batch}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{order.quantity}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{order.supplier}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button className="text-blue-600 hover:text-blue-800">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-6 text-gray-800">Laporan & Analitik</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="col-span-2">
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-gray-800 mb-4">Trend Penjualan Obat (6 bulan terakhir)</h3>
                  <div className="h-64 flex items-end space-x-2">
                    <div className="flex-grow h-1/4 bg-blue-400 rounded-t-md relative">
                      <span className="absolute bottom-full w-full text-center text-xs text-gray-600">Sep</span>
                    </div>
                    <div className="flex-grow h-2/5 bg-blue-500 rounded-t-md relative">
                      <span className="absolute bottom-full w-full text-center text-xs text-gray-600">Okt</span>
                    </div>
                    <div className="flex-grow h-1/3 bg-blue-400 rounded-t-md relative">
                      <span className="absolute bottom-full w-full text-center text-xs text-gray-600">Nov</span>
                    </div>
                    <div className="flex-grow h-3/5 bg-blue-500 rounded-t-md relative">
                      <span className="absolute bottom-full w-full text-center text-xs text-gray-600">Des</span>
                    </div>
                    <div className="flex-grow h-3/4 bg-blue-600 rounded-t-md relative">
                      <span className="absolute bottom-full w-full text-center text-xs text-gray-600">Jan</span>
                    </div>
                    <div className="flex-grow h-full bg-blue-700 rounded-t-md relative">
                      <span className="absolute bottom-full w-full text-center text-xs text-gray-600">Feb</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-4">Obat Terlaris</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">Paracetamol</span>
                        <span className="text-sm font-medium text-gray-700">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">Amoxicillin</span>
                        <span className="text-sm font-medium text-gray-700">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">Omeprazole</span>
                        <span className="text-sm font-medium text-gray-700">30%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">Cetirizine</span>
                        <span className="text-sm font-medium text-gray-700">25%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-gray-800 mb-4">Obat Mendekati Kedaluwarsa</h3>
                  <div className="space-y-4">
                    {medicines
                      .filter(m => new Date(m.expiry) - new Date() < 90 * 24 * 60 * 60 * 1000)
                      .map(medicine => (
                        <div key={medicine.id} className="flex items-center space-x-3">
                          <div className="bg-red-100 rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium text-gray-800">{medicine.name}</p>
                            <p className="text-sm text-red-600">Kedaluwarsa: {new Date(medicine.expiry).toLocaleDateString()}</p>
                          </div>
                          <div className="text-sm font-medium text-gray-500">
                            {medicine.stock} unit
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-4">Prediksi Kebutuhan Stok</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-gray-800">Paracetamol</p>
                        <p className="text-sm text-gray-600">Direkomendasikan tambah stok</p>
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        +150 unit
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-yellow-100 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-gray-800">Amoxicillin</p>
                        <p className="text-sm text-gray-600">Stok menipis</p>
                      </div>
                      <div className="text-sm font-medium text-yellow-600">
                        +80 unit
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Unduh Laporan Bulanan
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Ekspor Data ke Excel
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default ApotekDashboard;