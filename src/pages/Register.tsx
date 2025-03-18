import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form"; // Thư viện xử lý form
import { useNavigate } from "react-router-dom";
import "./trangchu.css";

// Định nghĩa kiểu dữ liệu cho form đăng ký
type RegisterInput = { 
    email: string;
    password: string;
};

function Register() {
    const { 
        register,
        handleSubmit,
        formState: { errors }, // Lưu trữ validate errors
    } = useForm<RegisterInput>();

    const nav = useNavigate(); // Khởi tạo điều hướng

    // Xử lý khi người dùng nhấn đăng ký
    const onSubmitForm: SubmitHandler<RegisterInput> = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/register", data);
            if (response.status === 201 || response.status === 200) { 
                alert("Đăng ký thành công!");
                nav("/"); // Điều hướng về trang chủ
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            alert("Lỗi khi đăng ký. Vui lòng kiểm tra lại thông tin!");
        }
    };

    return (
        <div className="container">
            {/* Header với Navbar */}
            <header>
                <div className="header-container">
                    <div className="nav">
                        <ul>
                            <li><a href="/">TRANG CHỦ</a></li>
                            <li><a href="#">SẢN PHẨM</a></li>
                            <li><a href="#">ƯU ĐÃI</a></li>
                            <li><a href="#">DỊCH VỤ</a></li>
                            <li><a href="#">XEM THÊM</a></li>
                        </ul>
                    </div>
                </div>
            </header>

            {/* Form Đăng Ký */}
            <div className="register-form">
                <h1>Đăng Ký</h1>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                <div>
                    <label htmlFor="">Email</label>
                    <input 
                        type="text" 
                        id="email"
                        {
                            ...register('email', {
                                required: "Email không được bỏ trống",
                            })
                        }
                    />
                    {
                        errors?.email && (
                            <p>Email không hợp lệ</p>
                        )
                    }
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input 
                        type="text" 
                        id="password"
                        {
                            ...register('password', {
                                required: "Password không được bỏ trống",
                                minLength: 6,
                            })
                        }
                    />
                    {
                        errors?.password && (
                            <p>{ errors?.password?.message }</p>
                        )
                    }
                </div>
                <button type="submit">Register</button>
            </form>
            </div>

            {/* Footer */}
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

export default Register;
