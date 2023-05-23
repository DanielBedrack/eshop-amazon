import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import { Store } from '../../Context/Store';

const Navbar = () => {
  const { state } = useContext(Store);
  const { cart } = state;
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className='my-navbar'>
      <NavBar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <NavBar.Brand>
              EShop
              {!isHomePage && (
                <span style={{ color: 'white', marginLeft: '5rem' }}>
                  <Link
                    to="/"
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    Home
                  </Link>
                </span>
              )}
            </NavBar.Brand>
          </LinkContainer>
          <Nav className="ms-auto w-50 d-flex align-items-center">
            <Link to="/cart" className="nav-link">
              <i className="fas fa-shopping-cart text-white"> </i>
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
          </Nav>
        </Container>
      </NavBar>
    </header>
  );
};

export default Navbar;
