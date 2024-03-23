import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { Badge, Nav } from "react-bootstrap";
import { useContext } from "react";
import { Store } from "./Store";
import { CartScreen } from "./screen/CartScreen";
import { Signin } from "./screen/Signin";
function App() {
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 min">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand href="#home">Shopping</Navbar.Brand>
              </LinkContainer>
              <Nav className="justify-content-end">
                <Link to="cart" className="nav-link">
                  Sepet
                  {cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main className="flex-grow-1 mt-2">
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
        <footer className="text-center bg-black text-white">Footer</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
