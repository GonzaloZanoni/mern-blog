/* eslint-disable no-unused-vars */

import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
// import CallToAction from '../components/CallToAction';
// import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import './PostPage-Styles/PostPage.css'


export default function PostPage() {

    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);


    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchPost();
    }, [postSlug]);

    useEffect(() => {
        try {
            const fetchRecentPosts = async () => {
                const res = await fetch(`/api/post/getposts?limit=3`);
                const data = await res.json();
                if (res.ok) {
                    setRecentPosts(data.posts);
                }
            };
            fetchRecentPosts();
        } catch (error) {
            console.log(error.message);
        }
    }, []);



    if (loading) return (
        <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl' />
        </div>
    );

    return (
        <>
            <main className='p-3 flex flex-col max-w-[900px] mt-5 mx-auto min-h-screen shadow-2xl rounded-md'>
                <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl post-title'>
                    {post && post.title}
                </h1>
                <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
                    <Button gradientDuoTone='greenToBlue' pill size='xl'>{post && post.category}</Button>
                </Link>
                <img
                    src={post && post.image}
                    alt={post && post.title}
                    className='mt-10 p-3 max-h-[600px] w-full object-cover'
                />

                <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
                    <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className='italic'>
                        {post && (post.content.length / 1000).toFixed(0)} mins read
                    </span>
                </div>
                <div className='p-3 max-w-2xl mt-3 mx-auto w-full post-content' dangerouslySetInnerHTML={{ __html: post && post.content }}></div>


                {/* Render Gallery Images */}
                {post && post.gallery && post.gallery.length > 0 && (
                    <div className='p-3 max-w-2xl mt-5 mx-auto w-full'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                            {post.gallery.map((image, index) => (
                                <div
                                    key={index}
                                    className='gallery-img-container cursor-pointer'
                                // onClick={() => openLightbox(index)}
                                >
                                    <img
                                        src={image}
                                        alt={`Gallery image ${index + 1}`}
                                        className='w-full h-auto rounded-md shadow-md'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* <CommentSection postId={post._id} /> */}

                {/* <div className='max-w-4xl mx-auto w-full'>
                <CallToAction />
            </div> */}


            </main>
            <div className='flex flex-col justify-center items-center m-5 mt-32'>
                <h1 className='text-xl mt-5 text-green-500 font-bol'>Posts recientes</h1>
                <div className='flex flex-wrap gap-5 mt-5 justify-center'>
                    {
                        recentPosts &&
                        recentPosts.map((post) => <PostCard key={post._id} post={post} />)
                    }
                </div>
            </div>
        </>
    )
}
