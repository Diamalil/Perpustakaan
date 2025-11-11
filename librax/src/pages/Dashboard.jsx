import React from 'react';
import StatsCard from '../components/StatsCard';
import RecentActivity from '../components/RecentActivity';
import Charts from '../components/Charts';
import { useDatabase, useStatistics } from '../hooks/useDatabase';

const Dashboard = () => {
  const { isLoading: dbLoading, error: dbError } = useDatabase();
  const { statistics, isLoading: statsLoading, error: statsError } = useStatistics();

  // Show loading state while database is initializing
  if (dbLoading || statsLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Perpustakaan</h1>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data dari database...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if there's an error
  if (dbError || statsError) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Perpustakaan</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-red-800 mb-2">Terjadi Kesalahan</h3>
            <p className="text-red-700">{dbError || statsError}</p>
          </div>
        </div>
      </div>
    );
  }

  // Use real data from database if available, otherwise use dummy data
  const totalBooks = statistics?.totalBooks || 50;
  const totalMembers = statistics?.totalMembers || 25;
  const borrowedBooks = statistics?.activeBorrowings || 15;
  const availableBooks = statistics?.availableBooks || (totalBooks - borrowedBooks);

  const stats = [
    { label: 'Total Buku', value: totalBooks, icon: '📚', color: 'blue' },
    { label: 'Anggota Terdaftar', value: totalMembers, icon: '👥', color: 'emerald' },
    { label: 'Buku Dipinjam', value: borrowedBooks, icon: '📤', color: 'amber' },
    { label: 'Buku Tersedia', value: availableBooks, icon: '📖', color: 'green' },
  ];

  const recentActivities = [
    { id: 1, type: 'Borrow', title: 'Peminjaman: Laskar Pelangi', member: 'Andi Wijaya', date: '2024-11-09' },
    { id: 2, type: 'Return', title: 'Pengembalian: Bumi Manusia', member: 'Siti Nurhaliza', date: '2024-11-10' },
    { id: 3, type: 'Register', title: 'Anggota baru terdaftar', member: 'Budi Santoso', date: '2024-11-11' },
    { id: 4, type: 'Borrow', title: 'Peminjaman: Negeri 5 Menara', member: 'Rina Marlina', date: '2024-11-11' },
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
          <StatsCard icon={stats[0].icon} label={stats[0].label} value={stats[0].value} bgColor="bg-blue-50" />
          <StatsCard icon={stats[1].icon} label={stats[1].label} value={stats[1].value} bgColor="bg-emerald-50" />
          <StatsCard icon={stats[2].icon} label={stats[2].label} value={stats[2].value} bgColor="bg-amber-50" />
          <StatsCard icon={stats[3].icon} label={stats[3].label} value={stats[3].value} bgColor="bg-green-50" />
        </div>

        {/* Bagian Aktivitas Terbaru dan Grafik */}
        <div className="space-y-8">
          {/* Kolom Aktivitas Terbaru */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Aktivitas Terbaru</h2>
              <button className="text-xs px-3 py-1 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">Lihat semua</button>
            </div>
            <RecentActivity items={recentActivities} />
          </div>

          {/* Kolom Grafik - Dicentangkan */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Statistik Peminjaman</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <Charts data={monthlyBorrowData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;