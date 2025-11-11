import React from 'react';
import StatsCard from '../components/StatsCard';
import RecentActivity from '../components/RecentActivity';
import Charts from '../components/Charts';

// Komponen-komponen ini akan kita buat nanti
// import RecentActivity from '../components/RecentActivity';
// import Charts from '../components/Charts';

const Dashboard = () => {
  // Data dummy untuk statistik
  const stats = [
    { label: 'Total Buku', value: 1200, icon: '📚' },
    { label: 'Anggota Terdaftar', value: 342, icon: '👥' },
    { label: 'Buku Dipinjam', value: 78, icon: '📤' },
    { label: 'Terlambat', value: 12, icon: '⚠️' },
  ];

  const recentActivities = [
    { id: 1, type: 'Borrow', title: 'Peminjaman: Laskar Pelangi', member: 'Andi Saputra', date: '2025-11-09' },
    { id: 2, type: 'Return', title: 'Pengembalian: Bumi Manusia', member: 'Siti Rahma', date: '2025-11-10' },
    { id: 3, type: 'Register', title: 'Anggota baru terdaftar', member: 'Budi Santoso', date: '2025-11-11' },
    { id: 4, type: 'Borrow', title: 'Peminjaman: Negeri 5 Menara', member: 'Rina Putri', date: '2025-11-11' },
  ];

  const monthlyBorrowData = [
    { month: 'Jan', value: 12 },
    { month: 'Feb', value: 18 },
    { month: 'Mar', value: 22 },
    { month: 'Apr', value: 17 },
    { month: 'Mei', value: 25 },
    { month: 'Jun', value: 21 },
    { month: 'Jul', value: 30 },
    { month: 'Agu', value: 27 },
    { month: 'Sep', value: 19 },
    { month: 'Okt', value: 23 },
    { month: 'Nov', value: 28 },
    { month: 'Des', value: 26 },
  ];

  return (
    <div className="bg-gray min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-350">Dashboard</h1>
            <p className="text-sm text-gray-350">Ringkasan aktivitas dan statistik perpustakaan</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <span className="h-2 w-2 bg-emerald-500 rounded-full" />
            <span>Status: Online</span>
          </div>
        </div>

        {/* Bagian Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatsCard icon={stats[0].icon} label={stats[0].label} value={stats[0].value} color="blue" />
          <StatsCard icon={stats[1].icon} label={stats[1].label} value={stats[1].value} color="emerald" />
          <StatsCard icon={stats[2].icon} label={stats[2].label} value={stats[2].value} color="amber" />
          <StatsCard icon={stats[3].icon} label={stats[3].label} value={stats[3].value} color="rose" />
        </div>

        {/* Bagian Aktivitas Terbaru dan Grafik */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Aktivitas Terbaru */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Aktivitas Terbaru</h2>
              <button className="text-xs px-3 py-1 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">Lihat semua</button>
            </div>
            <RecentActivity items={recentActivities} />
          </div>

          Kolom Grafik
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Statistik Peminjaman</h2>
            <Charts data={monthlyBorrowData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;