import "@/styles/manage-own-service/choose-category.css";
import { useEffect, useState } from "react";
import AddService from "./add-service/AddService";
import Preloder from "../Preloder";

export default function ChooseCategory({ serviceCategory }) {
  const [index, setIndex] = useState();

  if (index) {
    return <AddService serviceCategoryId={index} setIndex={setIndex} />;
  }

  return (
    <>
      <div className="choose-category">
        <section className="section questions">
          <div className="questions__bar decoration-bar decoration-bar--center m-b-10"></div>
          <h1 className="text-up h6 questions__headline">
            Pet Service Connect
          </h1>
          <div className="section__inner">
            <form id="loanTypesForm" className="form questions__form">
              <div className="form__tab active">
                <h2 className="form__title h2">
                  What type of pet service do you use?
                </h2>
                <fieldset className="form__group row d-flex justify-content-center">
                  {serviceCategory.map((item, index) => {
                    return (
                      <label
                        key={item.serviceCategoryId}
                        className="form__label col-md-5 "
                        for={item.pictureTxt}
                      >
                        <input
                          type="radio"
                          name="serviceCategory"
                          className="form__input"
                          id={item.pictureTxt}
                          value={item.serviceCategoryId}
                          onClick={() => setIndex(item.serviceCategoryId)}
                        />
                        <div className="row">
                          <div className="col-md-2">
                            <img
                              className="form__label-img "
                              src={item.pictureTxt}
                            />
                          </div>
                          <div className="col-md-8">
                            <p className="form__label-name">{item.name}</p>

                            <span className="form__label-text">
                              {item.description}
                            </span>
                          </div>
                        </div>
                        <svg
                          className="form__label-check"
                          viewBox="0 0 512 512"
                          title="check-circle"
                        ></svg>
                      </label>
                    );
                  })}
                </fieldset>

                {/* <button
                  type="button"
                  className="button button--dark button--lg form__next"
                >
                  Continue
                </button> */}
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
