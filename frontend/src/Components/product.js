import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <Col lg={3} md={4} sm={6} className="mb-3">
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
    </Col>
  );
};

export default Product;
