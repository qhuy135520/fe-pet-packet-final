export default function NewSlatterSection() {
  return (
    <section className="newslatter">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="newslatter__text">
              <h3>Subscribe Newsletter</h3>
              <p>Subscribe to our newsletter and don’t miss anything</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <form action="#" className="newslatter__form">
              <input type="text" placeholder="Your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
