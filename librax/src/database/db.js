import Dexie from 'dexie';

// Create database instance
export const db = new Dexie('DigitalLibraryDB');

// Define database schema
// Version 1: Initial schema
db.version(1).stores({
  books: '++id, title, author, isbn, category, year, publisher, pages, totalCopies, borrowedCopies, description, coverUrl, addedDate',
  members: '++id, memberCode, name, email, phone, address, joinDate, status, borrowedBooks, maxBorrowLimit, birthDate, occupation',
  borrowings: '++id, bookId, memberId, borrowDate, dueDate, returnDate, status, notes',
  settings: 'key, value'
});

// Export tables for easy access
export const booksTable = db.books;
export const membersTable = db.members;
export const borrowingsTable = db.borrowings;
export const settingsTable = db.settings;

// Log database creation for debugging
console.log('Database instance created:', db);
console.log('Tables created:', {
  books: !!booksTable,
  members: !!membersTable,
  borrowings: !!borrowingsTable,
  settings: !!settingsTable
});

// Ensure database is opened
export const openDatabase = async () => {
  try {
    await db.open();
    console.log('Database opened successfully');
  } catch (error) {
    console.error('Error opening database:', error);
    throw error;
  }
};

// Initialize database with sample data if empty
export const initializeDatabase = async () => {
  try {
    console.log('Starting database initialization...');
    
    // Ensure database is opened first
    await openDatabase();
    
    console.log('Checking database state...');
    
    // Check if database is already populated
    let bookCount = 0;
    let memberCount = 0;
    
    try {
      bookCount = await booksTable.count();
      memberCount = await membersTable.count();
      console.log(`Current database state: ${bookCount} books, ${memberCount} members`);
    } catch (countError) {
      console.warn('Error counting existing data:', countError);
    }
    
    if (bookCount === 0 && memberCount === 0) {
      console.log('Initializing database with sample data...');
      
      try {
        // Import sample data with better error handling
        let books = [];
        let members = [];
        
        try {
          const booksModule = await import('../data/books.js');
          books = booksModule.books || booksModule.default?.books || [];
        } catch (booksError) {
          console.warn('Could not import books data:', booksError.message);
          books = [];
        }
        
        try {
          const membersModule = await import('../data/members.js');
          members = membersModule.members || membersModule.default?.members || [];
        } catch (membersError) {
          console.warn('Could not import members data:', membersError.message);
          members = [];
        }
        
        console.log(`Loaded ${books.length} books and ${members.length} members from data files`);
        
        if (books.length > 0) {
          await booksTable.bulkAdd(books);
          console.log(`Added ${books.length} books to database`);
        }
        
        if (members.length > 0) {
          await membersTable.bulkAdd(members);
          console.log(`Added ${members.length} members to database`);
        }
        
        // Add sample borrowings only if we have books and members
        if (books.length >= 3 && members.length >= 3) {
          const sampleBorrowings = [
            {
              bookId: 1,
              memberId: 1,
              borrowDate: '2024-11-15',
              dueDate: '2024-11-29',
              returnDate: null,
              status: 'borrowed',
              notes: 'Pertama kali meminjam'
            },
            {
              bookId: 2,
              memberId: 2,
              borrowDate: '2024-11-10',
              dueDate: '2024-11-24',
              returnDate: '2024-11-22',
              status: 'returned',
              notes: 'Dikembalikan tepat waktu'
            },
            {
              bookId: 3,
              memberId: 3,
              borrowDate: '2024-11-01',
              dueDate: '2024-11-15',
              returnDate: null,
              status: 'overdue',
              notes: 'Terlambat 7 hari'
            }
          ];
          
          await borrowingsTable.bulkAdd(sampleBorrowings);
          console.log(`Added ${sampleBorrowings.length} sample borrowings to database`);
        }
        
        console.log('Database initialized successfully!');
      } catch (importError) {
        console.error('Error importing data files:', importError);
        // Continue with empty database if import fails
        console.log('Continuing with empty database due to import error');
      }
    } else {
      console.log('Database already contains data.');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    // Don't throw the error, just log it and continue
    console.log('Database initialization encountered an error but will continue');
  }
};

// Database service functions
export const dbService = {
  // Books operations
  books: {
    async getAll() {
      return await booksTable.toArray();
    },
    
    async getById(id) {
      return await booksTable.get(id);
    },
    
    async add(book) {
      return await booksTable.add(book);
    },
    
    async update(id, updates) {
      return await booksTable.update(id, updates);
    },
    
    async delete(id) {
      return await booksTable.delete(id);
    },
    
    async search(query) {
      return await booksTable
        .where('title')
        .startsWithIgnoreCase(query)
        .or('author')
        .startsWithIgnoreCase(query)
        .or('category')
        .startsWithIgnoreCase(query)
        .toArray();
    },
    
    async getAvailable() {
      return await booksTable.where('available').equals(true).toArray();
    },
    
    async borrowBook(bookId) {
      const book = await booksTable.get(bookId);
      if (book && book.available && book.borrowedCopies < book.totalCopies) {
        return await booksTable.update(bookId, {
          borrowedCopies: book.borrowedCopies + 1,
          available: book.borrowedCopies + 1 < book.totalCopies
        });
      }
      throw new Error('Book not available for borrowing');
    },
    
    async returnBook(bookId) {
      const book = await booksTable.get(bookId);
      if (book && book.borrowedCopies > 0) {
        return await booksTable.update(bookId, {
          borrowedCopies: book.borrowedCopies - 1,
          available: true
        });
      }
      throw new Error('Invalid return operation');
    }
  },
  
  // Members operations
  members: {
    async getAll() {
      return await membersTable.toArray();
    },
    
    async getById(id) {
      return await membersTable.get(id);
    },
    
    async add(member) {
      return await membersTable.add(member);
    },
    
    async update(id, updates) {
      return await membersTable.update(id, updates);
    },
    
    async delete(id) {
      return await membersTable.delete(id);
    },
    
    async search(query) {
      return await membersTable
        .where('name')
        .startsWithIgnoreCase(query)
        .or('memberCode')
        .startsWithIgnoreCase(query)
        .or('email')
        .startsWithIgnoreCase(query)
        .toArray();
    },
    
    async getActive() {
      return await membersTable.where('status').equals('active').toArray();
    },
    
    async canBorrow(memberId) {
      const member = await membersTable.get(memberId);
      return member && member.status === 'active' && member.borrowedBooks < member.maxBorrowLimit;
    },
    
    async incrementBorrowedBooks(memberId) {
      const member = await membersTable.get(memberId);
      if (member) {
        return await membersTable.update(memberId, {
          borrowedBooks: member.borrowedBooks + 1
        });
      }
    },
    
    async decrementBorrowedBooks(memberId) {
      const member = await membersTable.get(memberId);
      if (member && member.borrowedBooks > 0) {
        return await membersTable.update(memberId, {
          borrowedBooks: member.borrowedBooks - 1
        });
      }
    }
  },
  
  // Borrowings operations
  borrowings: {
    async getAll() {
      return await borrowingsTable.toArray();
    },
    
    async getById(id) {
      return await borrowingsTable.get(id);
    },
    
    async add(borrowing) {
      return await borrowingsTable.add(borrowing);
    },
    
    async update(id, updates) {
      return await borrowingsTable.update(id, updates);
    },
    
    async delete(id) {
      return await borrowingsTable.delete(id);
    },
    
    async getByMember(memberId) {
      return await borrowingsTable.where('memberId').equals(memberId).toArray();
    },
    
    async getByBook(bookId) {
      return await borrowingsTable.where('bookId').equals(bookId).toArray();
    },
    
    async getActiveBorrowings() {
      return await borrowingsTable.where('status').equals('borrowed').toArray();
    },
    
    async getOverdueBorrowings() {
      const today = new Date().toISOString().split('T')[0];
      return await borrowingsTable
        .where('dueDate')
        .below(today)
        .and(item => item.status === 'borrowed')
        .toArray();
    },
    
    async returnBook(borrowingId, returnDate = new Date().toISOString().split('T')[0]) {
      const borrowing = await borrowingsTable.get(borrowingId);
      if (borrowing && borrowing.status === 'borrowed') {
        return await borrowingsTable.update(borrowingId, {
          returnDate,
          status: 'returned'
        });
      }
      throw new Error('Invalid return operation');
    }
  },
  
  // Statistics
  async getStatistics() {
    try {
      console.log('Starting getStatistics...');
      
      // Ensure database is opened first
      if (!db.isOpen()) {
        console.log('Database not open, opening now...');
        await openDatabase();
      }
      
      // Check if tables exist
      if (!booksTable || !membersTable || !borrowingsTable) {
        console.error('Database tables not properly initialized');
        return {
          totalBooks: 0,
          totalMembers: 0,
          totalBorrowings: 0,
          activeBorrowings: 0,
          overdueBorrowings: 0,
          availableBooks: 0
        };
      }
      
      console.log('Starting to count records...');
      const [totalBooks, totalMembers, totalBorrowings, activeBorrowings, overdueBorrowings] = await Promise.all([
        booksTable.count().catch(err => { console.error('Error counting books:', err); return 0; }),
        membersTable.count().catch(err => { console.error('Error counting members:', err); return 0; }),
        borrowingsTable.count().catch(err => { console.error('Error counting borrowings:', err); return 0; }),
        borrowingsTable.where('status').equals('borrowed').count().catch(err => { console.error('Error counting active borrowings:', err); return 0; }),
        this.borrowings.getOverdueBorrowings().then(items => items.length).catch(() => 0)
      ]);
      
      console.log(`Counts: books=${totalBooks}, members=${totalMembers}, borrowings=${totalBorrowings}, active=${activeBorrowings}, overdue=${overdueBorrowings}`);
      
      // Calculate available books differently - count books where borrowedCopies < totalCopies
      let availableBooks = 0;
      try {
        const allBooks = await booksTable.toArray();
        availableBooks = allBooks.filter(book => book.borrowedCopies < book.totalCopies).length;
        console.log(`Available books calculated: ${availableBooks}`);
      } catch (err) {
        console.error('Error counting available books:', err);
        availableBooks = 0;
      }
      
      return {
        totalBooks,
        totalMembers,
        totalBorrowings,
        activeBorrowings,
        overdueBorrowings,
        availableBooks
      };
    } catch (error) {
      console.error('Error in getStatistics:', error);
      console.error('Error stack:', error.stack);
      // Return default values if there's an error
      return {
        totalBooks: 0,
        totalMembers: 0,
        totalBorrowings: 0,
        activeBorrowings: 0,
        overdueBorrowings: 0,
        availableBooks: 0
      };
    }
  }
};

export default db;