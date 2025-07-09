import  { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productService';
import ProductCard from '../../components/ProductCard';
import './Home.css';

export default function Home() {
  const [productList, setProductList] = useState([]);

  const getProducts = async () => {
    const products = await getAllProducts({}, {}, {});
    setProductList(products);
    console.log(products);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="product-list-container">
      <div className="product-list-grid">
        {Array.isArray(productList) && productList.map((product, index) => (
          <ProductCard details={product} key={index} />
        ))}
      </div>
    </div>
  );
}
