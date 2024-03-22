import React from "react";
import { data } from "../data";

function HomeScreen() {
  return (
    <div>
      <h1>Product</h1>
      <div className="products">
        {data.product.map((product) => (
          <div className="product" key={product.name}>
            <a href={`/product/slug/${product.slug}`}>
              <img src={product.image} />
            </a>
            <div className="product-info">
              <a href={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </a>

              <p>
                <strong>{product.price}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
