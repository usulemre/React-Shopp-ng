import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Raiting from "./Raiting";
import { Store } from "../Store";

function Products(props) {
  const { product } = props;
  const { state, dispatch: crxDispatch } = useContext(Store);

  const addCartHandle = () => {
    crxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: 1 },
    });
  };
  
  return (
    <Card sm={6} md={4} lg={3} className="mb-3">
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.image}
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
          Karta Ekle
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Products;
