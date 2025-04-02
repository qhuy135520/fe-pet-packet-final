import Image from "next/image";

export default function TestimonialSection() {
  return (
    <section
      className="testimonial spad set-bg"
      style={{ backgroundImage: "url('/img/testimonial/testimonial-bg.jpg')" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Trusted By User</h2>

            </div>
            <div className="testimonial__slider owl-carousel">
              <div className="testimonial__item" data-hash="review-1">
                <p>
                  &quot; We worked with Consultant. Our rpresentative was very
                  knowledgeable and helpful. Consultant made a number of
                  suggestions to help improve our systems. Consultant explained
                  how things work and why it would help. &quot;
                </p>
                <div className="testimonial__item__author">
                  <a href="#review-3">
                    <Image src="/img/testimonial/author-3.png" alt="" width={55} height={55} />
                  </a>
                  <a href="#review-1" className="active">
                    <Image src="/img/testimonial/author-1.png" alt="" width={55} height={55} />
                  </a>
                  <a href="#review-2">
                    <Image src="/img/testimonial/author-2.png" alt="" width={55} height={55} />
                  </a>
                </div>
                <div className="testimonial__item__author__text">
                  <h5>John Smith -</h5>
                  <div className="testimonial__item__author__rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                </div>
                <span>CEO</span>
              </div>
              <div className="testimonial__item" data-hash="review-2">
                <p>
                  &quot; We worked with Consultant. Our representative was very
                  knowledgeable and helpful. Consultant made a number of
                  suggestions to help improve our systems. Consultant explained
                  how things work and why it would help.&quot;
                </p>
                <div className="testimonial__item__author">
                  <a href="#review-1">
                    <Image src="/img/testimonial/author-1.png" alt="" width={55} height={55} />
                  </a>
                  <a href="#review-2" className="active">
                    <Image src="/img/testimonial/author-2.png" alt="" width={55} height={55} />
                  </a>
                  <a href="#review-3">
                    <Image src="/img/testimonial/author-3.png" alt="" width={55} height={55} />
                  </a>
                </div>
                <div className="testimonial__item__author__text">
                  <h5>John Smith -</h5>
                  <div className="testimonial__item__author__rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                </div>
                <span>CEO</span>
              </div>
              <div className="testimonial__item" data-hash="review-3">
                <p>
                  &quot; We worked with Consultant. Our representative was very
                  knowledgeable and helpful. Consultant made a number of
                  suggestions to help improve our systems. Consultant explained
                  how things work and why it would help.&quot;
                </p>
                <div className="testimonial__item__author">
                  <a href="#review-2">
                    <Image src="/img/testimonial/author-2.png" alt="" width={55} height={55} />
                  </a>
                  <a href="#review-3" className="active">
                    <Image src="/img/testimonial/author-3.png" alt="" width={55} height={55} />
                  </a>
                  <a href="#review-1">
                    <Image src="/img/testimonial/author-1.png" alt="" width={55} height={55} />
                  </a>
                </div>
                <div className="testimonial__item__author__text">
                  <h5>John Smith -</h5>
                  <div className="testimonial__item__author__rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                </div>
                <span>CEO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
