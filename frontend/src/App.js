import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';
import Container from 'react-bootstrap/Container';
import NavBar from 'react-bootstrap/NavBar';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/esm/Badge';
import { useContext } from 'react';
import { Store } from './Context/Store';

function App() {
  const {state} = useContext(Store);
  const {cart} = state;

  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-fullpage">
        <header>
          <NavBar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <NavBar.Brand>EShop</NavBar.Brand>
              </LinkContainer>
              <nav className="ms-auto w-50 justify-content-end">
                <Link to="/cart" className="nav-link">
                  <i className="fas fa-shopping-cart cart-color"></i>
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce(
                        (allItems, currentItem) => allItems + currentItem.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </nav>
            </Container>
          </NavBar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:token" element={<ProductPage />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
