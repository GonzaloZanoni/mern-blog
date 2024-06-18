import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import CardsGrados from '../components/CardsGrados';
import PostCard from '../components/PostCard';
import './Home-Styles/Home.css';
import { Button } from 'flowbite-react';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const gallaryRef = useRef(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/post/getposts?limit=6');
            const data = await res.json();
            setPosts(data.posts);
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('img-visible', 'content-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        const { current } = gallaryRef;
        if (current) {
            const images = current.querySelectorAll('.gallary__col');
            const content = current.querySelector('.gallary__content');

            images.forEach((img) => observer.observe(img));
            if (content) observer.observe(content);

            return () => {
                images.forEach((img) => observer.unobserve(img));
                if (content) observer.unobserve(content);
            };
        }
    }, []);

    return (
        <div className='section_home'>
            {/* Section Hero --- */}
            <section className="section__container header__container">
                <div className="header__image__container">
                    <div className="header__content">
                        <h1>Bienvenidos/as</h1>
                        <p> Al blog de <span className='font-bold'>Capitán José L. Ardiles</span>, una institución educativa de nivel primario. </p>
                        <Link to='/search'>
                            <Button gradientDuoTone="greenToBlue">Ver Posts</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Section Capitan Ardiles ---- */}
            <section className="gallary" ref={gallaryRef}>

                <h1 className='flex justify-center font-bold'>Nosotros</h1>
                <div className="section__container gallary__container">
                    <div className="image__gallary">
                        <div className="gallary__col">
                            <img src="img/gallery-1.jpg" alt="gallary" />
                        </div>
                        <div className="gallary__col">
                            <img src="img/gallery-2.jpg" alt="gallary" />
                            <img src="img/gallery-3.jpg" alt="gallary" />

                        </div>
                    </div>
                    <div className="gallary__content">
                        <img src="img/logo1.png" alt="logo" className='h-24 w-24' />
                        <h2 className="section__title">
                            Capitán José L. Ardiles
                        </h2>
                        <div>
                            <p className="section__subtitle">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, at ducimus.
                            </p>
                            <Link to='/about'><Button className="btn" gradientDuoTone='greenToBlue' outline>Ver más</Button></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section ConectArte ---- */}

            {/* Section cards grados ----- */}
            <CardsGrados />
            <div className='max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7 bg-transparent'>
                {posts && posts.length > 0 && (
                    <div className='flex flex-col gap-6'>
                        <h2 className='text-4xl font-semibold text-center'>Últimos Posts</h2>
                        <div className='flex justify-center flex-wrap gap-7 max-w-[1800px] m-3'>
                            {posts.map((post) => (
                                // Section Latest Posts -----
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                        <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'>
                            View all posts
                        </Link>
                    </div>
                )}
            </div>

            {/* Section Novedades ---- */}
            {/* <div className='max-w-4xl mx-auto mt-30 w-full'>
                <CallToAction />
            </div> */}
            {/* <div className=' mt-300 h-[300px] bg-transparent'></div> */}
        </div>
    );
}
