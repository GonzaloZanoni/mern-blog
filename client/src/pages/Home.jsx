import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import CardsGrados from '../components/CardsGrados';
import PostCard from '../components/PostCard';
// import PostCard from '../components/PostCard';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/post/getposts?limit=6');
            const data = await res.json();
            setPosts(data.posts);
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
                <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
                <p className='text-gray-500 text-xs sm:text-sm'>

                </p>
                <Link
                    to='/search'
                    className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
                >
                    View all posts
                </Link>
            </div>

            <CardsGrados />
            <div className='max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7'>
                {posts && posts.length > 0 && (
                    <div className='flex flex-col gap-6'>
                        <h2 className='text-4xl font-semibold text-center'>Últimos Posts</h2>
                        <div className='flex justify-center flex-wrap gap-7 max-w-[1800px] m-3'>
                            {posts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                        <Link
                            to={'/search'}
                            className='text-lg text-teal-500 hover:underline text-center'
                        >
                            View all posts
                        </Link>
                    </div>
                )}
            </div>

            <div className='max-w-4xl mx-auto w-full'>
                <CallToAction />
            </div>
        </div>
    );
}