import Image from "next/image";

export default function ServicesSection({ serviceCategories }) {
  function handleOnclick(id) {
    window.location.href = `/services?searchCategory=${id}`;
  }

  return (
    <section className="categories spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Most Popular Services</h2>
              <p>
                Travelocity empowers travelers who are giving back on their
                trips in ways big and small
              </p>
            </div>
            <div className="categories__item__list d-flex justify-content-center">
              {serviceCategories.map((serviceCategory) => {
                return (
                  <div
                    className="categories__item"
                    key={serviceCategory.serviceCategoryId}
                    onClick={() =>
                      handleOnclick(serviceCategory.serviceCategoryId)
                    }
                  >
                    <Image
                      src={serviceCategory.pictureTxt}
                      alt=""
                      width={100}
                      height={100}
                    />
                    <h5>{serviceCategory.name}</h5>
                  </div>
                );
              })}

              {/* <div className="categories__item">
                            <Image src="/img/categories/cat-5.png" alt="" width={100} height={100}/>
                            <h5>Shopping</h5>
                            <span>23 Listings</span>
                        </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
