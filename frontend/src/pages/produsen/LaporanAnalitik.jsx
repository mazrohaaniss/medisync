import React, { useState, useEffect } from 'react';
import SidebarProdusen from './SidebarProdusen';
import NavbarProdusen from './NavbarProdusen';
import { useNavigate } from 'react-router-dom';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const LaporanAnalitik = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [timeRange, setTimeRange] = useState('6_bulan');
  const [analitikData, setAnalitikData] = useState({
    produksiBulanIni: 0, // Nilai default sebelum data dimuat
    rataWaktuPengiriman: 0,
    efisiensiProduk: 0,
    produksiPerBulan: {
      labels: [],
      datasets: [
        {
          label: 'Jumlah Produksi',
          data: [],
          borderColor: '#18A375',
          backgroundColor: 'rgba(24, 163, 117, 0.2)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Target',
          data: [],
          borderColor: '#888',
          backgroundColor: 'rgba(136, 136, 136, 0.2)',
          fill: false,
          tension: 0.4,
        },
      ],
    },
    stokVsMinimum: {
      labels: [],
      datasets: [
        {
          label: 'Stok Tersedia',
          data: [],
          backgroundColor: '#18A375',
        },
        {
          label: 'Stok Minimum',
          data: [],
          backgroundColor: '#888',
        },
      ],
    },
    rataWaktuPengirimanData: {
      labels: [],
      datasets: [
        {
          label: 'Rata-rata Waktu',
          data: [],
          borderColor: '#18A375',
          backgroundColor: 'rgba(24, 163, 117, 0.2)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Target',
          data: [],
          borderColor: '#888',
          backgroundColor: 'rgba(136, 136, 136, 0.2)',
          fill: false,
          tension: 0.4,
        },
      ],
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data (simulasi dengan data dummy untuk saat ini)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulasi data dummy (ganti dengan API call saat tersedia)
        const dummyData = {
          produksiBulanIni: 10284,
          rataWaktuPengiriman: 1284,
          efisiensiProduk: 95,
          produksiPerBulan: {
            labels: ['Sep 2023', 'Okt 2023', 'Nov 2023', 'Des 2023', 'Jan 2024', 'Feb 2024'],
            datasets: [
              {
                label: 'Jumlah Produksi',
                data: [8000, 9000, 10000, 11000, 12000, 13000],
                borderColor: '#18A375',
                backgroundColor: 'rgba(24, 163, 117, 0.2)',
                fill: true,
                tension: 0.4,
              },
              {
                label: 'Target',
                data: [9000, 9500, 10000, 10500, 11000, 11500],
                borderColor: '#888',
                backgroundColor: 'rgba(136, 136, 136, 0.2)',
                fill: false,
                tension: 0.4,
              },
            ],
          },
          stokVsMinimum: {
            labels: ['Paracetamol', 'Amoxicillin', 'Omeprazole', 'Simvastatin', 'Metformin'],
            datasets: [
              {
                label: 'Stok Tersedia',
                data: [6000, 4000, 5000, 3000, 4500],
                backgroundColor: '#18A375',
              },
              {
                label: 'Stok Minimum',
                data: [3000, 2000, 2500, 1500, 2000],
                backgroundColor: '#888',
              },
            ],
          },
          rataWaktuPengirimanData: {
            labels: ['Sep 2023', 'Okt 2023', 'Nov 2023', 'Des 2023', 'Jan 2024', 'Feb 2024'],
            datasets: [
              {
                label: 'Rata-rata Waktu',
                data: [2.5, 2.6, 2.7, 2.6, 2.5, 2.4],
                borderColor: '#18A375',
                backgroundColor: 'rgba(24, 163, 117, 0.2)',
                fill: true,
                tension: 0.4,
              },
              {
                label: 'Target',
                data: [2.5, 2.5, 2.5, 2.5, 2.5, 2.5],
                borderColor: '#888',
                backgroundColor: 'rgba(136, 136, 136, 0.2)',
                fill: false,
                tension: 0.4,
              },
            ],
          },
        };
        setAnalitikData(dummyData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

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

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

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
            <h1 className="text-2xl font-bold">Laporan & Analitik</h1>
            <div className="flex space-x-2">
              <select
                className="border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#18A375]"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="6_bulan">6 Bulan</option>
                <option value="12_bulan">12 Bulan</option>
                <option value="tahun_ini">Tahun Ini</option>
              </select>
              <button className="bg-[#18A375] hover:bg-[#158c63] text-white py-2 px-4 rounded">
                Filter
              </button>
            </div>
          </div>

          {/* Statistik Kartu */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Produksi Bulan Ini</p>
                <p className="text-2xl font-bold">{analitikData.produksiBulanIni}</p>
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
                <p className="text-gray-500 text-sm">Rata-rata Waktu Pengiriman (Hari)</p>
                <p className="text-2xl font-bold">{analitikData.rataWaktuPengiriman}</p>
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
                <p className="text-gray-500 text-sm">Efisiensi Produk</p>
                <p className="text-2xl font-bold">{analitikData.efisiensiProduk}%</p>
              </div>
              <span className="text-green-500 flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7 7 7-7"></path>
                </svg>
                +12.5%
              </span>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Produksi per Bulan</h2>
              <Line
                data={analitikData.produksiPerBulan}
                options={chartOptions}
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Stok Obat vs Minimum</h2>
              <Bar
                data={analitikData.stokVsMinimum}
                options={chartOptions}
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Rata-rata Waktu Pengiriman (Hari)</h2>
            <Line
              data={analitikData.rataWaktuPengirimanData}
              options={chartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporanAnalitik;