import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem("users") || "{}");

  // Kiểm tra nếu người dùng không tồn tại hoặc không phải admin
  if (!users || users.role !== "admin") {
    alert("Bạn không có quyền truy cập!");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
