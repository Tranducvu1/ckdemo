import { useState, useEffect } from "react";

export default function BookManager() {
  const [name, setName] = useState("");
  const [mota, setMota] = useState("");
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch("http://localhost:7272/api/v1/book");
    if (response.ok) {
      const data = await response.json();
      setBooks(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:7272/api/v1/book/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, mota })
    });
    
    if (response.ok) {
      setMessage("Sách đã được thêm thành công!");
      setName("");
      setMota("");
      fetchBooks();
    } else {
      setMessage("Có lỗi xảy ra khi thêm sách.");
    }
  };

  const filteredBooks = books.filter(book => 
    (book.name?.toLowerCase() || "").includes(search.toLowerCase()) || 
    (book.mota?.toLowerCase() || "").includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Quản lý sách</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Tên sách" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required 
        />
        <input 
          type="text" 
          placeholder="Mô tả" 
          value={mota} 
          onChange={(e) => setMota(e.target.value)}
          required 
        />
        <button type="submit">Thêm</button>
      </form>
      {message && <p>{message}</p>}
      
      <h3>Tìm kiếm sách</h3>
      <input 
        type="text" 
        placeholder="Nhập tên hoặc mô tả" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <h3>Danh sách sách</h3>
      <ul>
        {filteredBooks.map((book, index) => (
          <li key={index}>{book.name} - {book.mota}</li>
        ))}
      </ul>
    </div>
  );
}
