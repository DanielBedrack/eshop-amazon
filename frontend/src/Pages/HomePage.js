import { Link } from "react-router-dom";
import data from "../data";

function HomePage() {
  return (
    <div className="App">
      <main>
        <h1>Products</h1>
        <div className="products">
          {data.products.map((product) => (
            <div className="product" key={product.token}>
              <div>
                <Link to={`/product/${product.token}`}>
                  <img src={product.image} alt={product.name}></img>
                </Link>
              </div>
              <div className="product-desk">
                <Link to={`/product/${product.token}`}>
                  <p>{product.name}</p>
                </Link>
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
