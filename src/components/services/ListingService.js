import { getCoordinates } from "@/utils/getCoordinates";
import StarRating from "./StarRating";
import Link from "next/link";
import serviceStyles from "@/styles/services/service.module.css";
import convertEnumToString from "@/utils/convertEnumToString";
import calculateAverage from "@/utils/calculateAverage";

export default function ListingService({ service, setLocation }) {
  const ratingArr = service?.review.map((review) => review.rating);

  const ratingAvg = calculateAverage(ratingArr);

  // async function handleOnclick(e) {
  //   e.preventDefault();
  //   const location = await getCoordinates(service.address);
  //   setLocation(location);
  // }

  return (
    <div className="listing__item">
      <div
        className="listing__item__pic set-bg"
        style={{
          backgroundImage: `url('${service.servicePictures[0].pictureTxt}')`,
        }}
      >
        {service?.user.userPicture == null ? (
          <img src="img/user/default-avatar.png" alt="" />
        ) : (
          <img src={service.user.userPicture} />
        )}
        {/* <div className="listing__item__pic__tag">Popular</div> */}
        <div className="listing__item__pic__btns">
          <a href="#">
            <span
              className="icon_zoom-in_alt"
              // onClick={(e) => handleOnclick(e)}
            ></span>
          </a>
          <a href="#">
            <span className="icon_heart_alt"></span>
          </a>
        </div>
      </div>
      <div className="listing__item__text">
        <div className="listing__item__text__inside">
          <h5>
            {service.user.name} - {service.name}
          </h5>
          <div className="listing__item__text__rating">
            <div className="listing__item__rating__star">
              <StarRating averageRating={ratingAvg} />
            </div>
            <h6>
              From only: {service.serviceDetails[0].price.toLocaleString()}
              <i className="fa-solid fa-dong-sign"></i>
            </h6>
          </div>
          <ul>
            <li>
              <span className="icon_pin_alt"></span>
              {service.address + ", " + convertEnumToString(service.city)}
            </li>
            <li>
              <span className="icon_phone"></span> {service.user.phone}
            </li>
          </ul>
        </div>
        <div className="listing__item__text__info">
          <div className="listing__item__text__info__left">
            <img src={service.serviceCategory.pictureTxt} alt="" />
            <span>{service.serviceCategory.name}</span>
          </div>
          <div className="listing__item__text__info__right">
            <Link
              className={serviceStyles["direct-service"]}
              href={`/service-detail/${service.serviceId}`}
            >
              Book Now <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
