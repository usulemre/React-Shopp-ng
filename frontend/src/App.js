import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { Badge, Nav, NavDropdown } from "react-bootstrap";
import { useContext } from "react";
import { Store } from "./Store";
import { CartScreen } from "./screen/CartScreen";
import { Signin } from "./screen/Signin";
import { ToastContainer } from "react-toastify";
import Shopping from "./screen/Shopping";

function App() {
  const { state, dispatch: ctxDistpach } = useContext(Store);
  const { cart, userInfo } = state;
  const logoutHandle = () => {
    ctxDistpach({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shoppingAddress");
  };
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} theme="dark" />
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
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo !== null ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/action1">
                      <NavDropdown.Item>Action 1</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/action2">
                      <NavDropdown.Item>Action 2</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandle}>
                      Çıkış Yap
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/signin">
                    <Nav.Link>Giriş Yap</Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main className="flex-grow-1 mt-2">
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/shopping" element={<Shopping />} />
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
