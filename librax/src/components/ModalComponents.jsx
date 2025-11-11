import React, { useEffect } from 'react';

/**
 * Modal Component
 * Pop-up untuk konfirmasi, form, atau informasi
 * 
 * Props:
 * - isOpen: Boolean untuk buka/tutup modal
 * - onClose: Function saat modal ditutup
 * - title: Judul modal
 * - children: Konten modal
 * - size: Ukuran modal ('sm', 'md', 'lg', 'xl')
 * - showCloseButton: Apakah tampilkan tombol X
 * - closeOnOverlayClick: Apakah bisa tutup dengan klik background
 * - footer: Komponen khusus untuk footer (opsional)
 */
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  footer = null
}) => {
  
  // Efek untuk handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'; // Restore scrolling
    };
  }, [isOpen, onClose]);

  // Jika modal tertutup, jangan render apa-apa
  if (!isOpen) return null;

  // Ukuran modal
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity"
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      {/* Modal Container */}
      <div 
        className={`bg-white rounded-lg shadow-xl transform transition-all w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()} // Prevent overlay click from closing modal
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
          
          {/* Close Button */}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="border-t border-gray-200 p-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Confirmation Modal Component
 * Modal khusus untuk konfirmasi (ya/tidak)
 */
const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = 'Konfirmasi',
  message = 'Apakah Anda yakin?',
  confirmText = 'Ya',
  cancelText = 'Tidak',
  confirmButtonClass = 'bg-red-600 hover:bg-red-700',
  cancelButtonClass = 'bg-gray-300 hover:bg-gray-400 text-gray-700'
}) => {
  
  const footer = (
    <div className="flex justify-end space-x-3">
      <button
        onClick={onClose}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${cancelButtonClass}`}
      >
        {cancelText}
      </button>
      <button
        onClick={() => {
          onConfirm();
          onClose();
        }}
        className={`px-4 py-2 rounded-md font-medium text-white transition-colors ${confirmButtonClass}`}
      >
        {confirmText}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={footer}
    >
      <p className="text-gray-700 mb-4">{message}</p>
    </Modal>
  );
};

/**
 * Form Modal Component
 * Modal khusus untuk form input
 */
const FormModal = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  title,
  children,
  submitText = 'Simpan',
  cancelText = 'Batal',
  isLoading = false,
  size = 'md'
}) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const footer = (
    <div className="flex justify-end space-x-3">
      <button
        type="button"
        onClick={onClose}
        disabled={isLoading}
        className="px-4 py-2 rounded-md font-medium bg-gray-300 hover:bg-gray-400 text-gray-700 transition-colors disabled:opacity-50"
      >
        {cancelText}
      </button>
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isLoading}
        className="px-4 py-2 rounded-md font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Menyimpan...' : submitText}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      footer={footer}
    >
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </Modal>
  );
};

// Export semua modal components
export { Modal, ConfirmationModal, FormModal };