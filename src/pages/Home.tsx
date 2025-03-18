import axios from "axios";
import { useState, useEffect } from "react";
import { Product } from "../types/Product";
import "./trangchu.css";

function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const getList = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data);
      setFilteredProducts(data); // Ban đầu hiển thị tất cả sản phẩm
    } catch (error) {
      console.log(error);
    }
  };

  const delPro = async (id: number) => {
    try {
      if (window.confirm("Are you sure to delete this product?")) {
        await axios.delete("http://localhost:3000/products/" + id);
        alert("Success!");
        getList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  // 🔍 Hàm tìm kiếm khi nhấn nút
  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <header>
        <div className="header-container">
          <div className="nav">
            <ul>
              <li><a href="#">TRANG CHỦ</a></li>
              <li><a href="#">SẢN PHẨM</a></li>
              <li><a href="#">ƯU ĐÃI</a></li>
              <li><a href="#">DỊCH VỤ</a></li>
              <li><a href="#">XEM THÊM</a></li>
            </ul>
          </div>
          <div className="header-auth">
            <button className="login-btn"><a href="/login">Đăng Nhập</a></button>
            <button className="register-btn"><a href="/register">Đăng Ký</a></button>
          </div>
        </div>
      </header>

      <div className="banner">
        <img src="https://i.pinimg.com/736x/f9/0a/7d/f90a7dfb062af8954aa3044c3f5a0c7f.jpg" alt="banner" style={{ width: "90%", height: "300px", borderRadius: "10px" }} />
      </div>

      <h1>Skin AOV LIST</h1>

      {/* Ô tìm kiếm và nút tìm kiếm */}
      <div className="mb-4" style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
  onClick={handleSearch}
  className="px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-700"
>
  Tìm kiếm
</button>
      </div>

      <a className="btn btn-warning" href={"/create/"}>Add Product</a>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p, index) => (
            <tr key={index}>
              <td>{p.id}</td>
              <td>
                <img src={p.image} alt="" width={"100px"} />
              </td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <a className="btn btn-info" href={"/detail/" + p.id}>View</a>
                <a className="btn btn-warning" href={`/edit/${p.id}`}>Edit</a>
                <a className="btn btn-danger" onClick={() => delPro(p.id)}>Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer>
        <div className="footer">
          <div className="footer-column">
            <h3>Về Chúng Tôi</h3>
            <p>Chuyên cung cấp các skin game Liên Quân Mobile với giá tốt nhất.</p>
            <p>Uy tín - Chất lượng - Dịch vụ tận tâm.</p>
          </div>

          <div className="footer-column">
            <h3>Liên Hệ</h3>
            <p>Email: hotro@skinaov.com</p>
            <p>Hotline: 0987 654 321</p>
            <p>Địa chỉ: Cao đẳng FPT Polytechnic</p>
          </div>

          <div className="footer-column">
            <h3>Hỗ Trợ Khách Hàng</h3>
            <p>Chính sách bảo hành</p>
            <p>Điều khoản sử dụng</p>
            <p>Chính sách đổi trả</p>
          </div>

          <div className="footer-column">
            <h3>Theo Dõi Chúng Tôi</h3>
            <p>Facebook: @LeXLam005</p>
            <p>Zalo: 0987 654 321</p>
            <p>YouTube: Lamlxph51322</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
