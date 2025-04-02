"use client";
import calculateAverage from "@/utils/calculateAverage";
import convertEnumToString from "@/utils/convertEnumToString";
import StarRating from "../services/StarRating";
import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Preloder from "../Preloder";

export default function ServiceSection({ service }) {
  const ratingArr = service.review?.map((review) => review.rating);
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  const router = useRouter();

  // const ratingAvg =  calculateAverage(ratingArr);

  const ratingAvg = useMemo(() => calculateAverage(ratingArr), [ratingArr]);

  function handleClick(e) {
    setLoading(true);
    e.preventDefault();
    router.push(`/booking/${service.serviceId}`);
  }

  if (loading) {
    <Preloder />;
  }
  return (
    <>
      <section
        className="listing-hero set-bg"
        data-setbg="img/listing/details/listing-hero.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="listing__hero__option">
                <div className="listing__hero__icon">
                  {service.user.userPicture == null ? (
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
                      src={service.user.userPicture}
                      alt=""
                    />
                  )}
                </div>
                <div className="listing__hero__text">
                  <h2>
                    {service.user.name} - {service.serviceCategory.name}
                  </h2>
                  <div className="listing__hero__widget">
                    {service.review.length !== 0 ? (
                      <>
                        <div className="listing__hero__widget__rating">
                          <StarRating averageRating={ratingAvg} />
                        </div>
                        <div>{service.review?.length} Reviews</div>
                      </>
                    ) : (
                      <>
                        <div className="mb-2">No reviews yet</div>
                      </>
                    )}
                  </div>
                  <p>
                    <span className="icon_pin_alt"></span> {service.address},
                    {convertEnumToString(service.city)}
                  </p>
                </div>
              </div>
            </div>
            {session?.user.userId !== service?.user.userId && (
              <div className="col-lg-4">
                <div className="listing__hero__btns">
                  <a href="#" className="primary-btn share-btn">
                    <i className="fa fa-mail-reply"></i> Contact
                  </a>
                  <Link
                    onClick={(e) => handleClick(e)}
                    href="#"
                    className="primary-btn"
                  >
                    <i className="fa-solid fa-calendar-days"></i> Book Now
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
