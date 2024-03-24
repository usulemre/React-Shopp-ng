import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Raiting from "./Raiting";
import { Store } from "../Store";
import axios from "axios";

function Products(props) {
  const { product } = props;
  const { state, dispatch: crxDispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const addCartHandle = async () => {
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/product/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Urun stok adetini astiniz");
    } else {
      crxDispatch({
        type: "CART_ADD_ITEM",
        payload: { ...product, quantity },
      });
    }
  };

  return (
    <Card sm={6} md={4} lg={3} className="mb-3">
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.images}
          alt={product.images}
          className="card-img-top"
          style={{ height: "500px", objectFit: "cover" }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Raiting rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>{product.price}TL</Card.Text>
        <Button onClick={addCartHandle} className="btn-warning">
          Sepete Ekle
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Products;
