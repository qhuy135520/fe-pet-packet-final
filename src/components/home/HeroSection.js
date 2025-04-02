"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HeroSection({ serviceCategories, cities }) {
  const [searchServices, setSearchServices] = useState({
    searchName: "",
    searchCategory: "",
    searchLocation: "",
  });

  function handleChange(e) {
    const formInput = { ...searchServices };
    formInput[e.target.name] = e.target.value;
    setSearchServices(formInput);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      searchServices.searchName == "" &&
      searchServices.searchCategory == "" &&
      searchServices.searchLocation == ""
    ) {
      window.location.href = "/services";
    } else {
      window.location.href = `/services?searchName=${searchServices.searchName}&searchCategory=${searchServices.searchCategory}&searchLocation=${searchServices.searchLocation}`;
    }
  }
  function handleOnclick(id) {
    window.location.href = `/services?searchCategory=${id}`;
  }

  return (
    <section
      className="hero set-bg"
      style={{ backgroundImage: "url('/img/hero/hero-bg.jpg')" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="hero__text">
              <div className="section-title">
                <h2>Welcome to Pet Service Connect</h2>
                <p>The best service package is waiting for you</p>
              </div>
              <div className="hero__search__form">
                <form action="#">
                  <input
                    name="searchName"
                    type="text"
                    placeholder="Search..."
                    value={searchServices.searchName}
                    onChange={(e) => handleChange(e)}
                  />
                  <div className="select__option">
                    <select
                      name="searchCategory"
                      value={searchServices.searchCategory}
                      onChange={(e) => handleChange(e)}
                      className="nice-select"
                    >
                      <option value="">Choose Categories</option>
                      {serviceCategories.map((category) => {
                        return (
                          <option
                            key={category.serviceCategoryId}
                            value={category.serviceCategoryId}
                          >
                            {category.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="select__option">
                    <select
                      name="searchLocation"
                      className="nice-select"
                      value={searchServices.searchLocation}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">Choose Location</option>
                      {cities.map((city) => {
                        return (
                          <option key={city.value} value={city.value}>
                            {city.displayName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <button type="button" onClick={(e) => handleSubmit(e)}>
                    Explore Now
                  </button>
                </form>
              </div>
              <ul className="hero__categories__tags">
                {serviceCategories.map((category) => {
                  return (
                    <li
                      key={category.serviceCategoryId}
                      onClick={() =>
                        handleOnclick(category.serviceCategoryId)
                      }
                    >
                      <Link href="#">
                        <Image
                          width={30}
                          height={28}
                          src={category.pictureTxt}
                          alt=""
                        />
                        {category.name}
                      </Link>
                    </li>
                  );
                })}

                <li>
                  <Link href="/services">
                    <Image
                      width={30}
                      height={28}
                      src="/img/hero/cat-6.png"
                      alt=""
                    />{" "}
                    All Services
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
