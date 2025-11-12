import React, { useState, useEffect } from 'react';
import { useDatabase, useBorrowings, useBooks, useMembers } from '../hooks/useDatabase';

const BorrowingsPage = () => {
  // Pastikan database terinisialisasi
  useDatabase();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { borrowings, isLoading, error, refreshBorrowings, returnBook } = useBorrowings();
  const { books } = useBooks();
  const { members } = useMembers();
  const [borrowingDetails, setBorrowingDetails] = useState([]);
  const [filteredBorrowings, setFilteredBorrowings] = useState([]);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Gabungkan data peminjaman dengan informasi buku dan anggota
  useEffect(() => {
    if (!Array.isArray(borrowings) || borrowings.length === 0) {
      setBorrowingDetails([]);
      return;
    }

    const now = new Date();
    const details = borrowings.map(b => {
      const book = books?.find(book => book.id === b.bookId);
      const member = members?.find(m => m.id === b.memberId);
      const dueDate = b?.dueDate ? new Date(b.dueDate) : null;
      const isOverdue = !!(dueDate && b.status === 'borrowed' && dueDate < now);
      return {
        ...b,
        bookTitle: book?.title || 'Buku tidak ditemukan',
        memberName: member?.name || 'Anggota tidak ditemukan',
        memberCode: member?.memberCode || '-',
        borrowingCode: b?.borrowingCode || (b?.id ? String(b.id) : '-'),
        isOverdue
      };
    });
    setBorrowingDetails(details);
  }, [borrowings, books, members]);

  // Filter peminjaman berdasarkan pencarian dan status
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    const filtered = borrowingDetails.filter(b => {
      const matchesSearch =
        !term ||
        (b.bookTitle || '').toLowerCase().includes(term) ||
        (b.memberName || '').toLowerCase().includes(term) ||
        (b.memberCode || '').toLowerCase().includes(term) ||
        (b.borrowingCode || '').toLowerCase().includes(term);

      const matchesStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'overdue' ? b.isOverdue : (b.status || '').toLowerCase() === selectedStatus.toLowerCase());

      return matchesSearch && matchesStatus;
    });
    setFilteredBorrowings(filtered);
  }, [borrowingDetails, searchTerm, selectedStatus]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'borrowed': return 'bg-blue-100 text-blue-800';
      case 'returned': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'borrowed': return 'Dipinjam';
      case 'returned': return 'Dikembalikan';
      case 'overdue': return 'Terlambat';
      default: return status || '-';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return '-';
    return d.toLocaleDateString('id-ID');
  };

  const handleReturn = async (id) => {
    try {
      setActionLoadingId(id);
      await returnBook(id);
      await refreshBorrowings();
    } catch (e) {
      console.error(e);
      alert('Gagal memproses pengembalian. Silakan coba lagi.');
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manajemen Peminjaman</h1>
            <p className="text-gray-700">Kelola transaksi peminjaman dan pengembalian buku</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            + Peminjaman Baru
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data peminjaman dari database...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="text-red-400 text-xl mr-3">⚠️</div>
              <div>
                <h3 className="text-red-800 font-medium">Terjadi Kesalahan</h3>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Filter dan Pencarian */}
        {!isLoading && !error && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cari Peminjaman</label>
                <input
                  type="text"
                  placeholder="Judul buku, nama anggota, atau kode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Semua Status</option>
                  <option value="borrowed">Sedang Dipinjam</option>
                  <option value="returned">Sudah Dikembalikan</option>
                  <option value="overdue">Terlambat</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Ringkasan Statistik */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{borrowings?.filter(b => b.status === 'borrowed').length || 0}</div>
              <div className="text-sm text-gray-600">Sedang Dipinjam</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">{borrowings?.filter(b => b.status === 'returned').length || 0}</div>
              <div className="text-sm text-gray-600">Sudah Dikembalikan</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-red-600">{borrowingDetails.filter(b => b.isOverdue).length}</div>
              <div className="text-sm text-gray-600">Terlambat</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-gray-600">{borrowings?.length || 0}</div>
              <div className="text-sm text-gray-600">Total Transaksi</div>
            </div>
          </div>
        )}

        {/* Hasil Pencarian */}
        {!isLoading && !error && (
          <div className="mb-4">
            <p className="text-gray-600">
              Menampilkan {filteredBorrowings.length} dari {borrowings?.length || 0} transaksi
            </p>
          </div>
        )}

        {/* Tabel Peminjaman */}
        {!isLoading && !error && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Peminjaman</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buku</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Anggota</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Pinjam</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Kembali</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBorrowings.map((b) => (
                    <tr key={b.id} className={`hover:bg-gray-50 ${b.isOverdue ? 'bg-red-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {b.borrowingCode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{b.bookTitle}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{b.memberName}</div>
                        <div className="text-sm text-gray-500">{b.memberCode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(b.borrowDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(b.dueDate)}
                        {b.isOverdue && (
                          <div className="text-xs text-red-600 mt-1">
                            Terlambat {Math.ceil((new Date() - new Date(b.dueDate)) / (1000 * 60 * 60 * 24))} hari
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          b.isOverdue ? 'bg-red-100 text-red-800' : getStatusColor(b.status)
                        }`}>
                          {b.isOverdue ? 'Terlambat' : getStatusLabel(b.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {b.status === 'borrowed' ? (
                          <button
                            className={`text-green-600 hover:text-green-900 ${actionLoadingId === b.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => handleReturn(b.id)}
                            disabled={actionLoadingId === b.id}
                          >
                            {actionLoadingId === b.id ? 'Memproses...' : 'Proses Pengembalian'}
                          </button>
                        ) : (
                          <span className="text-gray-500">Selesai</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredBorrowings.length === 0 && !isLoading && !error && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada transaksi ditemukan</h3>
            <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowingsPage;