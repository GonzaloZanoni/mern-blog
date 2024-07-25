
import { Footer } from "flowbite-react"
import { Link } from "react-router-dom"
import { BsFacebook, BsInstagram } from 'react-icons/bs'
import { useNavigate } from "react-router-dom";
export default function FooterCom() {
    const navigate = useNavigate();

    const handleCategorySearch = (category) => {
        navigate(`/search?category=${category}`);
    }

    return (
        <Footer container className='border border-t-8 border-blue-200'>
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5">
                        <Link
                            to='/'
                            className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
                        >
                            <span className='px-2 py-1 bg-gradient-to-r  from-green-500 via-green-500 to-green-700 rounded-lg text-white'>
                                Capitan
                            </span>
                            Blog
                        </Link>
                        <div className="flex justify-center">
                            <img src="img/logo1.png" alt="logo" className='h-32 w-32 m-10' />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-4 sm:gap-6">
                        <div>
                            <Footer.Title title='Nosotros' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href="about"
                                    // target="_blank"
                                    rel='noopener noreferrer'
                                >

                                    Escudo
                                </Footer.Link>
                                <Footer.Link
                                    href="/about"
                                    // target="_blank"
                                    rel='noopener noreferrer'

                                >

                                    Primer Edificio
                                </Footer.Link>

                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Materias' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href=""
                                    // target="_blank"
                                    rel='noopener noreferrer'
                                    onClick={() => handleCategorySearch('Ingles')}
                                >

                                    Inglés
                                </Footer.Link>
                                <Footer.Link
                                    href=""
                                    // target="_blank"
                                    rel='noopener noreferrer'
                                    onClick={() => handleCategorySearch('Musica')}
                                >

                                    Música
                                </Footer.Link>
                                <Footer.Link
                                    href=""
                                    // target="_blank"
                                    rel='noopener noreferrer'
                                    onClick={() => handleCategorySearch('Educacion-fisica')}
                                >

                                    Educación Física
                                </Footer.Link>
                                <Footer.Link
                                    href=""
                                    // target="_blank"
                                    rel='noopener noreferrer'
                                    onClick={() => handleCategorySearch('Artes-visuales')}
                                >

                                    Artes Visuales
                                </Footer.Link>

                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='ConectArte' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href=""
                                    // target="_blank"
                                    rel='noopener noreferrer'
                                    onClick={() => handleCategorySearch('Artistica')}
                                >

                                    Artística
                                </Footer.Link>
                                <Footer.Link
                                    href=""
                                    // target="_blank"
                                    rel='noopener noreferrer'
                                    onClick={() => handleCategorySearch('Ciencias')}
                                >

                                    Ciencias
                                </Footer.Link>
                                <Footer.Link
                                    href=""
                                    // target="_blank"
                                    rel='noopener noreferrer'
                                    onClick={() => handleCategorySearch('Programacion')}
                                >

                                    Programación/tic´s
                                </Footer.Link>

                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Grados' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href=""
                                    // target="_blank"
                                    rel='noopener noreferrer'
                                    onClick={() => handleCategorySearch('Primer-grado')}
                                >

                                    Primer Grado
                                </Footer.Link>
                                <Footer.Link
                                    href=""
                                    // target="_blank"
                                    rel='noopener noreferrer'
                                    onClick={() => handleCategorySearch('Segundo-grado')}
                                >

                                    Segundo Grado
                                </Footer.Link>
                                <Footer.Link
                                    href=""
                                    // target="_blank"
                                    rel='noopener noreferrer'
                                    onClick={() => handleCategorySearch('Tercer-grado')}
                                >

                                    Tercer Grado
                                </Footer.Link>
                                <Footer.Link
                                    href=""
                                    // target="_blank"
                                    rel='noopener noreferrer'
                                    onClick={() => handleCategorySearch('Cuarto-grado')}
                                >

                                    Cuarto Grado
                                </Footer.Link>
                                <Footer.Link
                                    href=""
                                    // target="_blank"
                                    rel='noopener noreferrer'
                                    onClick={() => handleCategorySearch('Quinto-grado')}
                                >

                                    Quinto Grado
                                </Footer.Link>
                                <Footer.Link
                                    href=''
                                    // target="_blank"
                                    rel='noopener noreferrer'
                                    onClick={() => handleCategorySearch('Sexto-grado')}
                                >

                                    Sexto Grado
                                </Footer.Link>

                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between"> Capitán José L. Ardiles
                    <Footer.Copyright href="https://github.com/GonzaloZanoni" by="Gonzalo Zanoni" target="_blank" year={new Date().getFullYear()} />
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href="#" icon={BsFacebook} />
                        <Footer.Icon href="#" icon={BsInstagram} />
                    </div>
                </div>
            </div>
        </Footer>
    );
}
