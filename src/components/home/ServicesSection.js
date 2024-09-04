import Image from "next/image";

export default function ServicesSection (){
    return (
        <section className="categories spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-title">
                        <h2>Most Popular Services</h2>
                        <p>Travelocity empowers travelers who are giving back on their trips in ways big and small</p>
                    </div>
                    <div className="categories__item__list">
                        <div className="categories__item">
                            <Image src="https://content.petbacker.com/images/cms/icons/service-type/pet-boarding.png"  alt="" width={100} height={100}/>
                            <h5>Dog Boarding</h5>
                            <span>78 Listings</span>
                        </div>
                        <div className="categories__item">
                            <Image src="https://content.petbacker.com/images/cms/icons/service-type/cat-boarding.png" alt="" width={100} height={100}/>
                            <h5>Pet Sitting</h5>
                            <span>32 Listings</span>
                        </div>
                        <div className="categories__item">
                            <Image  src="https://content.petbacker.com/images/cms/icons/service-type/pet-grooming-1.png"  alt="" width={100} height={100}/>
                            <h5>Pet Grooming</h5>
                            <span>16 Listings</span>
                        </div>
                        <div className="categories__item">
                            <Image src="https://content.petbacker.com/images/cms/icons/service-type/dog-walking.png" alt="" width={100} height={100}/>
                            <h5>Dog Walking</h5>
                            <span>55 Listings</span>
                        </div>
                        <div className="categories__item">
                            <Image src="https://content.petbacker.com/images/cms/icons/service-type/pet-taxi.png" alt="" width={100} height={100}/>
                            <h5>Pet Taxi</h5>
                            <span>55 Listings</span>
                        </div>
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
    )
}