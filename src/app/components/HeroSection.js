import Image from "next/image";
import Link from "next/link";

export default function HeroSection(){
    return (
        <section className="hero set-bg" style={{backgroundImage: "url('/img/hero/hero-bg.jpg')"}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="hero__text">
                        <div className="section-title">
                            <h2>Discover The Best Services Near You</h2>
                            <p>1.118.940.376 The best service package is waiting for you</p>
                        </div>
                        <div className="hero__search__form">
                            <form action="#">
                                <input type="text" placeholder="Search..."/>
                                <div className="select__option">
                                    <select className="nice-select">
                                        <option value="">Choose Categories</option>
                                    </select>
                                </div>
                                <div className="select__option">
                                <select className="nice-select">
                                        <option value="">Choose Location</option>
                                    </select>
                                </div>
                                <button type="submit">Explore Now</button>
                            </form>
                        </div>
                        <ul className="hero__categories__tags">
                            <li><Link href="#"><Image width={30} height={28} src="https://content.petbacker.com/images/cms/icons/service-type/pet-boarding.png" alt=""/> Dog Boarding</Link></li>
                            <li><Link href="#"><Image width={30} height={28}  src="https://content.petbacker.com/images/cms/icons/service-type/cat-boarding.png" alt=""/> Pet Sitting</Link></li>
                            <li><Link href="#"><Image width={30} height={28}  src="https://content.petbacker.com/images/cms/icons/service-type/pet-grooming-1.png" alt=""/> Pet Grooming</Link></li>
                            <li><Link href="#"><Image width={30} height={28}  src="https://content.petbacker.com/images/cms/icons/service-type/dog-walking.png" alt=""/> Dog Walking</Link></li>
                            <li><Link href="#"><Image width={30} height={28}  src="https://content.petbacker.com/images/cms/icons/service-type/pet-taxi.png" alt=""/> Pet Taxi</Link></li>
                            <li><Link href="#"><Image width={30} height={28}  src="/img/hero/cat-6.png" alt=""/> All Services</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}