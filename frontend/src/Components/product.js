import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import { Store } from '../Context/Store';
import { useContext } from 'react';
import { CallingAddToCartHandler } from '../Utils';

const Product = (props) => {
  // Adding element to Cart
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { product } = props;
  const { cart } = state;

  const addToCartHandler = () => {
    CallingAddToCartHandler(product, cart, ctxDispatch);
  };

  return (
    <Card className="product-card">
      <div className="div-img">
        <Link to={`/product/${product.token}`}>
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.title}
          ></Card.Img>
        </Link>
      </div>
      <Card.Body>
        <Link to={`/product/${product.token}`} className="product-title">
          <Card.Title>{product.title}</Card.Title>
        </Link>
        <Card.Text>
          <strong>{product.price + '$'}</strong>
        </Card.Text>
        <Rating rating={product.rating.rate} reviews={product.rating.count} />
        {product.countInStock > 0 ? (
          <Button onClick={addToCartHandler}>Add to cart</Button>
        ) : (
          <Button variant="white" disabled={true}>
            Out of Stock
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
