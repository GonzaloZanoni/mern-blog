// import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import PostCard2 from '../components/PostCard-2';

export default function ConectarteArte() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/post/getposts?category=Artistica&limit=6');
                // const category = encodeURIComponent('Primer-Grado');
                // const limit = 6;
                // const res = await fetch(`/api/post/getposts?category=${category}&limit=${limit}`);
                const data = await res.json();
                setPosts(data.posts);
            } catch (error) {
                console.error('Error fetching posts:', error)
            }
        };
        fetchPosts();
    }, []);


    return (
        <>
            <section className="conectarte_arte py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="mb-8 text-3xl sm:text-4xl font-semibold text-center text-white">Artística<span className="font-semibold text-6xl text-violet-700">.</span></h1>
                    <div className="flex justify-start items-center">
                        <img src="img/arte.jpg" alt="Artística" className="max-w-10 h-auto rounded-full m-3 mr-0" />
                        <h2 className="m-3 text-lg text-white font-semibold">Eugenia Perez</h2>
                    </div>
                    <p className="bg-violet-300 p-5 mb-10 sm:mb-8 rounded-2xl text-violet-700 font-semibold text-center">
                        En este espacio se ampliará la visión de las artes, investigando diseñando y creando una producción de lo aprendido fomentando el trabajo colaborativo entre pares. Promover el sentido de pertenencia a la comunidad educativa.

                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex justify-center items-center mt-10">
                            <img src="img/arte.jpg" alt="Artística" className="rounded-lg max-w-80 h-auto" />
                        </div>
                        <div className="flex flex-col justify-center p-4">
                            <h2 className="text-2xl text-violet-900 font-bold mb-4 text-center md:text-left">Explora nuestras experiencias artísticas</h2>
                            {/* <p className="text-lg text-violet-100 text-center md:text-left">
                                A través de la tecnología y las artes visuales, se realizara un cortometraje y edición de video con la historia de nuestro establecimiento.
                            </p> */}
                        </div>
                    </div>
                </div>
            </section>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
            >
                <path
                    fill="#9956E1"
                    // fill-opacity="1"
                    d="M0,256L60,250.7C120,245,240,235,360,202.7C480,171,600,117,720,112C840,107,960,149,1080,170.7C1200,192,1320,192,1380,192L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z">
                </path>
            </svg>

            <div className='max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7 bg-transparent'>
                {posts && posts.length > 0 && (
                    <div className='flex flex-col gap-6'>
                        <h2 className='text-4xl font-semibold text-center'>Últimos Posts</h2>
                        <div className='flex justify-center flex-wrap gap-10 max-w-[1800px] m-3'>
                            {posts.map((post) => (
                                // Section Latest Posts -----
                                <PostCard2 key={post._id} post={post} />
                            ))}
                        </div>
                        <Link to={`/search?category=${encodeURIComponent('Artistica')}`} className='text-lg font-semibold text-green-500 hover:underline text-center'>
                            Ver más Posts
                        </Link>
                    </div>
                )}
            </div>

        </>

    )
}
