import { Link } from "react-router-dom";

export default function Projects() {
    return (
        <section className="client">
            <div className="section__container client__container">
                <h1 className="section__header mb-5 p-3 pb-10">Conect<span className='bg-orange-400 rounded-full p-1 pl-2 text-white'>Arte</span></h1>
                <p className='bg-orange-100 p-5 rounded-2xl text-orange-700 font-semibold'>El proyecto <u>´conectARTE 25 años´</u> busca implementar un aprendizaje activo y significativo que involucra a estudiantes en la exploración de su entorno natural, social y cultural, usando la historia institucional de 25 años como marco.

                </p>
                <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-[40px] text-center justify-center">

                    <p className='bg-orange-100 p-5 rounded-2xl text-orange-700 font-bold'>
                        <span className="uppercase text-xl flex justify-center p-2 rounded-xl">Trabajo <br /> activo y colaborativo </span>
                        <img src="img/conectarte-2.jpg" alt="" />
                    </p>
                    <p className='bg-orange-100 justify-center p-5 rounded-2xl text-orange-700 font-semibold'>
                        <span className="uppercase mt-7  text-2xl bg-orange-200 flex justify-center p-4 m-5 rounded-xl">Indagación </span>
                        <span className="uppercase text-2xl bg-orange-200 flex justify-center p-4 m-5 rounded-xl">Observación </span>
                        <span className="uppercase text-2xl bg-orange-200 flex justify-center p-4 m-5 rounded-xl">Investigación </span>
                    </p>
                    <p className='justify-center items-center text-center bg-orange-100 p-5 rounded-2xl text-orange-700 font-bold'>
                        <span className="uppercase text-xl flex justify-center p-2 rounded-xl">Áreas interdisciplinares</span>
                        <img className="max-w-[400px] max-h-[300px]" src="img/conectarte-4.jpg" alt="" />
                    </p>

                </section>


                <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-[80px] p-5">
                    <div className="flex justify-center items-center">
                        <img src="img/conectar1.jpg" alt="Artística" className="rounded-lg max-w-[500px] h-auto" />
                    </div>
                    <div className="flex flex-col justify-center p-4">
                        <h2 className="text-2xl text-orange-900 font-bold mb-4 text-center md:text-left">Explora nuestras experiencias artísticas</h2>
                        <p className="text-lg text-orange-600 text-center md:text-left">
                            El proyecto se estructura en cuatro pilares: <br /> <br /> <b>Empoderamiento <br /> Colaboración <br /> Creatividad <br /> Pensamiento crítico <br /> <br /> </b>
                            {/* Incluye actividades para la producción de un cortometraje con marionetas, finalizando con una muestra interactiva abierta a la comunidad para compartir resultados y experiencias. */}
                        </p>
                    </div>
                </section>

                <div className="client__grid pt-5">
                    <Link to='/conectarte-arte'>
                        <div className="client__card cursor-pointer flex flex-col items-center justify-center bg-violet-500  shadow-xl transform transition-transform duration-300 hover:scale-110">
                            <h1 className='text-4xl font-semibold mb-4 text-white'>Artística</h1>
                        </div>
                    </Link>
                    <Link to='/conectarte-ciencia'>
                        <div className="client__card cursor-pointer flex flex-col items-center justify-center bg-green-500  shadow-xl transform transition-transform duration-300 hover:scale-110">
                            <h1 className='text-4xl font-semibold mb-4 text-white'>Ciencias</h1>

                        </div>
                    </Link>
                    <Link to='/conectarte-programacion'>
                        <div className="client__card cursor-pointer flex flex-col items-center justify-center bg-blue-500  shadow-xl transform transition-transform duration-300 hover:scale-110">
                            <h1 className='flex justify-center text-center text-3xl font-semibold mb-4 text-white '>Programación y TIC´s</h1>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}
