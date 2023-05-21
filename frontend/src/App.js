import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';
import CartPage from './Pages/CartPage';
import Container from 'react-bootstrap/Container';
import SigningPage from './Pages/SigningPage';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allpage">
        <Navbar />
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:token" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/signin" element={<SigningPage />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
