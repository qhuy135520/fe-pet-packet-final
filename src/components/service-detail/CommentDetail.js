import Image from "next/image";
import StarRating from "../services/StarRating";
import formatDate from "@/utils/formatDate";

export default function CommentDetail({review}) {
  return (
    <>
      <div className="listing__details__comment__item">
        <div className="listing__details__comment__item__pic">
        { review?.user?.userPicture == undefined || review?.user?.userPicture == null ? (
                    <Image
                      style={{ borderRadius: "50%" }}
                      width={132}
                      height={132}
                      src="/img/user/default-avatar.png"
                      alt=""
                    />
                  ) : (
                    <Image
                      style={{ borderRadius: "50%" }}
                      width={132}
                      height={132}
                      src={review.user.userPicture}
                      alt=""
                    />
                  )}
        </div>
        <div className="listing__details__comment__item__text">
          <div className="listing__details__comment__item__rating">
          <StarRating averageRating={review.rating} />
          </div>
          <span>{formatDate(review.reviewDate)}</span>
          <h5>{review.user.name}</h5>
          <p>
            {review.reviewText}
          </p>
          {/* <ul>
            <li>
              <i className="fa fa-hand-o-right"></i> Like
            </li>
            <li>
              <i className="fa fa-share-square-o"></i> Reply
            </li>
          </ul> */}
        </div>
      </div>
    </>
  );
}
