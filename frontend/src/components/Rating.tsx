import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RatingProps {
  value: number;
  reviews: number;
}

const Rating: React.FC<RatingProps> = ({ value, reviews }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    return (
      <span key={starValue}>
        {value >= starValue ? (
          <FaStar />
        ) : value >= starValue - 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
    );
  });
  return (
    <div className="rating">
      {stars}
      <span className="rating-text">
        {reviews ? `${reviews} ${reviews === 1 ? "review" : "reviews"}` : ""}
      </span>
    </div>
  );
};

export default Rating;
