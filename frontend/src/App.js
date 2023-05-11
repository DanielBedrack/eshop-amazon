import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';
import Container from 'react-bootstrap/Container'
import NavBar from 'react-bootstrap/NavBar';
import { LinkContainer } from 'react-router-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-fullpage">
        <header>
          <NavBar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <NavBar.Brand>EShop</NavBar.Brand>
              </LinkContainer>
            </Container>
          </NavBar>
        </header>
        <main>
          <Container>
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
