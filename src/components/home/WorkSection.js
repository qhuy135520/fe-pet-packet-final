import Image from "next/image";

export default function WorkSection() {
  return (
    <section className="work spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>How Does It Work</h2>
              <p>
                Travelocity empowers travelers who are giving back on their
                trips in ways big and small
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
              <h5>Location & Categories</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore.
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
              <h5>Explore Listting</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore.
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
              <h5>Making Appointments</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
