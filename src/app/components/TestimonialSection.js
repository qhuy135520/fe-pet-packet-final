import Image from "next/image";

export default function TestimonialSection() {
  return (
    <section
      class="testimonial spad set-bg"
      style={{backgroundImage: "url('/img/testimonial/testimonial-bg.jpg')"}}
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-title">
              <h2>Trusted By Over 5000+ User</h2>
              <p>What people say about us</p>
            </div>
            <div class="testimonial__slider owl-carousel">
              <div class="testimonial__item" data-hash="review-1">
                <p>
                  &quot; We worked with Consultant. Our rpresentative was very
                  knowledgeable and helpful. Consultant made a number of
                  suggestions to help improve our systems. Consultant explained
                  how things work and why it would help. &quot;
                </p>
                <div class="testimonial__item__author">
                  <a href="#review-3">
                    <Image src="/img/testimonial/author-3.png" alt="" width={55} height={55}/>
                  </a>
                  <a href="#review-1" class="active">
                    <Image src="/img/testimonial/author-1.png" alt="" width={55} height={55} />
                  </a>
                  <a href="#review-2">
                    <Image src="/img/testimonial/author-2.png" alt="" width={55} height={55} />
                  </a>
                </div>
                <div class="testimonial__item__author__text">
                  <h5>John Smith -</h5>
                  <div class="testimonial__item__author__rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div>
                </div>
                <span>CEO</span>
              </div>
              <div class="testimonial__item" data-hash="review-2">
                <p>
                &quot; We worked with Consultant. Our representative was very
                  knowledgeable and helpful. Consultant made a number of
                  suggestions to help improve our systems. Consultant explained
                  how things work and why it would help.&quot;
                </p>
                <div class="testimonial__item__author">
                  <a href="#review-1">
                    <Image src="/img/testimonial/author-1.png" alt=""  width={55} height={55}/>
                  </a>
                  <a href="#review-2" class="active">
                    <Image src="/img/testimonial/author-2.png" alt="" width={55} height={55} />
                  </a>
                  <a href="#review-3">
                    <Image src="/img/testimonial/author-3.png" alt=""  width={55} height={55}/>
                  </a>
                </div>
                <div class="testimonial__item__author__text">
                  <h5>John Smith -</h5>
                  <div class="testimonial__item__author__rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div>
                </div>
                <span>CEO</span>
              </div>
              <div class="testimonial__item" data-hash="review-3">
                <p>
                &quot; We worked with Consultant. Our representative was very
                  knowledgeable and helpful. Consultant made a number of
                  suggestions to help improve our systems. Consultant explained
                  how things work and why it would help.&quot;
                </p>
                <div class="testimonial__item__author">
                  <a href="#review-2">
                    <Image src="/img/testimonial/author-2.png" alt=""  width={55} height={55}/>
                  </a>
                  <a href="#review-3" class="active">
                    <Image src="/img/testimonial/author-3.png" alt=""  width={55} height={55}/>
                  </a>
                  <a href="#review-1">
                    <Image src="/img/testimonial/author-1.png" alt=""  width={55} height={55}/>
                  </a>
                </div>
                <div class="testimonial__item__author__text">
                  <h5>John Smith -</h5>
                  <div class="testimonial__item__author__rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
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
