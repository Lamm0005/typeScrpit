import axios from "axios"
import { useForm, SubmitHandler } from "react-hook-form" //làm việc với form
import { useNavigate } from "react-router-dom";
//joi de validate du lieu
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import "./trangchu.css"

//khai báo các trường dữ liệu trong form
type LoginInput = { 
    email: string,
    password: string,
}

function Login() {
    //khai báo rule validate 
    const validateForm = Joi.object({
        email: Joi.string().required().email({tlds: false}),
        password: Joi.string().required().min(6),
    })
    //khai báo register,handleSubmit để làm việc với form
    const { 
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: joiResolver(validateForm)
    });

    const nav = useNavigate(); //khởi tạo hàm điều hướng

    //khởi tạo hàm onSubmit để đăng ký khi ng dùng bấm nút
    const onSubmitForm:SubmitHandler<LoginInput>=async(data)=>{
        try {
            //call api để đăng ký tài khoản
            const response = await axios.post('http://localhost:3000/login',data);
            //lấy được accessToken trong response.data.accessToken
            //lưu token vào trong localStorage:
            nav('/');
            localStorage.setItem('key', response.data.accessToken);
          
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div>
            <header>
        
        <div className="nav">
            <ul>
                <li><a href="/">TRANG CHỦ</a></li>
                <li><a href="#">SẢN PHẨM</a></li>
                <li><a href="#">ƯU ĐÃI</a></li>
                <li><a href="#">DỊCH VỤ</a></li>
                <li><a href="#">XEM THÊM</a></li>
            </ul>
        </div>
       
        <div className="header">
        </div>
        </header>

            <h1>Login page</h1>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <div>
                    <label htmlFor="">Email</label>
                    <input 
                        type="text" 
                        id="email"
                        {
                            ...register('email')
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
                            ...register('password')
                        }
                    />
                    {
                        errors?.password && (
                            <p>Password không hợp lệ</p>
                        )
                    }
                </div>
                <button type="submit">Login</button>
            </form>
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
    )
}

export default Login