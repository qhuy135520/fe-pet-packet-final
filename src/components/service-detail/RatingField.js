"use client";
import "@/styles/service-detail/rating-field.css";
import { sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function RatingField({ serviceId, setService, service }) {
  const [ratingReview, setRatingReview] = useState({ rating: 0, review: "" });
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const handleRatingChange = (e) => {
    setRatingReview({
      ...ratingReview,
      rating: parseInt(e.target.value),
    });
  };

  const [booking, setBooking] = useState();
  useEffect(() => {
    async function fetchData() {
      if (session) {
        try {
          const resBooking = await sendRequest({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/booking/get-one-booking/${session.user.userId}`,
            body: service.serviceId,
          });
          if (resBooking) {
            setBooking(resBooking.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchData();
  }, [session]);

  const handleReviewChange = (e) => {
    setRatingReview({
      ...ratingReview,
      review: e.target.value,
    });
  };

  function checkExistingReview(userId) {
    let flag = false;
    service.review.map((item) => {
      if (item.user.userId == userId) {
        flag = true;
      }
    });
    return flag;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (session.user === null) {
      toast.error(
        <div>
          <strong>Error Rating</strong>
          <p style={{ color: "white" }}>Please login to review this Service!</p>
        </div>,
        {
          theme: "dark",
        }
      );
    } else if (checkExistingReview(session.user.userId)) {
      toast.error(
        <div>
          <strong>Error Rating</strong>
          <p style={{ color: "white" }}>You have reviewed this service!</p>
        </div>,
        {
          theme: "dark",
        }
      );
    } else if (ratingReview.rating === 0) {
      toast.error(
        <div>
          <strong>Error Rating</strong>
          <p style={{ color: "white" }}>Please at least 1 star!!</p>
        </div>,
        {
          theme: "dark",
        }
      );
    } else if (booking == null) {
      toast.error(
        <div>
          <strong>Error Rating</strong>
          <p style={{ color: "white" }}>
            You cant review if you never use this service before
          </p>
        </div>,
        {
          theme: "dark",
        }
      );
    } else {
      const res = await sendRequest({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/review/add-review`,
        body: {
          rating: ratingReview.rating,
          reviewTxt: ratingReview.review,
          serviceId: serviceId,
          username: session.user.username,
        },
      });

      const resService = await sendRequest({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/services/${serviceId}`,
      });

      setService(resService.data);

      setRatingReview({
        rating: 0,
        review: "",
      });
      toast.success("Review submitted successfully!");

      window.location.reload();
    }
  };

  return (
    <>
      <fieldset className="rating-container">
        <input
          type="radio"
          name="rating"
          id="rate5"
          defaultValue={5}
          onChange={(e) => handleRatingChange(e)}
        />
        <label htmlFor="rate5">
          <svg
            id="Object"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1122 1122"
          >
            <defs></defs>
            <path
              className="cls-2"
              d="m570.497,252.536l93.771,190c1.543,3.126,4.525,5.292,7.974,5.794l209.678,30.468c8.687,1.262,12.156,11.938,5.87,18.065l-151.724,147.895c-2.496,2.433-3.635,5.939-3.046,9.374l35.817,208.831c1.484,8.652-7.597,15.25-15.367,11.165l-187.542-98.596c-3.085-1.622-6.771-1.622-9.857,0l-187.542,98.596c-7.77,4.085-16.851-2.513-15.367-11.165l35.817-208.831c.589-3.436-.55-6.941-3.046-9.374l-151.724-147.895c-6.286-6.127-2.817-16.803,5.87-18.065l209.678-30.468c3.45-.501,6.432-2.668,7.974-5.794l93.771-190c3.885-7.872,15.11-7.872,18.995,0Z"
            />
            <path
              className="cls-1"
              d="m561,296.423l-83.563,161.857c-4.383,8.49-12.797,14.155-22.312,15.024l-181.433,16.562,191.688,8.964c12.175.569,23.317-6.81,27.543-18.243l68.077-184.164Z"
            />
            <path
              className="cls-3"
              d="m357.284,838.933l-4.121,24.03c-1.484,8.652,7.597,15.25,15.367,11.165l187.541-98.596c3.086-1.622,6.771-1.622,9.857,0l187.541,98.596c7.77,4.085,16.851-2.513,15.367-11.165l-35.817-208.831c-.589-3.435.55-6.941,3.046-9.374l151.724-147.894c6.287-6.127,2.818-16.802-5.87-18.065l-70.23-10.205c-113.59,203.853-287.527,311.181-454.405,370.34Z"
            />
          </svg>
        </label>
        <input
          type="radio"
          name="rating"
          id="rate4"
          defaultValue={4}
          onChange={(e) => handleRatingChange(e)}
        />
        <label htmlFor="rate4">
          <svg
            id="Object"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1122 1122"
          >
            <defs></defs>
            <path
              className="cls-2"
              d="m570.497,252.536l93.771,190c1.543,3.126,4.525,5.292,7.974,5.794l209.678,30.468c8.687,1.262,12.156,11.938,5.87,18.065l-151.724,147.895c-2.496,2.433-3.635,5.939-3.046,9.374l35.817,208.831c1.484,8.652-7.597,15.25-15.367,11.165l-187.542-98.596c-3.085-1.622-6.771-1.622-9.857,0l-187.542,98.596c-7.77,4.085-16.851-2.513-15.367-11.165l35.817-208.831c.589-3.436-.55-6.941-3.046-9.374l-151.724-147.895c-6.286-6.127-2.817-16.803,5.87-18.065l209.678-30.468c3.45-.501,6.432-2.668,7.974-5.794l93.771-190c3.885-7.872,15.11-7.872,18.995,0Z"
            />
            <path
              className="cls-1"
              d="m561,296.423l-83.563,161.857c-4.383,8.49-12.797,14.155-22.312,15.024l-181.433,16.562,191.688,8.964c12.175.569,23.317-6.81,27.543-18.243l68.077-184.164Z"
            />
            <path
              className="cls-3"
              d="m357.284,838.933l-4.121,24.03c-1.484,8.652,7.597,15.25,15.367,11.165l187.541-98.596c3.086-1.622,6.771-1.622,9.857,0l187.541,98.596c7.77,4.085,16.851-2.513,15.367-11.165l-35.817-208.831c-.589-3.435.55-6.941,3.046-9.374l151.724-147.894c6.287-6.127,2.818-16.802-5.87-18.065l-70.23-10.205c-113.59,203.853-287.527,311.181-454.405,370.34Z"
            />
          </svg>
        </label>
        <input
          type="radio"
          name="rating"
          id="rate3"
          defaultValue={3}
          onChange={(e) => handleRatingChange(e)}
        />
        <label htmlFor="rate3">
          <svg
            id="Object"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1122 1122"
          >
            <defs></defs>
            <path
              className="cls-2"
              d="m570.497,252.536l93.771,190c1.543,3.126,4.525,5.292,7.974,5.794l209.678,30.468c8.687,1.262,12.156,11.938,5.87,18.065l-151.724,147.895c-2.496,2.433-3.635,5.939-3.046,9.374l35.817,208.831c1.484,8.652-7.597,15.25-15.367,11.165l-187.542-98.596c-3.085-1.622-6.771-1.622-9.857,0l-187.542,98.596c-7.77,4.085-16.851-2.513-15.367-11.165l35.817-208.831c.589-3.436-.55-6.941-3.046-9.374l-151.724-147.895c-6.286-6.127-2.817-16.803,5.87-18.065l209.678-30.468c3.45-.501,6.432-2.668,7.974-5.794l93.771-190c3.885-7.872,15.11-7.872,18.995,0Z"
            />
            <path
              className="cls-1"
              d="m561,296.423l-83.563,161.857c-4.383,8.49-12.797,14.155-22.312,15.024l-181.433,16.562,191.688,8.964c12.175.569,23.317-6.81,27.543-18.243l68.077-184.164Z"
            />
            <path
              className="cls-3"
              d="m357.284,838.933l-4.121,24.03c-1.484,8.652,7.597,15.25,15.367,11.165l187.541-98.596c3.086-1.622,6.771-1.622,9.857,0l187.541,98.596c7.77,4.085,16.851-2.513,15.367-11.165l-35.817-208.831c-.589-3.435.55-6.941,3.046-9.374l151.724-147.894c6.287-6.127,2.818-16.802-5.87-18.065l-70.23-10.205c-113.59,203.853-287.527,311.181-454.405,370.34Z"
            />
          </svg>
        </label>
        <input
          type="radio"
          name="rating"
          id="rate2"
          defaultValue={2}
          onChange={(e) => handleRatingChange(e)}
        />
        <label htmlFor="rate2">
          <svg
            id="Object"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1122 1122"
          >
            <defs></defs>
            <path
              className="cls-2"
              d="m570.497,252.536l93.771,190c1.543,3.126,4.525,5.292,7.974,5.794l209.678,30.468c8.687,1.262,12.156,11.938,5.87,18.065l-151.724,147.895c-2.496,2.433-3.635,5.939-3.046,9.374l35.817,208.831c1.484,8.652-7.597,15.25-15.367,11.165l-187.542-98.596c-3.085-1.622-6.771-1.622-9.857,0l-187.542,98.596c-7.77,4.085-16.851-2.513-15.367-11.165l35.817-208.831c.589-3.436-.55-6.941-3.046-9.374l-151.724-147.895c-6.286-6.127-2.817-16.803,5.87-18.065l209.678-30.468c3.45-.501,6.432-2.668,7.974-5.794l93.771-190c3.885-7.872,15.11-7.872,18.995,0Z"
            />
            <path
              className="cls-1"
              d="m561,296.423l-83.563,161.857c-4.383,8.49-12.797,14.155-22.312,15.024l-181.433,16.562,191.688,8.964c12.175.569,23.317-6.81,27.543-18.243l68.077-184.164Z"
            />
            <path
              className="cls-3"
              d="m357.284,838.933l-4.121,24.03c-1.484,8.652,7.597,15.25,15.367,11.165l187.541-98.596c3.086-1.622,6.771-1.622,9.857,0l187.541,98.596c7.77,4.085,16.851-2.513,15.367-11.165l-35.817-208.831c-.589-3.435.55-6.941,3.046-9.374l151.724-147.894c6.287-6.127,2.818-16.802-5.87-18.065l-70.23-10.205c-113.59,203.853-287.527,311.181-454.405,370.34Z"
            />
          </svg>
        </label>
        <input
          type="radio"
          name="rating"
          id="rate1"
          defaultValue={1}
          onChange={(e) => handleRatingChange(e)}
        />
        <label htmlFor="rate1">
          <svg
            id="Object"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1122 1122"
          >
            <defs></defs>
            <path
              className="cls-2"
              d="m570.497,252.536l93.771,190c1.543,3.126,4.525,5.292,7.974,5.794l209.678,30.468c8.687,1.262,12.156,11.938,5.87,18.065l-151.724,147.895c-2.496,2.433-3.635,5.939-3.046,9.374l35.817,208.831c1.484,8.652-7.597,15.25-15.367,11.165l-187.542-98.596c-3.085-1.622-6.771-1.622-9.857,0l-187.542,98.596c-7.77,4.085-16.851-2.513-15.367-11.165l35.817-208.831c.589-3.436-.55-6.941-3.046-9.374l-151.724-147.895c-6.286-6.127-2.817-16.803,5.87-18.065l209.678-30.468c3.45-.501,6.432-2.668,7.974-5.794l93.771-190c3.885-7.872,15.11-7.872,18.995,0Z"
            />
            <path
              className="cls-1"
              d="m561,296.423l-83.563,161.857c-4.383,8.49-12.797,14.155-22.312,15.024l-181.433,16.562,191.688,8.964c12.175.569,23.317-6.81,27.543-18.243l68.077-184.164Z"
            />
            <path
              className="cls-3"
              d="m357.284,838.933l-4.121,24.03c-1.484,8.652,7.597,15.25,15.367,11.165l187.541-98.596c3.086-1.622,6.771-1.622,9.857,0l187.541,98.596c7.77,4.085,16.851-2.513,15.367-11.165l-35.817-208.831c-.589-3.435.55-6.941,3.046-9.374l151.724-147.894c6.287-6.127,2.818-16.802-5.87-18.065l-70.23-10.205c-113.59,203.853-287.527,311.181-454.405,370.34Z"
            />
          </svg>
        </label>
        <div className="rating-value"></div>
      </fieldset>
      <textarea
        placeholder="Review"
        className="form-control"
        name="review"
        required
        value={ratingReview.review}
        onChange={(e) => handleReviewChange(e)}
        style={{ marginBottom: "20px" }}
      ></textarea>
      <button
        type="submit"
        className="site-btn"
        onClick={(e) => handleSubmit(e)}
      >
        Submit Now
      </button>
    </>
  );
}
