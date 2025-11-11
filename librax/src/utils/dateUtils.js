// 📅 Utility functions untuk format tanggal

/**
 * Format tanggal ke format Indonesia (DD/MM/YYYY)
 * Contoh: 2024-01-15 -> 15/01/2024
 */
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

/**
 * Hitung selisih hari antara dua tanggal
 * Berguna untuk menghitung keterlambatan pengembalian buku
 */
export const daysDifference = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds per day
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);
  
  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
};

/**
 * Cek apakah tanggal sudah lewat dari hari ini
 * Untuk mengecek buku yang terlambat dikembalikan
 */
export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  
  const today = new Date();
  const due = new Date(dueDate);
  
  // Set time to 00:00:00 untuk perbandingan yang fair
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  
  return due < today;
};

/**
 * Format tanggal untuk input form (YYYY-MM-DD)
 * Karena input type="date" butuh format ini
 */
export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};