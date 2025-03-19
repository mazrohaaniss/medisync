// frontend/src/pages/produsen/DetailProduksi.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SidebarProdusen from './SidebarProdusen';
import NavbarProdusen from './NavbarProdusen';

const DetailProduksi = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [produksi, setProduksi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Silakan login terlebih dahulu');
        navigate('/login/produsen');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/produksi/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Gagal mengambil data: ${errorText}`);
        }

        const result = await response.json();
        if (!result.success) throw new Error(result.message);
        setProduksi(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login/produsen');
  };

  const handleBack = () => {
    navigate('/produsen/manajemen-produksi');
  };

  const handleDocumentError = () => {
    alert('Dokumen tidak ditemukan atau tidak dapat diakses.');
  };

  if (isLoading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  if (!produksi) return <div className="p-6 text-center text-gray-500">Data tidak ditemukan</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarProdusen isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        <NavbarProdusen onLogout={handleLogout} />
        <div className="pt-16 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Detail Produksi</h1>
            <button
              onClick={handleBack}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Kembali
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Batch ID</label>
                <p className="mt-1 text-gray-900">{produksi.batch_id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Obat</label>
                <p className="mt-1 text-gray-900">{produksi.nama_obat}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jumlah Produk</label>
                <p className="mt-1 text-gray-900">{produksi.jumlah} pcs</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tanggal Produksi</label>
                <p className="mt-1 text-gray-900">{new Date(produksi.tanggal_produksi).toLocaleDateString('id-ID')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tanggal Kadaluarsa</label>
                <p className="mt-1 text-gray-900">{new Date(produksi.tanggal_kadaluarsa).toLocaleDateString('id-ID')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Prioritas</label>
                <span
                  className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    produksi.prioritas === 'High'
                      ? 'bg-red-100 text-red-800'
                      : produksi.prioritas === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {produksi.prioritas}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span
                  className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    produksi.status === 'Selesai'
                      ? 'bg-[#18A375]/20 text-[#18A375]'
                      : produksi.status === 'Dalam Produksi'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {produksi.status}
                </span>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Komposisi & Obat</label>
                <p className="mt-1 text-gray-900">{produksi.komposisi_obat || 'Tidak ada'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Dokumen BPOM</label>
                <p className="mt-1 text-gray-900">
                  {produksi.dokumen_bpom ? (
                    <a
                      href={`http://localhost:5000/${produksi.dokumen_bpom}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#18A375] hover:text-[#158c63]"
                      onClick={() => {
                        fetch(`http://localhost:5000/${produksi.dokumen_bpom}`).catch(() => handleDocumentError());
                      }}
                    >
                      Lihat Dokumen
                    </a>
                  ) : (
                    'Tidak ada'
                  )}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dibuat Pada</label>
                <p className="mt-1 text-gray-900">{new Date(produksi.created_at).toLocaleString('id-ID')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Diperbarui Pada</label>
                <p className="mt-1 text-gray-900">{new Date(produksi.updated_at).toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduksi;