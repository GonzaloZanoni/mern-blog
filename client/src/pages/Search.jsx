import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
    // 1. Inicialización del estado con valores predeterminados válidos (vacíos).
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        order: '',
        category: '',
    });

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [showMore, setShowMore] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        // 2. Uso de valores predeterminados en `useEffect` para inicializar los campos de búsqueda.
        const searchTermFromUrl = urlParams.get('searchTerm') || '';
        const orderFromUrl = urlParams.get('order') || '';
        const categoryFromUrl = urlParams.get('category') || '';

        setSidebarData({
            searchTerm: searchTermFromUrl,
            order: orderFromUrl,
            category: categoryFromUrl,
        });

        const fetchPosts = async () => {
            setLoading(true);
            let searchQuery = urlParams.toString();
            if (!searchTermFromUrl && !orderFromUrl && !categoryFromUrl) {
                searchQuery = ''; // Clear query if all fields are empty to fetch all posts
            }
            const res = await fetch(`/api/post/getposts?${searchQuery}`);
            if (!res.ok) {
                setLoading(false);
                return;
            }
            const data = await res.json();
            setPosts(data.posts);
            setLoading(false);
            setShowMore(data.posts.length === 9);
        };
        fetchPosts();
    }, [location.search]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        // 3. El `handleChange` asegura que el `value` nunca sea `null`.
        setSidebarData({ ...sidebarData, [id]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();

        // 4. Actualización de la URL solo con parámetros no vacíos.
        if (sidebarData.searchTerm) urlParams.set('searchTerm', sidebarData.searchTerm);
        if (sidebarData.order) urlParams.set('order', sidebarData.order);
        if (sidebarData.category) urlParams.set('category', sidebarData.category);

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    const handleClear = () => {
        setSidebarData({
            searchTerm: '',
            order: '',
            category: '',
        });
        navigate(`/search`);
    }

    // const handleCategorySearch = (category) => {
    //     setSidebarData({
    //         ...sidebarData,
    //         category,
    //     });
    //     const urlParams = new URLSearchParams(location.search);
    //     urlParams.set('category', category);
    //     navigate(`/search?${urlParams.toString()}`);
    // }
    const handleShowMore = async () => {
        const numberOrPosts = posts.length;
        const startIndex = numberOrPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
            return;
        }
        if (res.ok) {
            const data = await res.json();
            setPosts([...posts, ...data.posts]);
            if (data.posts.length === 9) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b md:border-r md:min-h-screen border-green-500">
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Search Term:</label>
                        <TextInput
                            placeholder="Search..."
                            id="searchTerm"
                            type="text"
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center gap-12">
                        <label className="font-semibold mr-4">Sort:</label>
                        <Select
                            onChange={handleChange}
                            value={sidebarData.order}
                            id="order">
                            <option value="">Select Order</option>
                            <option value="desc">Latest</option>
                            <option value="asc">Oldest</option>
                        </Select>
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="font-semibold mr-4">Category:</label>
                        <Select
                            onChange={handleChange}
                            value={sidebarData.category}
                            id="category">
                            <option value="">Select Category</option>
                            <option value="uncategorized">Uncategorized</option>
                            <option value="nextjs">Next.js</option>
                            <option value="reactjs">React.js</option>
                            <option value="javascript">JavaScript</option>
                        </Select>
                    </div>
                    <Button
                        type="submit"
                        outline
                        gradientDuoTone='greenToBlue'>
                        Apply Filters
                    </Button>
                    <Button
                        type="button"
                        outline
                        gradientDuoTone='purpleToBlue'
                        onClick={handleClear}>
                        Clear
                    </Button>
                </form>
                <div className="mt-4 flex flex-col gap-2">
                    {/* <Button
                        type="button"
                        outline
                        gradientDuoTone='purpleToBlue'
                        onClick={() => handleCategorySearch('uncategorized')}>
                        Uncategorized
                    </Button>
                    <Button
                        type="button"
                        outline
                        gradientDuoTone='purpleToBlue'
                        onClick={() => handleCategorySearch('nextjs')}>
                        Next.js
                    </Button>
                    <Button
                        type="button"
                        outline
                        gradientDuoTone='purpleToBlue'
                        onClick={() => handleCategorySearch('reactjs')}>
                        React.js
                    </Button>
                    <Button
                        type="button"
                        outline
                        gradientDuoTone='purpleToBlue'
                        onClick={() => handleCategorySearch('javascript')}>
                        JavaScript
                    </Button> */}
                </div>
            </div>
            <div className="w-full">
                <h1 className="text-3xl font-semibold sm:border-b border-green-500 p-3 mt-5">Posts Results:</h1>
                <div className="p-7 flex flex-wrap gap-4">
                    {!loading && posts.length === 0 && (
                        <p className="text-xl text-gray-500">No posts found.</p>
                    )}
                    {loading && (
                        <p className="text-xl text-gray-500">Loading...</p>
                    )}
                    {!loading && posts && posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                    {
                        showMore && <button
                            onClick={handleShowMore}
                            className='text-green-500 text-lg hover:underline p-7 w-full'>
                            Show more
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}
