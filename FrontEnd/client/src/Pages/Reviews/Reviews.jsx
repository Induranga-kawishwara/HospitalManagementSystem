import React, { useEffect, useState } from "react";
import style from "./reviews.module.css";
import axios from "axios";

function Reviews() {
  const [customerReviews, setCustomerReviews] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/reviews");
        setCustomerReviews(result.data);
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
    <div className={style.review_section} id="reviews">
      <div className={style.rw_text_content}>
        <p className={style.rw_text_title}>
          More over <span className={style.rw_text_num}>1500+ Customers</span>
        </p>

        <p className={style.rw_text_desc}>
          Don't believe us, Check clients word
        </p>

        <p className={style.rw_text_format}>
          <span className={style.rw_text_quote1}>''</span>
          <span className={style.rw_review}>{review}</span>
          <span className={style.rw_text_quote2}>''</span>
        </p>

        <div className={style.rw_authors}>
          <div className={style.rw_names}>
            <p className={style.rw_reviewer_name}>{fullName}</p>
            <p className={style.rw_reviewer_place}>{hospitalBranch}</p>
          </div>

          <div className={style.rw_btns}>
            <button
              className={style.rw_next_btn}
              type="button"
              onClick={() => moveReview(-1)}
            >
              ←
            </button>
            <button
              className={style.rw_next_btn}
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
