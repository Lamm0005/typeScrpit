import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './trangchu.css'
type ProductInput = {
    id:number,
    name: string,
    price: number,
    image: string,
}

function Create() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<ProductInput>();

    const nav = useNavigate();
    const onCreate: SubmitHandler<ProductInput> = async (data) => {
        try {
            //B1: call api
            const response = await axios.post('http://localhost:3000/products', data);
            if (response.status == 201) {
                alert('Thêm mới thành công');
                nav('/');
            }
        } catch (error) {
            console.log(error)
        }
    }

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

        <div>
            <h1>Create Form</h1>
            <form onSubmit={handleSubmit(onCreate)}>
    <div>
        <label htmlFor="name">Name</label>
        <input 
            type="text" 
            {...register('name', { required: "Vui lòng nhập tên sản phẩm" })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
    </div>
    
    <div>
        <label htmlFor="price">Price</label>
        <input 
            type="number" 
            {...register('price', { 
                required: "Vui lòng nhập giá sản phẩm", 
                min: { value: 1, message: "Giá phải lớn hơn 0" }
            })}
        />
        {errors.price && <p className="error">{errors.price.message}</p>}
    </div>
    
    <div>
        <label htmlFor="image">Image</label>
        <input 
            type="text" 
            {...register('image', { required: "Vui lòng nhập đường dẫn hình ảnh" })}
        />
        {errors.image && <p className="error">{errors.image.message}</p>}
    </div>

    <button type="submit">Create</button>
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



     
    )
}

export default Create