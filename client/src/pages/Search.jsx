
import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";



export default function Search() {
    // 1. Inicialización del estado con valores predeterminados válidos (vacíos).
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        order: '',
        category: '',
    });

    const [tempData, setTempData] = useState({
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

        setTempData({
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
        setTempData({ ...tempData, [id]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();

        // 4. Actualización de la URL solo con parámetros no vacíos.
        if (tempData.searchTerm) urlParams.set('searchTerm', tempData.searchTerm);
        if (tempData.order) urlParams.set('order', tempData.order);
        if (tempData.category) urlParams.set('category', tempData.category);

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    const handleClear = () => {
        setTempData({
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

            <div className="p-7 border-b md:border-r md:min-h-screen border-green-500 ">
                <div>
                    <Link to='/' className="text-gray-400 underline">Volver a Home</Link>
                </div>
                <h1 className="text-2xl bg-green-500 rounded-xl p-2 m-5 text-white flex justify-center items-center">Busca un Post</h1>
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Buscar Título:</label>
                        <TextInput
                            placeholder="Buscar..."
                            id="searchTerm"
                            type="text"
                            value={tempData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center gap-7">
                        <label className="font-semibold mr-1">Por fecha:</label>
                        <Select
                            onChange={handleChange}
                            value={tempData.order}
                            id="order">
                            <option value=""></option>
                            <option value="desc">Más recientes</option>
                            <option value="asc">Más antiguos</option>
                        </Select>
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="font-semibold mr-4">Grado/Materia:</label>
                        <Select
                            onChange={handleChange}
                            value={tempData.category}
                            id="category">
                            <option value=""></option>
                            <option value='Primer-grado'>1er Grado</option>
                            <option value='Segundo-grado'>2do Grado</option>
                            <option value='Tercer-grado'>3er Grado</option>
                            <option value='Cuarto-grado'>4to Grado</option>
                            <option value='Quinto-grado'>5to Grado</option>
                            <option value='Sexto-grado'>6to Grado</option>
                            <option value='Artistica' className="font-bold text-orange-500">Artística</option>
                            <option value='Ciencias' className="font-bold text-orange-500">Ciencias</option>
                            <option value='Programacion' className="font-bold text-orange-500">Programación</option>
                            <option value='Ingles'>Inglés</option>
                            <option value='Educacion-fisica'>Educación Física</option>
                            <option value='Artes-visuales'>Artes Visuales</option>
                            <option value='Musica'>Música</option>
                            <option value='uncategorized'>Sin-categoria</option>
                        </Select>
                    </div>
                    <Button
                        type="submit"
                        outline
                        gradientDuoTone='greenToBlue'>
                        Aplicar Filtros
                    </Button>
                    <Button
                        type="button"
                        outline
                        gradientDuoTone='purpleToBlue'
                        onClick={handleClear}>

                        Limpiar
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
                <div className="flex justify-center items-center text-center flex-col">
                    <h1 className="text-3xl font-semibold  p-3 mt-5">Los posts de:<br /> <span className="text-green-500 p-1 rounded-lg"> {sidebarData.category ? sidebarData.category : "Todos los grados y materias"}</span></h1>

                </div>
                <div className="p-7 flex flex-wrap gap-4">
                    {!loading && posts.length === 0 && (
                        <p className="text-xl text-gray-500">Todavía no se publicaron post de: <span className="text-green-500 font-bold">{sidebarData.category}</span></p>
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
