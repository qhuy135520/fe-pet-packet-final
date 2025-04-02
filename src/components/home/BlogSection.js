import { useRouter } from 'next/navigation';

export default function BlogSection({ blogs }) {
    const router = useRouter();

    const handleBlogClick = (slug) => {
        router.push(`/blogs/${slug}`);
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <section className="news-post spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>News Post</h2>
                            <p>Checkout Latest News And Articles From Our Blog</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        blogs?.map(
                            blog => (
                                <div className="col-lg-4 col-md-6" key={blog.blogId} onClick={() => handleBlogClick(blog?.blogId)} style={{ cursor: 'pointer' }} >
                                    <div className="blog__item">
                                        <div className="blog__item__pic set-bg"
                                            style={{ backgroundImage: `url('${blog.image}')` }}
                                        >

                                        </div>
                                        <div className="blog__item__text">
                                            <h5><a href="#">{blog.title}</a></h5>
                                            <ul className="blog__item__widget">
                                                <li><i className="fa fa-clock-o"></i>{formatDate(blog?.createdAt)}
                                                </li>
                                                <li><i className="fa fa-user"></i>{blog?.user.name}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    }

                </div>
            </div>
        </section>
    )
}