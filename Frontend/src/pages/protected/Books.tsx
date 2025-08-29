import { Edit, Eye, Library, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import Button from "../../components/Button";
import { Card } from "../../components/Card";

export const Books = () => {
  const [books] = useState([
    {
      id: 1,
      title: "JavaScript: The Good Parts",
      author: "Douglas Crockford",
      isbn: "978-0596517748",
      category: "Programming",
      status: "Available",
      copies: 5,
      image:
        "https://blog.lulu.com/content/images/2024/12/print-book-beginners.jpg",
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "978-0132350884",
      category: "Programming",
      status: "Available",
      copies: 3,
      image:
        "https://blog.lulu.com/content/images/2024/12/print-book-beginners.jpg",
    },
    {
      id: 3,
      title: "The Pragmatic Programmer",
      author: "David Thomas",
      isbn: "978-0201616224",
      category: "Programming",
      status: "Issued",
      copies: 2,
      image:
        "https://blog.lulu.com/content/images/2024/12/print-book-beginners.jpg",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const categories = [
    "Programming",
    "Science",
    "Mathematics",
    "Literature",
    "History",
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || book.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Issued":
        return "bg-yellow-100 text-yellow-800";
      case "Unavailable":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 py-4 px-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
            <Library className="w-8 h-8 mr-3 text-primary-900" />
            Books Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage library books and inventory
          </p>
        </div>
        <Button className="flex items-center text-white py-2 px-4">
          <Plus size={20} className="mr-2" />
          Add Book
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Button className="text-white">Export List</Button>
        </div>
      </Card>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book, index) => (
          <Card
            key={book.id}
            hover
            className="animate-slide-up p-5"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-col h-full">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {book.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      book.status
                    )}`}
                  >
                    {book.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">by {book.author}</p>
                <p className="text-sm text-gray-500 mb-2">ISBN: {book.isbn}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Category: {book.category} • Copies: {book.copies}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm bg-brand-primary-100 text-brand-primary-900 rounded-lg hover:bg-brand-primary-200 transition-colors flex items-center justify-center">
                  <Eye size={16} className="mr-1" />
                  View
                </button>
                <button className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Edit size={16} className="mr-1" />
                  Edit
                </button>
                <button className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
