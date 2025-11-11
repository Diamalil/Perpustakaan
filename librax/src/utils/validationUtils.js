// ✅ Utility functions untuk validasi form

/**
 * Validasi email - cek format email yang benar
 * Contoh: user@email.com -> valid, user@email -> tidak valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validasi nomor telepon Indonesia
 * Menerima format: 08..., +62..., 62...
 * Minimal 10 digit, maksimal 13 digit
 */
export const validatePhone = (phone) => {
  // Hapus spasi dan strip
  const cleanPhone = phone.replace(/[\s-]/g, '');
  
  // Pola untuk nomor Indonesia
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{7,10}$/;
  return phoneRegex.test(cleanPhone);
};

/**
 * Validasi NIM/NIP - hanya angka dan huruf
 * Berguna untuk nomor identitas anggota perpustakaan
 */
export const validateMemberId = (memberId) => {
  return memberId && memberId.length >= 5 && /^[a-zA-Z0-9]+$/.test(memberId);
};

/**
 * Validasi umur - minimal dan maksimal usia
 * Default: minimal 5 tahun, maksimal 100 tahun
 */
export const validateAge = (birthDate, minAge = 5, maxAge = 100) => {
  if (!birthDate) return false;
  
  const birth = new Date(birthDate);
  const today = new Date();
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age >= minAge && age <= maxAge;
};

/**
 * Validasi umum - cek field yang kosong
 * Mengembalikan array pesan error
 */
export const validateRequired = (formData, requiredFields) => {
  const errors = [];
  
  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].toString().trim() === '') {
      errors.push(`${field} wajib diisi`);
    }
  });
  
  return errors;
};

/**
 * Format pesan error yang user-friendly
 */
export const formatErrorMessage = (errors) => {
  if (errors.length === 0) return '';
  
  if (errors.length === 1) {
    return errors[0];
  }
  
  return `${errors[0]} dan ${errors.length - 1} error lainnya`;
};