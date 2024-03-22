import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Raiting from "./Raiting";

function Products(props) {
  const { product } = props;
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
        <Button className="btn-warning">Karta Ekle</Button>
      </Card.Body>
    </Card>
  );
}

export default Products;
