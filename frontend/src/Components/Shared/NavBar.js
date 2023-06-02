import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Nav, NavDropdown } from 'react-bootstrap';
import { useContext } from 'react';
import { Store } from '../../Context/Store';
import { USER_SIGNOUT } from '../../Actions';
import SearchBox from './SearchBox';

const Navbar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const signoutHandler = () => {
    ctxDispatch({type: USER_SIGNOUT});
    localStorage.removeItem('userInfo')
  };



  return (
    <header className="my-navbar">
      <NavBar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <NavBar.Brand>
              <img
                src="../../images/logo.png"
                style={{ width: '180px'}}
                alt="amazon-logo"
              />
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
          <SearchBox />
          <Nav className="ms-auto w-50 justify-content-end">
            <Link to="/cart" className="nav-link">
              <i className="fas fa-shopping-cart"> </i>
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
              <NavDropdown
                title={(userInfo.name).split(" ")[0]}
                id="basic-nav-dropdown"
                style={{ color: 'white' }}
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link className="nav-link text-white" to="/signin">
                Sign In
              </Link>
            )}
          </Nav>
        </Container>
      </NavBar>
    </header>
  );
};

export default Navbar;
