import React from "react";

function Raiting(props) {
  const { rating, numReviews } = props;
  return (
    <div className="raiting ">
      <span className="text-warning">
        <i
          className={
            rating >= 1
              ? "fas fa-star"
              : rating >= 0.5
              ? "fas fa-star-half-o"
              : "far fa-star"
          }
          aria-hidden="true"
        ></i>
      </span>
      <span className="text-warning">
        <i
          className={
            rating >= 2
              ? "fas fa-star"
              : rating >= 1.5
              ? "fas fa-star-half-o"
              : "far fa-star"
          }
          aria-hidden="true"
        ></i>
      </span>
      <span className="text-warning">
        <i
          className={
            rating >= 3
              ? "fas fa-star"
              : rating >= 2.5
              ? "fas fa-star-half-o"
              : "far fa-star"
          }
          aria-hidden="true"
        ></i>
      </span>
      <span className="text-warning">
        <i
          className={
            rating >= 4
              ? "fas fa-star"
              : rating >= 3.5
              ? "fas fa-star-half-o"
              : "far fa-star"
          }
          aria-hidden="true"
        ></i>
      </span>
      <span className="text-warning">
        <i
          className={
            rating >= 5
              ? "fa fa-star"
              : rating >= 4.5
              ? "fas fa-star-half-o"
              : "far fa-star"
          }
          aria-hidden="true"
        ></i>
      </span>
      <span className="text-warning">{numReviews} oy</span>
    </div>
  );
}

export default Raiting;
