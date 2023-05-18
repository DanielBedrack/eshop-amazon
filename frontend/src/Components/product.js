import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import { Store } from '../Context/Store';
import { useContext } from 'react';

const Product = (props) => {
  const navigate = useNavigate();
  // Adding element to Cart
  const { state, dispatch: cxtDispatch } = useContext(Store);
  const { product } = props;
  console.log(product)
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x.id === product.id);

    const quantity = existItem ? existItem.quantity + 1 : 1;

    // const {data} = await

    if (product.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');

      return;
    }

    cxtDispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity: quantity },
    });
    navigate('/cart');
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
        <Link to={`/product/${product.token}`}>
          <Card.Title>{product.title}</Card.Title>
        </Link>
        <Card.Text>{product.price + '$'}</Card.Text>
        <Rating rating={product.rating.rate} reviews={product.rating.count} />
        {product.countInStock > 0 ? (
          <Button onClick={addToCartHandler}>Add to card</Button>
        ) : (
          <Button onClick={addToCartHandler} variant="white" disabled={true}>
            Out of Stock
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
