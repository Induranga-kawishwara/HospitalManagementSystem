import React, { useEffect, useState } from "react";
import "./Reviews.css";
import axios from "axios";

function Reviews() {
  const [customerReviews, setcustomerReviews] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/reviews");
        setcustomerReviews(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleReviewsUpdation = () => {
    const reviewMessage = customerReviews[reviewIndex] || {};
    const { fullName, hospitalBranch, review } = reviewMessage;
    return { fullName, hospitalBranch, review };
  };

  const { fullName, hospitalBranch, review } = handleReviewsUpdation();

  const moveReview = (step) => {
    setReviewIndex(
      (prevIndex) =>
        (prevIndex + step + customerReviews.length) % customerReviews.length
    );
  };

  return (
    <div className="review-section" id="reviews">
      <div className="rw-text-content">
        <p className="rw-text-title">
          More over <span className="rw-text-num">1500+ Customers</span>
        </p>

        <p className="rw-text-desc">Don't believe us, Check clients word</p>

        <p className="rw-text-format">
          <span className="rw-text-quote1">''</span>
          <span className="rw-review">{review}</span>
          <span className="rw-text-quote2">''</span>
        </p>

        <div className="rw-authors">
          <div className="rw-names">
            <p className="rw-reviewer-name">{fullName}</p>
            <p className="rw-reviewer-place">{hospitalBranch}</p>
          </div>

          <div className="rw-btns">
            <button
              className="rw-next-btn"
              type="button"
              onClick={() => moveReview(-1)}
            >
              ←
            </button>
            <button
              className="rw-next-btn"
              type="button"
              onClick={() => moveReview(1)}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
