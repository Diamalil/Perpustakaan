import React from 'react';
import { formatRupiah } from '../utils/helperUtils';

/**
 * Book Card Component
 * Menampilkan informasi buku dalam bentuk card
 * 
 * Props:
 * - book: Object data buku
 * - onBorrow: Function saat tombol pinjam diklik
 * - onEdit: Function saat tombol edit diklik (untuk admin)
 * - onDelete: Function saat tombol delete diklik (untuk admin)
 * - showActions: Boolean untuk menampilkan/hide tombol aksi
 */
const BookCard = ({ book, onBorrow, onEdit, onDelete, showActions = true }) => {
  // Cek ketersediaan buku
  const isAvailable = book.stock > 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Header Card */}
      <div className="p-4">
        {/* Judul Buku */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {book.title}
        </h3>
        
        {/* Penulis */}
        <p className="text-gray-600 text-sm mb-1">
          <span className="font-medium">Penulis:</span> {book.author}
        </p>
        
        {/* Kategori */}
        <div className="flex items-center mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {book.category}
          </span>
        </div>
        
        {/* Deskripsi Singkat */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {book.description || 'Tidak ada deskripsi tersedia'}
        </p>
        
        {/* Info Tambahan */}
        <div className="space-y-1 text-sm text-gray-500">
          <p><span className="font-medium">Penerbit:</span> {book.publisher}</p>
          <p><span className="font-medium">Tahun:</span> {book.year}</p>
          <p><span className="font-medium">ISBN:</span> {book.isbn}</p>
        </div>
      </div>
      
      {/* Footer Card */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          {/* Harga */}
          <div>
            <span className="text-sm text-gray-500">Harga Sewa:</span>
            <div className="text-lg font-bold text-green-600">
              {formatRupiah(book.price)}  {/* ← Pakai utility function! */}
            </div>
          </div>
          
          {/* Stock */}
          <div className="text-right">
            <span className="text-sm text-gray-500">Stock:</span>
            <div className={`text-lg font-bold ${
              isAvailable ? 'text-green-600' : 'text-red-600'
            }`}>
              {book.stock}
            </div>
          </div>
        </div>
        
        {/* Tombol Aksi */}
        {showActions && (
          <div className="flex gap-2">
            {/* Tombol Pinjam */}
            {onBorrow && (
              <button
                onClick={() => onBorrow(book)}
                disabled={!isAvailable}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                  isAvailable
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isAvailable ? '📖 Pinjam' : '❌ Habis'}
              </button>
            )}
            
            {/* Tombol Edit & Delete (untuk admin) */}
            {onEdit && (
              <button
                onClick={() => onEdit(book)}
                className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition-colors"
                title="Edit buku"
              >
                ✏️
              </button>
            )}
            
            {onDelete && (
              <button
                onClick={() => onDelete(book)}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                title="Hapus buku"
              >
                🗑️
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;