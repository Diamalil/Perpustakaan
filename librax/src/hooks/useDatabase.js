import { useState, useEffect } from 'react';
import { dbService, initializeDatabase } from '../database/db';

// Custom hook for using the database
export const useDatabase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initDatabase = async () => {
      try {
        console.log('Starting database initialization...');
        setIsLoading(true);
        await initializeDatabase();
        console.log('Database initialization completed successfully');
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        console.error('Database initialization error:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initDatabase();
  }, []);

  return {
    isLoading,
    error,
    isInitialized,
    dbService
  };
};

// Custom hook for books
export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setIsLoading(true);
        const data = await dbService.books.getAll();
        setBooks(data);
        setError(null);
      } catch (err) {
        console.error('Error loading books:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  const refreshBooks = async () => {
    try {
      setIsLoading(true);
      const data = await dbService.books.getAll();
      setBooks(data);
    } catch (err) {
      console.error('Error refreshing books:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const searchBooks = async (query) => {
    try {
      setIsLoading(true);
      const results = await dbService.books.search(query);
      setBooks(results);
    } catch (err) {
      console.error('Error searching books:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addBook = async (book) => {
    try {
      await dbService.books.add(book);
      await refreshBooks();
    } catch (err) {
      console.error('Error adding book:', err);
      throw err;
    }
  };

  const updateBook = async (id, updates) => {
    try {
      await dbService.books.update(id, updates);
      await refreshBooks();
    } catch (err) {
      console.error('Error updating book:', err);
      throw err;
    }
  };

  const deleteBook = async (id) => {
    try {
      await dbService.books.delete(id);
      await refreshBooks();
    } catch (err) {
      console.error('Error deleting book:', err);
      throw err;
    }
  };

  return {
    books,
    isLoading,
    error,
    searchBooks,
    refreshBooks,
    addBook,
    updateBook,
    deleteBook
  };
};

// Custom hook for members
export const useMembers = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        setIsLoading(true);
        const data = await dbService.members.getAll();
        setMembers(data);
        setError(null);
      } catch (err) {
        console.error('Error loading members:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
  }, []);

  const refreshMembers = async () => {
    try {
      setIsLoading(true);
      const data = await dbService.members.getAll();
      setMembers(data);
    } catch (err) {
      console.error('Error refreshing members:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const searchMembers = async (query) => {
    try {
      setIsLoading(true);
      const results = await dbService.members.search(query);
      setMembers(results);
    } catch (err) {
      console.error('Error searching members:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addMember = async (member) => {
    try {
      await dbService.members.add(member);
      await refreshMembers();
    } catch (err) {
      console.error('Error adding member:', err);
      throw err;
    }
  };

  const updateMember = async (id, updates) => {
    try {
      await dbService.members.update(id, updates);
      await refreshMembers();
    } catch (err) {
      console.error('Error updating member:', err);
      throw err;
    }
  };

  const deleteMember = async (id) => {
    try {
      await dbService.members.delete(id);
      await refreshMembers();
    } catch (err) {
      console.error('Error deleting member:', err);
      throw err;
    }
  };

  return {
    members,
    isLoading,
    error,
    searchMembers,
    refreshMembers,
    addMember,
    updateMember,
    deleteMember
  };
};

// Custom hook for borrowings
export const useBorrowings = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBorrowings = async () => {
      try {
        setIsLoading(true);
        const data = await dbService.borrowings.getAll();
        setBorrowings(data);
        setError(null);
      } catch (err) {
        console.error('Error loading borrowings:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadBorrowings();
  }, []);

  const refreshBorrowings = async () => {
    try {
      setIsLoading(true);
      const data = await dbService.borrowings.getAll();
      setBorrowings(data);
    } catch (err) {
      console.error('Error refreshing borrowings:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addBorrowing = async (borrowing) => {
    try {
      await dbService.borrowings.add(borrowing);
      await refreshBorrowings();
    } catch (err) {
      console.error('Error adding borrowing:', err);
      throw err;
    }
  };

  const returnBook = async (borrowingId, returnDate) => {
    try {
      await dbService.borrowings.returnBook(borrowingId, returnDate);
      await refreshBorrowings();
    } catch (err) {
      console.error('Error returning book:', err);
      throw err;
    }
  };

  return {
    borrowings,
    isLoading,
    error,
    refreshBorrowings,
    addBorrowing,
    returnBook
  };
};

// Custom hook for statistics
export const useStatistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        setIsLoading(true);
        const data = await dbService.getStatistics();
        setStatistics(data);
        setError(null);
      } catch (err) {
        console.error('Error loading statistics:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadStatistics();
  }, []);

  const refreshStatistics = async () => {
    try {
      setIsLoading(true);
      const data = await dbService.getStatistics();
      setStatistics(data);
    } catch (err) {
      console.error('Error refreshing statistics:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    statistics,
    isLoading,
    error,
    refreshStatistics
  };
};

export default {
  useDatabase,
  useBooks,
  useMembers,
  useBorrowings,
  useStatistics
};