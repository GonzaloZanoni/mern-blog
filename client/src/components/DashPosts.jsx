import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from "react-router-dom";

export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user)
    const [userPosts, setUserPosts] = useState([])
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');
    // console.log(userPosts)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(
                    currentUser.isAdmin
                        ? `/api/post/getposts?`
                        // userId=${currentUser._id}
                        : `/api/post/user/${currentUser._id}`
                );
                const data = await res.json()
                if (res.ok) {
                    setUserPosts(data.posts || data);
                    if ((data.posts || data).length < 9) {
                        setShowMore(false)
                    }
                }
            } catch (error) {
                console.log(error.message)
            }
        };
        fetchPosts();
        // if (currentUser.isAdmin || currentUser.isEmployed) {
        // }
    }, [currentUser])
    // [currentUser._id, currentUser.isAdmin])

    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(
                `${currentUser.isAdmin ? `/api/post/getposts` : `/api/post/user/${currentUser._id}`}?startIndex=${startIndex}`
                // `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
            );
            const data = await res.json();
            if (res.ok) {
                setUserPosts((prev) => [...prev, ...(data.posts || data)]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(
                `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
                {
                    method: 'DELETE',
                }
            );
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) =>
                    prev.filter((post) => post._id !== postIdToDelete)
                );
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>

            <div className='w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
                <div className="w-[150px] m-5">
                    {
                        (currentUser.isAdmin || currentUser.isEmployed) && (
                            <Link to={'/create-post'}>
                                <Button
                                    type='button'
                                    gradientDuoTone='greenToBlue'
                                    className='w-full'
                                >
                                    Crea un Post
                                </Button>
                            </Link>
                        )
                    }
                </div>

                {/* {currentUser.isAdmin && userPosts.length > 0 ? ( */}
                {userPosts.length > 0 ? (
                    <>
                        <Table hoverable className="shadow-md">
                            <Table.Head>
                                <Table.HeadCell>Date update</Table.HeadCell>
                                <Table.HeadCell>Post image</Table.HeadCell>
                                <Table.HeadCell>Post title</Table.HeadCell>
                                <Table.HeadCell>Category</Table.HeadCell>
                                {(currentUser.isAdmin || currentUser.isEmployed) && <Table.HeadCell>Delete</Table.HeadCell>}
                                {(currentUser.isAdmin || currentUser.isEmployed) && <Table.HeadCell><span>Edit</span></Table.HeadCell>}
                                {/* <Table.HeadCell>Delete</Table.HeadCell> */}
                                {/* <Table.HeadCell><span>Edit</span></Table.HeadCell> */}

                            </Table.Head>
                            {userPosts.map((post) => (
                                <Table.Body className='divide-y' key={post._id}>
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>
                                            {new Date(post.updatedAt).toLocaleDateString()}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link to={`/post/${post.slug}`}>
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className='w-20 h-10 object-cover bg-gray-500'
                                                />
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link
                                                className='font-medium text-gray-900 dark:text-white'
                                                to={`/post/${post.slug}`}
                                            >
                                                {post.title}
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>{post.category}</Table.Cell>
                                        {(currentUser.isAdmin || currentUser.isEmployed) && (
                                            <>
                                                <Table.Cell>
                                                    <span
                                                        onClick={() => {
                                                            setShowModal(true);
                                                            setPostIdToDelete(post._id);
                                                        }}
                                                        className='font-medium text-red-500 hover:underline cursor-pointer'
                                                    >
                                                        Eliminar
                                                    </span>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Link
                                                        className='text-blue-500 hover:underline'
                                                        to={`/update-post/${post._id}`}
                                                    >
                                                        <span>Editar</span>
                                                    </Link>
                                                </Table.Cell>
                                            </>
                                        )}
                                    </Table.Row>
                                </Table.Body>
                            ))}
                        </Table>
                        {showMore && (
                            <button
                                onClick={handleShowMore}
                                className='w-full text-teal-500 self-center text-sm py-7'
                            >
                                Ver Más
                            </button>
                        )}
                    </>
                ) : (
                    <p>No existen post!</p>
                )}
                <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                    <Modal.Header />
                    <Modal.Body>
                        <div className='text-center'>
                            <HiOutlineExclamationCircle
                                className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>¿Estás seguro de eliminar el siguiente post?</h3>
                            <div className='flex justify-center gap-4'>
                                <Button color='failure' onClick={handleDeletePost}>Si, Estoy seguro.</Button>
                                <Button color='gray' onClick={() => setShowModal(false)}>No, Cancelar.</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div >
        </>
    );
}
