
import { Footer } from "flowbite-react"
import { Link } from "react-router-dom"
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs'
export default function FooterCom() {
    return (
        <Footer container className='border border-t-8 border-blue-200'>
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5">
                        <Link
                            to='/'
                            className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
                        >
                            <span className='px-2 py-1 bg-gradient-to-r  from-blue-500 via-indigo-500 to-purple-500 rounded-lg text-white'>
                                Gonzalo
                            </span>
                            Blog
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title='About' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href="https://www.100jsprojects.com"
                                    target="_blank"
                                    rel='noopener noreferrer'
                                >

                                    100 js projects
                                </Footer.Link>
                                <Footer.Link
                                    href="/home"
                                    target="_blank"
                                    rel='noopener noreferrer'
                                >

                                    Gonzalo blog
                                </Footer.Link>

                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Follow us' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href="https://www.github.com/gonzalozanoni"
                                    target="_blank"
                                    rel='noopener noreferrer'
                                >

                                    Github
                                </Footer.Link>
                                <Footer.Link
                                    href="/#"
                                    target="_blank"
                                    rel='noopener noreferrer'
                                >

                                    Discord
                                </Footer.Link>

                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Legal' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href="#"
                                    target="_blank"
                                    rel='noopener noreferrer'
                                >

                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link
                                    href="/#"
                                    target="_blank"
                                    rel='noopener noreferrer'
                                >

                                    Terms &amp; Conditions
                                </Footer.Link>

                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by="Gonzalo Blog" year={new Date().getFullYear()} />
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href="#" icon={BsFacebook} />
                        <Footer.Icon href="#" icon={BsInstagram} />
                        <Footer.Icon href="#" icon={BsTwitter} />
                        <Footer.Icon href="#" icon={BsGithub} />
                    </div>
                </div>
            </div>
        </Footer>
    );
}
