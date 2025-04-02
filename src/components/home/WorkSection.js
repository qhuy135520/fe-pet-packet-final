import Image from "next/image";

export default function WorkSection() {
  return (
    <section className="work spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>About us</h2>
              <p>
                Pet Service Connect is a dedicated platform designed to connect pet owners with trusted service providers.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="work__item">
              <div className="work__item__number">01.</div>
              <Image
                src="/img/work/work-1.png"
                alt=""
                width={100}
                height={100}
              />
              <h5>Our Mission </h5>
              <p>
                To bridge the gap between pet owners and professional services while promoting a community of care, trust.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="work__item">
              <div className="work__item__number">02.</div>
              <Image
                src="/img/work/work-2.png"
                alt=""
                width={100}
                height={100}
              />
              <h5>Service Management</h5>
              <p>
              Easily book pet services like grooming, veterinary care, boarding and pet walking around.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="work__item">
              <div className="work__item__number">03.</div>
              <Image
                src="/img/work/work-3.png"
                alt=""
                width={100}
                height={100}
              />
              <h5>Trusted Providers</h5>
              <p>
              We are committed to connecting you with professional and reliable service providers in your area.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
