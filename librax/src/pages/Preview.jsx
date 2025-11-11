import React, { useState } from 'react';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import { InputField, SelectField, TextareaField, FormActions } from '../components/FormComponents';
import { ConfirmationModal, FormModal } from '../components/ModalComponents';
import { books, categories } from '../data';

/**
 * Preview Page - Halaman Demo untuk melihat semua komponen
 * Ini hanya untuk testing dan melihat hasil komponen yang sudah kita buat
 */
const Preview = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    price: '',
    stock: ''
  });

  // Sample user data untuk header
  const user = {
    name: 'Admin Perpustakaan',
    role: 'Administrator'
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Book actions
  const handleBorrow = (book) => {
    alert(`Meminjam buku: ${book.title}`);
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setFormData(book);
    setShowEditModal(true);
  };

  const handleDelete = (book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const handleAddNew = () => {
    setFormData({
      title: '',
      author: '',
      category: '',
      description: '',
      price: '',
      stock: ''
    });
    setShowAddModal(true);
  };

  const handleSubmitForm = () => {
    console.log('Submit data:', formData);
    setShowEditModal(false);
    setShowAddModal(false);
    alert('Data berhasil disimpan!');
  };

  const handleDeleteConfirm = () => {
    console.log('Delete book:', selectedBook);
    setShowDeleteModal(false);
    alert(`Buku "${selectedBook?.title}" berhasil dihapus!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header title="Perpustakaan Digital - Preview" user={user} />
      
      <div className="container mx-auto px-4 py-8">
        
        {/* Section: Book Cards */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">📚 Preview: Book Cards</h2>
            <button 
              onClick={handleAddNew}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              ➕ Tambah Buku Baru
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.slice(0, 4).map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onBorrow={handleBorrow}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showActions={true}
              />
            ))}
          </div>
        </section>

        {/* Section: Form Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Preview: Form Components</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">Form Tambah Buku</h3>
            
            <InputField
              label="Judul Buku"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Masukkan judul buku"
              required
            />
            
            <InputField
              label="Penulis"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Nama penulis"
              required
            />
            
            <SelectField
              label="Kategori"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              options={categories.map(cat => ({ value: cat, label: cat }))}
              placeholder="Pilih kategori"
              required
            />
            
            <InputField
              label="Harga Sewa"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="10000"
              required
            />
            
            <InputField
              label="Jumlah Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
              placeholder="10"
              required
            />
            
            <TextareaField
              label="Deskripsi"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Deskripsi singkat tentang buku ini"
              rows={3}
            />
            
            <FormActions
              onCancel={() => setFormData({ title: '', author: '', category: '', description: '', price: '', stock: '' })}
              submitText="Simpan Buku"
              onSubmit={handleSubmitForm}
            />
          </div>
        </section>

        {/* Section: Modal Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🪟 Preview: Modal Components</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Contoh Penggunaan Modal</h3>
            
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                🗑️ Tampilkan Modal Konfirmasi
              </button>
              
              <button
                onClick={() => setShowEditModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                ✏️ Tampilkan Modal Form
              </button>
              
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                ➕ Modal Tambah Buku
              </button>
            </div>
          </div>
        </section>

        {/* Section: Component Info */}
        <section className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">ℹ️ Tentang Preview Ini</h2>
          <div className="text-blue-700 space-y-2">
            <p>✅ Semua komponen sudah dibuat dan bisa digunakan</p>
            <p>✅ Header menampilkan navigasi dan info user</p>
            <p>✅ BookCard menampilkan info buku dengan action buttons</p>
            <p>✅ Form Components sudah responsive dan punya validasi</p>
            <p>✅ Modal Components bisa digunakan untuk konfirmasi dan form</p>
            <p>🎯 Selanjutnya: Kita bisa lanjut membuat halaman-halaman utama!</p>
          </div>
        </section>
      </div>

      {/* Modals */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Buku"
        message={`Apakah Anda yakin ingin menghapus buku "${selectedBook?.title}"?`}
        confirmText="Ya, Hapus"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      />

      <FormModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleSubmitForm}
        title="Edit Buku"
        submitText="Update Buku"
      >
        <InputField
          label="Judul Buku"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <InputField
          label="Penulis"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          required
        />
        <SelectField
          label="Kategori"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          options={categories.map(cat => ({ value: cat, label: cat }))}
          required
        />
        <InputField
          label="Harga Sewa"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <TextareaField
          label="Deskripsi"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
        />
      </FormModal>

      <FormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleSubmitForm}
        title="Tambah Buku Baru"
        submitText="Tambah Buku"
      >
        <InputField
          label="Judul Buku"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <InputField
          label="Penulis"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          required
        />
        <SelectField
          label="Kategori"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          options={categories.map(cat => ({ value: cat, label: cat }))}
          required
        />
        <InputField
          label="Harga Sewa"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <InputField
          label="Jumlah Stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleInputChange}
          required
        />
        <TextareaField
          label="Deskripsi"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
        />
      </FormModal>
    </div>
  );
};

export default Preview;