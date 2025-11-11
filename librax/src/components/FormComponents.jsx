import React from 'react';

/**
 * Input Field Component
 * Input text standar yang bisa dipakai di form mana saja
 * 
 * Props:
 * - label: Label untuk input
 * - name: Nama field (untuk form submission)
 * - value: Nilai input
 * - onChange: Function saat nilai berubah
 * - type: Tipe input (text, email, number, date, dll)
 * - placeholder: Placeholder text
 * - error: Pesan error (opsional)
 * - required: Apakah field wajib diisi
 * - disabled: Apakah field disabled
 */
const InputField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'text',
  placeholder = '',
  error = '',
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {/* Label */}
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input Field */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          error 
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300'
        } ${
          disabled 
            ? 'bg-gray-100 cursor-not-allowed opacity-50' 
            : 'bg-white'
        }`}
      />
      
      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

/**
 * Select Field Component
 * Dropdown select untuk pilihan
 * 
 * Props:
 * - label: Label untuk select
 * - name: Nama field
 * - value: Nilai yang dipilih
 * - onChange: Function saat nilai berubah
 * - options: Array of options [{value, label}]
 * - placeholder: Placeholder option
 * - error: Pesan error
 * - required: Apakah field wajib diisi
 */
const SelectField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options = [],
  placeholder = 'Pilih salah satu...',
  error = '',
  required = false,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {/* Label */}
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Select Field */}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          error 
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300'
        }`}
      >
        {/* Placeholder Option */}
        <option value="">{placeholder}</option>
        
        {/* Options */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

/**
 * Textarea Field Component
 * Untuk input text panjang (deskripsi, alamat, dll)
 */
const TextareaField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder = '',
  rows = 4,
  error = '',
  required = false,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {/* Label */}
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Textarea */}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
          error 
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300'
        }`}
      />
      
      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

/**
 * Form Actions Component
 * Tombol submit dan cancel untuk form
 */
const FormActions = ({ 
  onCancel,
  onSubmit,
  submitText = 'Simpan',
  cancelText = 'Batal',
  isLoading = false,
  submitButtonClass = 'bg-blue-600 hover:bg-blue-700',
  cancelButtonClass = 'bg-gray-300 hover:bg-gray-400 text-gray-700'
}) => {
  return (
    <div className="flex gap-3 pt-4">
      {/* Cancel Button */}
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${cancelButtonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {cancelText}
        </button>
      )}
      
      {/* Submit Button */}
      <button
        type="submit"
        onClick={onSubmit}
        disabled={isLoading}
        className={`px-4 py-2 rounded-md font-medium text-white transition-colors ${submitButtonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Loading...</span>
          </div>
        ) : (
          submitText
        )}
      </button>
    </div>
  );
};

// Export semua form components
export { InputField, SelectField, TextareaField, FormActions };