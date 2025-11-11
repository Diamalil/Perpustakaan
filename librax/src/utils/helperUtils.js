// 🧮 Utility functions untuk kalkulasi dan helper

/**
 * Hitung denda keterlambatan
 * Default: Rp 1000 per hari, maksimal Rp 50.000
 */
export const calculateLateFee = (daysLate, ratePerDay = 1000, maxFee = 50000) => {
  if (daysLate <= 0) return 0;
  
  const fee = daysLate * ratePerDay;
  return Math.min(fee, maxFee);
};

/**
 * Hitung total harga peminjaman
 * (Bisa ditambahkan biaya admin, dll)
 */
export const calculateTotalFee = (baseFee = 0, lateFee = 0, adminFee = 0) => {
  return baseFee + lateFee + adminFee;
};

/**
 * Format angka ke format Rupiah
 * Contoh: 10000 -> Rp 10.000
 */
export const formatRupiah = (amount) => {
  if (amount === 0) return 'Rp 0';
  if (!amount) return 'Rp 0';
  
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Generate ID unik untuk transaksi baru
 * Format: LIB + timestamp + random
 * Contoh: LIB20240115120000123
 */
export const generateTransactionId = (prefix = 'LIB') => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

/**
 * Cek status ketersediaan buku
 * Berdasarkan data peminjaman yang ada
 */
export const checkBookAvailability = (bookId, borrowings) => {
  if (!borrowings || borrowings.length === 0) return true;
  
  const activeBorrowings = borrowings.filter(
    borrowing => borrowing.bookId === bookId && borrowing.status === 'borrowed'
  );
  
  return activeBorrowings.length === 0;
};

/**
 * Hitung statistik perpustakaan sederhana
 */
export const calculateLibraryStats = (books, members, borrowings) => {
  const totalBooks = books.length;
  const totalMembers = members.length;
  const totalBorrowings = borrowings.length;
  
  const borrowedBooks = borrowings.filter(b => b.status === 'borrowed').length;
  const overdueBooks = borrowings.filter(b => b.status === 'overdue').length;
  const returnedBooks = borrowings.filter(b => b.status === 'returned').length;
  
  const availableBooks = totalBooks - borrowedBooks;
  
  return {
    totalBooks,
    totalMembers,
    totalBorrowings,
    borrowedBooks,
    overdueBooks,
    returnedBooks,
    availableBooks,
    borrowingRate: totalMembers > 0 ? ((borrowedBooks / totalBooks) * 100).toFixed(1) : 0
  };
};

/**
 * Filter dan search data buku
 * Bisa berdasarkan kategori, judul, atau penulis
 */
export const filterBooks = (books, searchTerm = '', category = '') => {
  let filteredBooks = [...books];
  
  // Filter berdasarkan kategori
  if (category && category !== 'all') {
    filteredBooks = filteredBooks.filter(book => book.category === category);
  }
  
  // Search berdasarkan judul atau penulis
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredBooks = filteredBooks.filter(book => 
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower)
    );
  }
  
  return filteredBooks;
};