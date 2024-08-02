/* eslint-disable no-unused-vars */
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';
// import { FaMoon, FaSun } from 'react-icons/fa';
// import { toggleTheme } from '../redux/theme/themeSlice';

export default function Header1() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    // const [searchTerm, setSearchTerm] = useState('');

    // useEffect(() => {
    //     const urlParams = new URLSearchParams(location.search);
    //     const searchTermFromUrl = urlParams.get('searchTerm');
    //     if (searchTermFromUrl) {
    //         setSearchTerm(searchTermFromUrl);
    //     }
    // }, [location.search]);

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', { method: 'POST' });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const urlParams = new URLSearchParams(location.search);
    //     urlParams.set('searchTerm', searchTerm);
    //     const searchQuery = urlParams.toString();
    //     navigate(`/search?${searchQuery}`);
    // };

    const onToggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    return (
        <Navbar className="w-full z-50 border-b-2 border-green-400 shadow-2xl h-20 flex">
            <nav className="flex justify-between items-center w-[92%] mx-auto">
                <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                    <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-green-500 to-green-700 rounded-lg text-white">
                        Capitan
                    </span>
                    Blog
                </Link>

                {/* <form>
                    <TextInput
                        type="text"
                        placeholder="Search..."
                        rightIcon={AiOutlineSearch}
                        className="hidden lg:block"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form> */}
                {/* <Button
                    className='w-12 h-10 hidden sm:inline'
                    color='gray'
                    pill
                    onClick={() => dispatch(toggleTheme())}
                >
                    {theme === 'light' ? <FaMoon /> : <FaSun />}

                </Button> */}

                <div
                    className={`nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[100vh] left-0 ${isMenuOpen ? 'top-0' : 'top-[-100%]'
                        } md:w-auto w-full flex flex-col items-center px-5 z-50`}
                >
                    <div className="w-full flex justify-end md:hidden">
                        <button onClick={onToggleMenu} className="text-3xl m-5">
                            <AiOutlineClose />
                        </button>
                    </div>
                    <ul className="flex md:mt-0 mt-20 md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 w-full md:w-auto text-center text-xl">
                        <li>
                            <Link
                                className={`relative overflow-hidden border-b border-transparent hover:border-green-500 transition duration-300 ease-in-out p-1 ${path === "/" ? "border-green-500" : ""}`}
                                to="/"
                                onClick={onToggleMenu}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`relative overflow-hidden border-b border-transparent hover:border-green-500 transition duration-300 ease-in-out p-2 ${path === "/projects" ? "border-green-500" : ""}`}
                                to="/about"
                                onClick={onToggleMenu}

                            >
                                Nosotros
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`relative overflow-hidden text-white font-semibold bg-orange-400 rounded-3xl border-xl  hover:border-orange-400 hover:bg-white hover:text-orange-400 transition duration-300 ease-in-out p-2 ${path === "/projects" ? "border-green-500" : ""}`}
                                to="/projects"
                                onClick={onToggleMenu}>
                                ConectArte
                            </Link>
                        </li>
                        {/* <li>
                            <a className="hover:text-green-500" href="#">
                                Developers
                            </a>
                        </li> */}
                    </ul>
                </div>

                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">@{currentUser.username}</span>
                            <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to="/dashboard?tab=profile">
                            <Dropdown.Item>Panel de Control</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignout}>Cerrar Sesión</Dropdown.Item>
                    </Dropdown>
                ) : (

                    <Link to="/about" className="flex flex-wrap gap-2">
                        {/* <Button outline gradientDuoTone="greenToBlue">
                            Sign In
                        </Button> */}
                        <img src="img/logo1.png" alt="logo" className='h-12 w-12' />
                    </Link>
                )
                }

                <div className="flex items-center gap-6 md:hidden">
                    <button onClick={onToggleMenu} className="text-3xl cursor-pointer">
                        {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                    </button>
                </div>
            </nav>
        </Navbar>
    );
}
