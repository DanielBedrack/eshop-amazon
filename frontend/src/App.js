import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';
import CartPage from './Pages/CartPage';
import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import { Store } from './Context/Store';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allpage">
        <header>
          <NavBar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <NavBar.Brand>EShop</NavBar.Brand>
              </LinkContainer>
              <Nav className="ms-auto w-50 d-flex justify-content-end">
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
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:token" element={<ProductPage />} /> 
              <Route path="/cart" element={<CartPage />} /> 
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All Rights Reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
