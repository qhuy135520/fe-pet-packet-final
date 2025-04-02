"use client";
import StarRating from "@/components/services/StarRating";
import CommentDetail from "./CommentDetail";
import { useState } from "react";

export default function RatingDetail({ reviews, ratingAvg }) {
  const [filterReview, setFilterReview] = useState(reviews);
  function handleButtonFilter(starRating) {
    if (starRating === 0) {
      setFilterReview(reviews);
    } else {
      const filteredReview = reviews.filter(
        (item) => item.rating === starRating
      );
      setFilterReview(filteredReview);
    }
  }

  return (
    <>
      <div className="listing__details__rating">
        <h4>Rate</h4>
        <div className="listing__details__rating__overall">
          <h2>{ratingAvg.toFixed(1)}</h2>
          <div className="listing__details__rating__star">
            <StarRating averageRating={ratingAvg} />
          </div>
          <span>({reviews?.length} reviews)</span>
        </div>
        <div className="listing__details__rating__filter">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => handleButtonFilter(0)}
          >
            All
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => handleButtonFilter(5)}
          >
            5 Stars
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => handleButtonFilter(4)}
          >
            4 Stars
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => handleButtonFilter(3)}
          >
            3 Stars
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => handleButtonFilter(2)}
          >
            2 Stars
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => handleButtonFilter(1)}
          >
            1 Stars
          </button>
        </div>
        {/* <div className="listing__details__rating__bar">
                    <div className="listing__details__rating__bar__item">
                      <span>4.4</span>
                      <div id="bar1" className="barfiller">
                        <span className="fill" data-percentage="100"></span>
                      </div>
                      <span className="right">Quality</span>
                    </div>
                    <div className="listing__details__rating__bar__item">
                      <span>3.9</span>
                      <div id="bar2" className="barfiller">
                        <span className="fill" data-percentage="75"></span>
                      </div>
                      <span className="right">Price</span>
                    </div>
                    <div className="listing__details__rating__bar__item">
                      <span>4.2</span>
                      <div id="bar3" className="barfiller">
                        <span className="fill" data-percentage="80"></span>
                      </div>
                      <span className="right">Space</span>
                    </div>
                    <div className="listing__details__rating__bar__item">
                      <span>4.8</span>
                      <div id="bar4" className="barfiller">
                        <span className="fill" data-percentage="80"></span>
                      </div>
                      <span className="right">Service</span>
                    </div>
                    <div className="listing__details__rating__bar__item">
                      <span>4.0</span>
                      <div id="bar5" className="barfiller">
                        <span className="fill" data-percentage="85"></span>
                      </div>
                      <span className="right">Location</span>
                    </div>
                  </div> */}
      </div>
      <div className="listing__details__comment">
        <h4>Comment</h4>
        {filterReview?.length === 0 && (
          <p className="mb-5 text-center">No result was found!</p>
        )}
        {filterReview.map((review) => {
          return <CommentDetail key={review.reviewId} review={review} />;
        })}
      </div>
    </>
  );
}
