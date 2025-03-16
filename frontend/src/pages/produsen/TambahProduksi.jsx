import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarProdusen from './SidebarProdusen';
import NavbarProdusen from './NavbarProdusen';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TambahProduksi = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    namaObat: '',
    jumlah: '',
    tanggalProduksi: null,
    tanggalKadaluarsa: null,
    prioritas: 'High',
    komposisiObat: '',
    dokumenBpom: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, dokumenBpom: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    const formDataToSend = new FormData();
    formDataToSend.append('namaObat', formData.namaObat);
    formDataToSend.append('jumlah', formData.jumlah);
    formDataToSend.append('tanggalProduksi', formData.tanggalProduksi?.toISOString().split('T')[0]);
    formDataToSend.append('tanggalKadaluarsa', formData.tanggalKadaluarsa?.toISOString().split('T')[0]);
    formDataToSend.append('prioritas', formData.prioritas);
    formDataToSend.append('komposisiObat', formData.komposisiObat);
    if (formData.dokumenBpom) {
      formDataToSend.append('dokumen_bpom', formData.dokumenBpom);
    }
  
    try {
      const response = await fetch('/api/produksi', {
        method: 'POST',
        body: formDataToSend,
      });
  
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Gagal menambahkan data produksi');
      }
  
      setSuccess('Data produksi berhasil ditambahkan!');
      setTimeout(() => {
        navigate('/produsen/produksi');
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    navigate('/produsen/produksi');
  };

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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarProdusen isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        <NavbarProdusen onLogout={handleLogout} />
        <div className="pt-16 p-6">
          <h1 className="text-2xl font-bold mb-6">Jadwalkan Produksi Baru</h1>
          
          {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
          {success && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">{success}</div>}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama Obat */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama Obat</label>
                  <input
                    type="text"
                    name="namaObat"
                    value={formData.namaObat}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama obat"
                    className="mt-1 block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#18A375]"
                    required
                  />
                </div>

                {/* Jumlah Produk */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Jumlah Produk</label>
                  <input
                    type="number"
                    name="jumlah"
                    value={formData.jumlah}
                    onChange={handleInputChange}
                    placeholder="Masukkan jumlah produk"
                    className="mt-1 block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#18A375]"
                    required
                  />
                </div>

                {/* Tanggal Produksi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Produksi</label>
                  <DatePicker
                    selected={formData.tanggalProduksi}
                    onChange={(date) => setFormData({ ...formData, tanggalProduksi: date })}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/yy"
                    className="mt-1 block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#18A375]"
                    required
                  />
                </div>

                {/* Tanggal Kadaluarsa */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Kadaluarsa</label>
                  <DatePicker
                    selected={formData.tanggalKadaluarsa}
                    onChange={(date) => setFormData({ ...formData, tanggalKadaluarsa: date })}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/yy"
                    className="mt-1 block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#18A375]"
                    required
                  />
                </div>

                {/* Prioritas */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prioritas</label>
                  <select
                    name="prioritas"
                    value={formData.prioritas}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#18A375]"
                    required
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              {/* Komposisi & Obat */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Komposisi & Obat</label>
                <textarea
                  name="komposisiObat"
                  value={formData.komposisiObat}
                  onChange={handleInputChange}
                  placeholder="Masukkan detail komposisi & dosis"
                  className="mt-1 block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#18A375] h-32"
                />
              </div>

              {/* Dokumen BPOM */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Dokumen BPOM</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="dokumen_bpom"
                        className="relative cursor-pointer rounded-md font-medium text-[#18A375] hover:text-[#158c63] focus-within:outline-none"
                      >
                        <span>Klik untuk upload atau drag and drop</span>
                        <input
                          id="dokumen_bpom"
                          name="dokumen_bpom"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PDF atau DOC (Max 10MB)</p>
                    {formData.dokumenBpom && (
                      <p className="text-sm text-gray-600 mt-2">File: {formData.dokumenBpom.name}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#18A375] text-white rounded-lg hover:bg-[#158c63]"
              >
                Jadwalkan Produksi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahProduksi;