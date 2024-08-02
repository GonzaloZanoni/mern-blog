import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import CardsGrados from '../components/CardsGrados';
import PostCard from '../components/PostCard';
import './Home-Styles/Home.css';
import { Button } from 'flowbite-react';
// import Typewriter from 'react-typewriter-effect';

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

    // section ConectArte



    return (
        <div className='section_home'>
            {/* Section Hero --- */}
            <section className="section__container header__container">
                <div className="header__image__container">
                    <div className="header__content">
                        <h1>Bienvenidos/as</h1>
                        <p> al blog de <span className='font-bold'>Capitán José L. Ardiles</span>, una institución educativa de nivel primario. </p>
                        <Link to='/search'>
                            <Button gradientDuoTone="greenToBlue">Ver Posts</Button>
                        </Link>
                    </div>
                    <div className='flex justify-center'>
                        <h1 className="title-25 text-white text-4xl p-5 font-playwrite">- 25 años -</h1>
                    </div>
                </div>
            </section>

            {/* Section Capitan Ardiles ---- */}
            <section className="gallary" ref={gallaryRef}>

                <h1 className='text-2xl sm:text-4xl flex justify-center items-center font-bold mb-5'>Nuestra Escuela <img className='ml-5 w-16 h-16' src="img/icono.png" alt="" /></h1>
                <div className="section__container gallary__container">
                    <div className="image__gallary">
                        <div className="gallary__col">
                            <img src="img/escuela2.jpg" alt="gallary" />
                        </div>
                        <div className="gallary__col">
                            <img src="img/escuela1.jpg" alt="gallary" />
                            <img src="img/escuela3.jpg" alt="gallary" />

                        </div>
                    </div>
                    <div className="gallary__content text-center">
                        <img src="img/logo1.png" alt="logo" className='h-24 w-24' />
                        <h2 className="section__title">
                            Capitán José L. Ardiles
                        </h2>
                        <div>
                            <p className="section__subtitle">
                                Somos una institución educativa pública de nivel primaria, ubicada en Rio Primero - Cba.
                            </p>
                            <Link to='/about'><Button className="btn" gradientDuoTone='greenToBlue' outline>Ver Nuestro Colegio</Button></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section ConectArte ---- */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFBF71" d="M0,256L60,250.7C120,245,240,235,360,202.7C480,171,600,117,720,112C840,107,960,149,1080,170.7C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            <section className="client">
                <div className="section__container client__container">
                    <h1 className="section__header mb-5 p-3"><Link to='/projects'>Conect<span className='bg-orange-400 rounded-full p-1 pl-2 text-white'>Arte</span></Link></h1>
                    <p className='bg-orange-100 p-5 rounded-2xl text-orange-700'>El proyecto ´conectARTE 25 años´, busca implementar un aprendizaje activo y significativo que involucra a estudiantes en la exploración de su entorno natural, social y cultural, usando la historia institucional de 25 años como marco.
                        <Link to='/projects'><Button className='mt-4' gradientDuoTone='pinkToOrange' outline>Ver Proyecto</Button></Link>
                    </p>
                    <div className="client__grid">
                        <div className="client__card flex flex-col items-center justify-center bg-white  shadow-xl transform transition-transform duration-300 hover:scale-110">
                            <h1 className='text-4xl font-bold mb-4 text-orange-500'>Artística</h1>
                            <img src="img/arte.jpg" alt="client" />
                            <p>
                                Mira nuestras actividades para la producción de un cortometraje con marionetas, diseño de escenarios, títeres y mucho más...
                            </p>
                            <Link to='/conectarte-arte'>
                                <Button
                                    className='m-5'
                                    gradientDuoTone='pinkToOrange'
                                    size="xl"
                                >
                                    Ver más
                                </Button>
                            </Link>
                        </div>
                        <div className="client__card flex flex-col items-center justify-center bg-white  shadow-xl transform transition-transform duration-300 hover:scale-110">
                            <h1 className='text-4xl font-bold mb-4 text-orange-500'>Ciencias</h1>
                            <img src="img/ciencias.jpg" alt="client" />
                            <p>
                                Mira nuestras actividades de investigación sobre la historia de  nuestra escuela, creando una linea del tiempo  y mucho más...
                            </p>
                            <Link to='/conectarte-ciencia'>
                                <Button
                                    className='m-5'
                                    gradientDuoTone='pinkToOrange'
                                    size='xl'
                                >
                                    Ver más
                                </Button>
                            </Link>
                        </div>
                        <div className="client__card flex flex-col text-center items-center justify-center bg-white  shadow-xl transform transition-transform duration-300 hover:scale-110">
                            <h1 className='text-3xl font-bold mb-4 text-orange-500 '>Programación <br />y <br />TIC´s</h1>
                            <img src="img/programacion.jpg" alt="client" />
                            <p>
                                Mira nuestras actividades para la creación de juegos interactivos a través de la plataforma ´SCRATCH´,   y mucho más...
                            </p>
                            <Link to='conectarte-programacion'>
                                <Button
                                    className='m-5'
                                    gradientDuoTone='pinkToOrange'
                                    size='xl'
                                >
                                    Ver más
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section cards grados ----- */}
            <CardsGrados />
            <div className='max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7 bg-transparent'>
                {posts && posts.length > 0 && (
                    <div className='flex flex-col gap-6'>
                        <h1 className='text-2xl sm:text-4xl font-bold text-center'>Últimos Posts</h1>
                        <div className='flex justify-center flex-wrap gap-7 max-w-[1800px] m-3'>
                            {posts.map((post) => (
                                // Section Latest Posts -----
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                        <Link to={'/search'} className='text-lg font-semibold text-green-500 hover:underline text-center'>
                            Ver todos los Posts
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
