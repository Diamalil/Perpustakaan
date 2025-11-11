import React, { useState } from 'react'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import BooksPage from './pages/BooksPage'
import MembersPage from './pages/MembersPage'
import BorrowingsPage from './pages/BorrowingsPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'books':
        return <BooksPage />
      case 'members':
        return <MembersPage />
      case 'borrowings':
        return <BorrowingsPage />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  )
}

export default App
