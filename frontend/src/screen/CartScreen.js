import React, { useContext } from "react";
import { Store } from "../Store";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import MessageBox from "../components/MessageBox";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const CartScreen = () => {
  const navigation = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHanle = async (item, quantity) => {

    const { data } = await axios.get(`/api/product/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Uzgunuz Stok Mevcut Degil");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const deleteCartHandle = (item) => {
    ctxDispatch({ type: "CART_DELETE_ITEM", payload: item });
  };
  const chechoutHandle = () => {
    navigation("/signin?redirect=/shipping");
  };
  return (
    <Container>
      <h1>Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Kartınız da urun bulunmuyor.<Link to={"/"}>Urun sayfası</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col xs={12} sm={3} md={3}>
                      <img
                        src={item.images}
                        alt={item.images}
                        className="img-fluid rounded"
                        style={{ height: "80px" }}
                      />
                    </Col>
                    <Col xs={4} sm={2} md={3}>
                      <Link
                        to={`/product/${item.slug}`}
                        style={{
                          fontSize: "12px",
                          display: "block", // Küçük ekranlarda alt alta gelmesi sağlanıyor
                          marginTop: "5px", // İçeriğin üst boşluğu
                        }}
                      >
                        {item.name}
                      </Link>
                      <div className="d-block d-sm-none">
                        {" "}
                        {/* Küçük ekranlarda sadece görünsün */}
                        {item.price}TL
                      </div>
                    </Col>
                    <Col xs={4} sm={3} md={2}>
                      <div className="d-flex align-items-center">
                        <Button
                          onClick={() =>
                            updateCartHanle(item, item.quantity - 1)
                          }
                          variant="light"
                          size="sm"
                          disabled={item.quantity === 1}
                        >
                          <i
                            className="fa fa-minus-circle"
                            aria-hidden="true"
                          ></i>
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                          variant="light"
                          size="sm"
                          disabled={item.quantity === cartItems.countInStock}
                          onClick={() =>
                            updateCartHanle(item, item.quantity + 1)
                          }
                        >
                          <i
                            className="fa fa-plus-circle"
                            aria-hidden="true"
                          ></i>
                        </Button>
                      </div>
                    </Col>
                    <Col sm={2} className="d-none d-sm-block">
                      {" "}
                      {/* Küçük ekranlarda görünmüyor */}
                      {item.price}TL
                    </Col>
                    <Col xs={4} sm={2} className="">
                      {" "}
                      {/* Küçük ekranlarda boşluk eklemek için */}
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => deleteCartHandle(item)}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4} className=" mt-3 mt-md-0">
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Toplam {cartItems.reduce((a, b) => a + b.quantity, 0)}(Urun)
                    : {cartItems.reduce((a, b) => a + b.price * b.quantity, 0)}
                    TL
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onClick={chechoutHandle}
                    disabled={cartItems.length === 0}
                    variant="primary"
                    className="btn-warning w-100"
                  >
                    Odeme
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
