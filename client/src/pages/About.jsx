import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="mt-0">
            <div className="ml-5 w-20 sm:ml-20">
                <Link rel="stylesheet" to='/' className="m-5">
                    <Button gradientDuoTone='greenToBlue' className="">Volver</Button>
                </Link>
            </div>
            <div className="w-92">
                <img src="img/seccion-construccion.png" alt=""
                    className="w-full" />
            </div>

        </div>
    )
}
