import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";

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
  const [{ loading, error, products }, distpach] = useReducer(reducer, {
    products: [],
    loading: false,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      distpach({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/produc");
        distpach({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        distpach({ type: "FETCH_FAIL", payload: error.message });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Product</h1>
      <div className="products">
        {loading ? (
          <p>loading</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          products.map((product) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
