import React, { useState } from 'react';

/**
 * Header/Navbar Component
 * Muncul di semua halaman untuk navigasi
 * 
 * Props:
 * - title: Judul aplikasi
 * - user: Data user yang login (optional)
 */
const Header = ({ title = "Perpustakaan Digital", user = null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menu navigasi
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/books', label: 'Katalog Buku', icon: '📚' },
    { path: '/borrowings', label: 'Peminjaman', icon: '📋' },
    { path: '/members', label: 'Anggota', icon: '👥' },
  ];

  // Cek apakah menu aktif (hardcode untuk sekarang)
  const isActive = (path) => {
    return path === '/dashboard';
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl">📖</div>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* User Info & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            {user && (
              <div className="hidden md:flex items-center space-x-2">
                <div className="text-sm">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-blue-200 text-xs">{user.role}</div>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-blue-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;