import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";
import Raiting from "../components/Raiting";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      break;
  }
};

function ProductScreen() {
  const { slug } = useParams();

  const [{ product, loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
    product: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/product/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchData();
  }, [slug]);
  return (
    <Container>
      {loading ? (
        <p>loading</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Row>
          <Col md={6}>
            <img src={product.image} className="mw-100" alt={product.slug} />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Raiting
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Fiyat:{product.price}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Acıklama:{product.description}</strong>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Fiyat:</strong>
                      </Col>
                      <Col>
                        <strong>{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Stok:</strong>
                      </Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">
                            <strong>{product.countInStock}</strong>
                          </Badge>
                        ) : (
                          <Badge bg="danger">
                            <strong>Stok Yok</strong>
                          </Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Button variant="primary" className="btn-warning w-100">
                        Sepete Ekle
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ProductScreen;
