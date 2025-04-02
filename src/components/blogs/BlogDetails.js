import React from 'react'

export default function BlogDetails({ blog }) {



    const title = blog?.title
    const date = blog?.createdAt
    const author = blog?.user.name
    const image = blog?.image
    const content = blog?.content


    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div>

            {/* Banner start */}
            <div
                className="blog-details-hero set-bg"
                data-setbg="img/blog/details/blog-hero.jpg"
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="blog__hero__text">
                                <h2>{title}</h2>
                                <ul>
                                    <li>
                                        <i className="fa fa-clock-o" /> {formatDate(date)}
                                    </li>
                                    <li>
                                        <i className="fa fa-user" /> {author}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Banner end */}

            {/* Content start */}
            <section className="blog-details spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="blog__details__text">
                                <img
                                    className="blog__details__video set-bg"
                                    alt={image}
                                    src={image}
                                    width={"100%"}
                                />
                                {/* <a
                                        href="https://www.youtube.com/watch?v=8EJ3zbKTWQ8"
                                        className="play-btn video-popup"
                                    >
                                        <i className="fa fa-play" />
                                    </a>
                                </div> */}
                                <p style={{ wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
                                    {content}
                                </p>

                            </div>

                            {/* <div className="blog__details__new__post">
                                <div className="blog__details__new__post__title">
                                    <h4>News Post</h4>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="blog__item">
                                            <div
                                                className="blog__item__pic set-bg"
                                                data-setbg="img/blog/bp-5.jpg"
                                            />
                                            <div className="blog__item__text">
                                                <ul className="blog__item__tags">
                                                    <li>
                                                        <i className="fa fa-tags" /> Videos
                                                    </li>
                                                </ul>
                                                <h5>
                                                    <a href="#">
                                                        Citrus Heights Snack Man Helps Feed The Homeless
                                                    </a>
                                                </h5>
                                                <ul className="blog__item__widget">
                                                    <li>
                                                        <i className="fa fa-clock-o" /> 19th March, 2019
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-user" /> John Smith
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="blog__item">
                                            <div
                                                className="blog__item__pic set-bg"
                                                data-setbg="img/blog/bp-6.jpg"
                                            />
                                            <div className="blog__item__text">
                                                <ul className="blog__item__tags">
                                                    <li>
                                                        <i className="fa fa-tags" /> Travel
                                                    </li>
                                                </ul>
                                                <h5>
                                                    <a href="#">
                                                        Homeless woman’s viral subway opera performance
                                                    </a>
                                                </h5>
                                                <ul className="blog__item__widget">
                                                    <li>
                                                        <i className="fa fa-clock-o" /> 19th March, 2019
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-user" /> John Smith
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
            {/* Content end */}

        </div>

    )
}
