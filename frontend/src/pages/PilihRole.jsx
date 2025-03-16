import { Link } from 'react-router-dom';

function PilihRole() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-green-600 mb-2">Selamat Datang</h1>
        <div className="w-64 h-1 bg-green-600 mx-auto mb-6"></div>
        <p className="text-gray-800 max-w-2xl mx-auto">
          Pilih peran Anda untuk mengakses dashboard dan mulai mengelola data farmasi
          dengan mudah
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Link to="/login/produsen" className="group">
          <div className="border border-gray-200 rounded-lg p-8 h-full flex flex-col items-center justify-center transition-all hover:shadow-lg hover:border-green-500 bg-white">
            <div className="text-green-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Produsen</h2>
            <p className="text-center text-gray-600">
              Manufaktur dan produksi obat-obatan
            </p>
          </div>
        </Link>

        <Link to="/login/pbf" className="group">
          <div className="border border-gray-200 rounded-lg p-8 h-full flex flex-col items-center justify-center transition-all hover:shadow-lg hover:border-green-500 bg-white">
            <div className="text-green-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Pedagang Besar Farmasi (PBF)</h2>
            <p className="text-center text-gray-600">
              Distribusi dan penyaluran produk farmasi
            </p>
          </div>
        </Link>

        <Link to="/login/apotek" className="group">
          <div className="border border-gray-200 rounded-lg p-8 h-full flex flex-col items-center justify-center transition-all hover:shadow-lg hover:border-green-500 bg-white">
            <div className="text-green-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Apotek</h2>
            <p className="text-center text-gray-600">
              Pelayanan obat dan konsultasi farmasi
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PilihRole;