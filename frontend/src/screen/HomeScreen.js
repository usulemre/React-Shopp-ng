import React, { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import { Col, Container, Row } from "react-bootstrap";
import Products from "../components/Products";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, distpach] = useReducer(logger(reducer), {
    products: [],
    loading: false,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      distpach({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/product");
        distpach({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        distpach({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h1>Product</h1>
      <Row>
        {loading ? (
          <p>loading</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          products.map((product) => (
            <Col sm={6} md={4} lg={3} className="mb-3">
              <Products product={product} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default HomeScreen;
