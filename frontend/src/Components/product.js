import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';

const Product = (props) => {
  const { product } = props;
  return (
    <Card key={product.token} className='product-card'>
      <div className='card-image-wrapper'>
        <Link to={`/product/${product.token}`}>
          <img
            className="card-img-top card-image"
            src={product.image}
            alt={product.name}
          ></img>
        </Link>
      </div>      
      <Card.Body>
        <Link to={`/product/${product.token}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} reviews={product.numReviews} />
        <Card.Text>{product.price}</Card.Text>
        <Button className='btn btn-primary'>Add To Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
