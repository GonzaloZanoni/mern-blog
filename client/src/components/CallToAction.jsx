import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function CallToAction() {
    return (
        <div className='flex flex-col sm:flex-row p-3  justify-center items-center  text-center bg-yellow-100'>
            <div className="flex-1 justify-center flex flex-col">
                <h2 className='text-2xl'>
                    Want to learn more about JavaScript?
                </h2>
                <p className='text-gray-500 my-2'>
                    Checkout these resources with 100 JavaScript Projects
                </p>
                <Link to={`/post/-rueba-de-get-update`}>
                    <Button gradientDuoTone='greenToBlue' className="w-full">Ir a Post</Button>
                </Link>
                {/* <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                    <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>
                        100 JavaScript Projects
                    </a>
                </Button> */}
            </div>
            <div className="p-7 flex-1">
                <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
            </div>
        </div>
    )
}
