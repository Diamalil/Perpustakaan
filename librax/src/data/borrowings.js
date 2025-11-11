export const borrowings = [
  {
    id: 1,
    borrowingCode: "P001",
    memberId: 1,
    memberName: "Andi Wijaya",
    bookId: 1,
    bookTitle: "Harry Potter dan Batu Bertuah",
    borrowDate: "2024-11-01",
    dueDate: "2024-11-15",
    returnDate: null,
    status: "borrowed",
    fine: 0,
    notes: "",
    renewed: false
  },
  {
    id: 2,
    borrowingCode: "P002",
    memberId: 1,
    memberName: "Andi Wijaya",
    bookId: 3,
    bookTitle: "Sapiens: Riwayat Manusia",
    borrowDate: "2024-11-05",
    dueDate: "2024-11-19",
    returnDate: null,
    status: "borrowed",
    fine: 0,
    notes: "",
    renewed: true
  },
  {
    id: 3,
    borrowingCode: "P003",
    memberId: 2,
    memberName: "Siti Nurhaliza",
    bookId: 2,
    bookTitle: "Laskar Pelangi",
    borrowDate: "2024-10-25",
    dueDate: "2024-11-08",
    returnDate: "2024-11-09",
    status: "returned",
    fine: 2000,
    notes: "Terlambat 1 hari",
    renewed: false
  },
  {
    id: 4,
    borrowingCode: "P004",
    memberId: 4,
    memberName: "Rina Marlina",
    bookId: 5,
    bookTitle: "Negeri 5 Menara",
    borrowDate: "2024-11-03",
    dueDate: "2024-11-17",
    returnDate: null,
    status: "overdue",
    fine: 4000,
    notes: "Sudah lewat 2 hari",
    renewed: false
  },
  {
    id: 5,
    borrowingCode: "P005",
    memberId: 6,
    memberName: "Dewi Lestari",
    bookId: 12,
    bookTitle: "Ayat-Ayat Cinta",
    borrowDate: "2024-11-07",
    dueDate: "2024-11-21",
    returnDate: null,
    status: "borrowed",
    fine: 0,
    notes: "",
    renewed: false
  }
];

export const borrowingStatuses = [
  { value: "borrowed", label: "Dipinjam", color: "blue" },
  { value: "returned", label: "Dikembalikan", color: "green" },
  { value: "overdue", label: "Terlambat", color: "red" }
];