import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./trangchu.css";
type ProductInput = { id: number; name: string; price: number; image: string };

function Edit() {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductInput>();

  const getDetail = async (id: string) => {
    try {
      //call API để lấy dữ liệu
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      reset({
        name: data.name,
        price: data.price,
        image: data.image,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const nav = useNavigate();
  const onEdit: SubmitHandler<ProductInput> = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/products/${id}`,
        data
      );
      if (response.status == 200) {
        alert("Chỉnh sửa thành công");
        nav("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!id) return;
    getDetail(id);
  }, [id]);

  return (
    <div className="container">
      {/* Header với Navbar */}
      <header>
        <div className="header-container">
          <div className="nav">
            <ul>
              <li>
                <a href="/">TRANG CHỦ</a>
              </li>
              <li>
                <a href="#">SẢN PHẨM</a>
              </li>
              <li>
                <a href="#">ƯU ĐÃI</a>
              </li>
              <li>
                <a href="#">DỊCH VỤ</a>
              </li>
              <li>
                <a href="#">XEM THÊM</a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Form Đăng Ký */}
      <form onSubmit={handleSubmit(onEdit)}>
    <div>
        <label htmlFor="">Name</label>
        <input 
            type="text" 
            {...register("name", { required: "Vui lòng nhập tên sản phẩm" })} 
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
    </div>
    
    <div>
        <label htmlFor="">Price</label>
        <input 
            type="number" 
            {...register("price", { 
                required: "Vui lòng nhập giá sản phẩm", 
                min: { value: 1, message: "Giá phải lớn hơn 0" } 
            })}
        />
        {errors.price && <p className="error">{errors.price.message}</p>}
    </div>
    
    <div>
        <label htmlFor="">Image</label>
        <input 
            type="text" 
            {...register("image", { required: "Vui lòng nhập đường dẫn hình ảnh" })} 
        />
        {errors.image && <p className="error">{errors.image.message}</p>}
    </div>

    <button type="submit">Edit</button>
</form>

      {/* Footer */}
      <footer>
        <div className="footer">
          <div className="footer-column">
            <h3>Về Chúng Tôi</h3>
            <p>
              Chuyên cung cấp các skin game Liên Quân Mobile với giá tốt nhất.
            </p>
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

export default Edit;
