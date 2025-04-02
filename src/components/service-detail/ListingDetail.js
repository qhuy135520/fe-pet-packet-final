"use client";
import convertEnumToString from "@/utils/convertEnumToString";
import { getCoordinates } from "@/utils/getCoordinates";
import Map from "../Map";
import CommentDetail from "./CommentDetail";
import calculateAverage from "@/utils/calculateAverage";
import Amentities from "./Amentities";
import Image from "next/image";
import StarRating from "../services/StarRating";
import RatingDetail from "./RatingDetail";
import RatingField from "./RatingField";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ListingDetail({ service, setService }) {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const { data: session, status } = useSession();

  useEffect(() => {
    async function fetchCoordinates() {
      const location = await getCoordinates(service.address, service.name);
      setLocation({ lat: location.coords[1], lng: location.coords[0] });
    }

    fetchCoordinates();
  }, [service.address]);
  const ratingArr = service.review?.map((review) => review.rating);
  const ratingAvg = calculateAverage(ratingArr);

  return (
    <>
      <section className="listing-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="listing__details__text">
                <div className="listing__details__about">
                  <h4>Overview</h4>
                  <p>{service.overview}</p>
                </div>
                <div className="listing__details__gallery">
                  <h4>Gallery</h4>
                  <img src={service.servicePictures[0].pictureTxt} />
                </div>
                <div className="listing__details__gallery">
                  <h4>Dog: Price By Weight</h4>
                  <div className="listing__details__gallery__pic">
                    <div>
                      <table className="table text-center">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Weight(kg)</th>
                            <th>Duration(hour)</th>
                            <th>Price(VND)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {service.serviceDetails?.map(
                            (serviceDetail, index) => {
                              if (serviceDetail.petType.petTypeId === 1) {
                                return (
                                  <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>
                                      {serviceDetail.weightMin}-
                                      {serviceDetail.weightMax}kg
                                    </td>
                                    <td>
                                      {serviceDetail.timeDuration}{" "}
                                      {serviceDetail.timeUnit}
                                    </td>
                                    <td>
                                      {serviceDetail.price.toLocaleString()} VND
                                    </td>
                                  </tr>
                                );
                              }
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                    {/* <div className="listing__details__gallery__item">
                      <img
                        className="listing__details__gallery__item__large"
                        src="/img/listing/details/listing-details-1.jpg"
                        alt=""
                      />
                      <span>
                        <i className="fa fa-camera"></i> 170 Image
                      </span>
                    </div>
                    <div className="listing__details__gallery__slider owl-carousel">
                      <img src="/img/listing/details/thumb-1.jpg" alt="" />
                      <img src="/img/listing/details/thumb-2.jpg" alt="" />
                      <img src="/img/listing/details/thumb-3.jpg" alt="" />
                      <img src="/img/listing/details/thumb-4.jpg" alt="" />
                    </div> */}
                  </div>
                </div>
                <div className="listing__details__gallery">
                  <h4>Cat: Price By Weight</h4>
                  <div className="listing__details__gallery__pic">
                    <div>
                      <table className="table text-center">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Weight(kg)</th>
                            <th>Duration(hour)</th>
                            <th>Price(VND)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {service.serviceDetails?.map(
                            (serviceDetail, index) => {
                              if (serviceDetail.petType.petTypeId === 2) {
                                return (
                                  <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>
                                      {serviceDetail.weightMin}-
                                      {serviceDetail.weightMax}kg
                                    </td>
                                    <td>
                                      {serviceDetail.timeDuration}{" "}
                                      {serviceDetail.timeUnit}
                                    </td>
                                    <td>
                                      {serviceDetail.price.toLocaleString()} VND
                                    </td>
                                  </tr>
                                );
                              }
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                    {/* <div className="listing__details__gallery__item">
                      <img
                        className="listing__details__gallery__item__large"
                        src="/img/listing/details/listing-details-1.jpg"
                        alt=""
                      />
                      <span>
                        <i className="fa fa-camera"></i> 170 Image
                      </span>
                    </div>
                    <div className="listing__details__gallery__slider owl-carousel">
                      <img src="/img/listing/details/thumb-1.jpg" alt="" />
                      <img src="/img/listing/details/thumb-2.jpg" alt="" />
                      <img src="/img/listing/details/thumb-3.jpg" alt="" />
                      <img src="/img/listing/details/thumb-4.jpg" alt="" />
                    </div> */}
                  </div>
                </div>
                {service?.serviceAddons.length > 0 && (
                  <Amentities service={service} />
                )}
                <RatingDetail reviews={service.review} ratingAvg={ratingAvg} />
                <div className="listing__details__review">
                  {service.user.userId != session?.user.userId && (
                    <>
                      <h4>Add Review</h4>
                      <RatingField
                        service={service}
                        serviceId={service.serviceId}
                        setService={setService}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="listing__sidebar">
                <div className="listing__sidebar__contact">
                  <div className="listing__sidebar__contact__map">
                    <Map lat={location.lat} lng={location.lng} />
                    <img src="img/listing/details/map-icon.png" alt="" />
                  </div>
                  <div className="listing__sidebar__contact__text">
                    <h4>Contacts</h4>
                    <ul>
                      <li>
                        <span className="icon_pin_alt"></span> {service.address}
                        , {convertEnumToString(service.city)}
                      </li>
                      <li>
                        <span className="icon_phone"></span>{" "}
                        {service.user.phone}
                      </li>
                      <li>
                        <span className="icon_mail_alt"></span>{" "}
                        {service.user.email}
                      </li>
                    </ul>
                    <div className="listing__sidebar__contact__social">
                      <a href="#">
                        <i className="fa fa-facebook"></i>
                      </a>
                      <a href="#" className="linkedin">
                        <i className="fa fa-linkedin"></i>
                      </a>
                      <a href="#" className="twitter">
                        <i className="fa fa-twitter"></i>
                      </a>
                      <a href="#" className="google">
                        <i className="fa fa-google"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* <div className="listing__sidebar__working__hours">
                  <h4>Working Hours</h4>
                  <ul>
                    <li>
                      Monday <span>09:00 AM - 20:00 PM</span>
                    </li>
                    <li>
                      Tuesday <span>09:00 AM - 20:00 PM</span>
                    </li>
                    <li>
                      Wednesday <span>09:00 AM - 20:00 PM</span>
                    </li>
                    <li>
                      Thursday <span>09:00 AM - 20:00 PM</span>
                    </li>
                    <li>
                      Friday <span className="opening">Opening</span>
                    </li>
                    <li>
                      Saturday <span>09:00 AM - 20:00 PM</span>
                    </li>
                    <li>
                      Saturday <span className="closed">Closed</span>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
