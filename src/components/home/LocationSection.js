export default function LocationSection() {
  return (
    <section className="feature-location spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Top Featured Locations</h2>
              <p>Explore services, bars, and cafés by locality</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <a
              href="#"
              className="feature__location__item large-item set-bg"
              style={{
                backgroundImage: "url('/img/feature-location/fl-1.jpg')",
              }}
            >
              <div className="feature__location__item__text">
                <h5>Washington, D.C</h5>
                <ul>
                  <li>2045 Listings</li>
                  <li>3648 Users</li>
                </ul>
              </div>
            </a>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <a
                  href="#"
                  className="feature__location__item set-bg"
                  style={{
                    backgroundImage: "url('/img/feature-location/fl-2.jpg')",
                  }}
                >
                  <div className="feature__location__item__text">
                    <h5>Chicago</h5>
                  </div>
                </a>
              </div>
              <div className="col-lg-6 col-md-6">
                <a
                  href="#"
                  className="feature__location__item set-bg"
                  style={{
                    backgroundImage: "url('/img/feature-location/fl-3.jpg')",
                  }}
                >
                  <div className="feature__location__item__text">
                    <h5>San Antonio</h5>
                  </div>
                </a>
              </div>
            </div>
            <a
              href="#"
              className="feature__location__item set-bg"
              style={{
                backgroundImage: "url('/img/feature-location/fl-4.jpg')",
              }}
            >
              <div className="feature__location__item__text">
                <h5>Los Angeles</h5>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
