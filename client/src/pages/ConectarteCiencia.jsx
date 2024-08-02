// import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function ConectarteArte() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/post/getposts?category=Ciencias&limit=6');
            const data = await res.json();
            setPosts(data.posts);
        };
        fetchPosts();
    }, []);

    return (
        <>
            <section className="conectarte_ciencia bg-green-200 py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="mb-8 text-5xl sm:text-4xl font-semibold text-center text-white">Ciencias<span className="font-semibold text-6xl text-green-700">.</span></h1>
                    <div className="flex justify-start items-center">
                        <img src="img/perfil-image.jpg" alt="Artística" className="max-w-10 h-auto rounded-full m-3 mr-0" />
                        <h2 className="m-3 text-lg text-white font-semibold">Mariela Dalmaso</h2>
                    </div>
                    <div className="flex justify-start items-center">
                        <img src="img/perfil-image.jpg" alt="Artística" className="max-w-10 h-auto rounded-full m-3 mr-0" />
                        <h2 className="m-3 text-lg text-white font-semibold">Fabiana Noriega</h2>
                    </div>
                    <p className="bg-green-300 p-5 mb-10 sm:mb-8 rounded-2xl text-green-700 font-semibold text-center">
                        En este espacio se utilizaran metodologías activas de aprendizaje basadas en aprendizajes por indagación y en aprendizajes basados en proyectos/problemas, esto implica fomentar cualidades como la curiosidad y /o la experimentación.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex justify-center items-center mt-10">
                            <img src="img/ciencias1.png" alt="Artística" className="rounded-lg max-w-80 h-auto" />
                        </div>
                        <div className="flex flex-col justify-center p-4">
                            <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Explora nuestras experiencias cientificas</h2>
                            {/* <p className="text-lg text-white text-center md:text-left">
                                A través de las ciencias, se realizaran entrevistas a ex-docentes de la institución, se investigarán acontecimientos importantes durantes los 25 años. Con todos los datos recopilados se creará una linea del tiempo.
                            </p> */}
                        </div>
                    </div>
                </div>
            </section>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320">
                <path
                    fill="#539A55" d="M0,256L60,250.7C120,245,240,235,360,202.7C480,171,600,117,720,112C840,107,960,149,1080,170.7C1200,192,1320,192,1380,192L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z">
                </path>
            </svg>
            <div className='max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7 bg-transparent'>
                {posts && posts.length > 0 && (
                    <div className='flex flex-col gap-6'>
                        <h2 className='text-4xl font-semibold text-center'>Últimos Posts</h2>
                        <div className='flex justify-center flex-wrap gap-10 max-w-[1800px] m-3'>
                            {posts.map((post) => (
                                // Section Latest Posts -----
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                        <Link to={`/search?category=${encodeURIComponent('Ciencias')}`} className='text-lg font-semibold text-green-500 hover:underline text-center'>
                            Ver más Posts
                        </Link>
                    </div>
                )}
            </div>
            <div className="bg-green-600 w-full">
                <div className="client__grid p-10">
                    <Link to='/projects' className="">
                        <div className="client__card cursor-pointer flex flex-col items-center justify-center bg-orange-500 shadow-xl transform transition-transform duration-300 hover:scale-110">
                            <h1 className='text-3xl font-semibold text-white'>ConectArte</h1>
                        </div>
                    </Link>
                    <Link to='/conectarte-programacion' className="">
                        <div className="client__card cursor-pointer flex flex-col items-center justify-center bg-blue-500 shadow-xl transform transition-transform duration-300 hover:scale-110">
                            <h1 className='text-3xl font-semibold  text-white'>Programación</h1>
                        </div>
                    </Link>
                    <Link to='/conectarte-arte' className="">
                        <div className="client__card cursor-pointer flex flex-col items-center justify-center bg-violet-500 shadow-xl transform transition-transform duration-300 hover:scale-110">
                            <h1 className='text-3xl font-semibold  text-white'>Arte</h1>

                        </div>
                    </Link>

                </div>
            </div>

        </>


    )
}
