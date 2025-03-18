import axios from "axios";
import { Product } from "../types/Product";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | undefined>();
  const getDetail = async (id: string) => {
    const { data } = await axios.get(`http://localhost:3000/products/${id}`);
    setProduct(data);
  };

  useEffect(() => {
    if (!id) return;
    getDetail(id);
  }, [id]);

  return (
    <div>
      <button onClick={() => navigate("/")} className="btn btn-primary position-absolute top-0 start-0 m-3">
        Back
      </button>
      <p>
        <img src={product?.image} alt="" width={"500px"} />
      </p>
      <p>Name: {product?.name}</p>
      <p>Price: {product?.price}</p>
    </div>
  );
}

export default Detail;
