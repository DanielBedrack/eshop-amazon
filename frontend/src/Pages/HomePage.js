import { Link } from 'react-router-dom';
//import data from '../data';
import { useEffect, useState } from 'react';
import axios from 'axios'

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_REQUEST':
      return { ...state, loading: true };
    case 'GET_SUCCSESS':
      return { ...state, products: action.payload, loading: false };
    case 'GET_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const HomePage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
  
    const getProducts = async() => {
      const res = await axios.get('/api/v1/products');
      setProducts(res.data);
    };

    getProducts();
  }, [])


  return (
    <div className="App">
      <main>
        <h1>Products</h1>
        <div className="products">
          {products.map((product) => (
            <div className="product" key={product.token}>
              <Link to={`/product/${product.token}`}>
                <img src={product.image} alt={product.name}></img>
              </Link>
              <div className="product-desk">
                  <p>{product.name}</p>
                <strong>
                  <p>{product.price}</p>
                </strong>
                <button>Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
