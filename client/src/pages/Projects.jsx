import { Link } from "react-router-dom";

export default function Projects() {
    return (
        <section className="client">
            <div className="section__container client__container">
                <h1 className="section__header mb-5 p-3 pb-10">Conect<span className='bg-orange-400 rounded-full p-1 pl-2 text-white'>Arte</span></h1>
                <p className='bg-orange-100 p-5 rounded-2xl text-orange-700 font-semibold'>El proyecto <u>´conectARTE 25 años´</u> busca implementar un aprendizaje activo y significativo que involucra a estudiantes en la exploración de su entorno natural, social y cultural, usando la historia institucional de 25 años como marco. <br /> <br />
                    A través de procesos de indagación, observación e investigación, se promueven la producción artística y la interacción con la programación tecnológica, enfrentando desafíos de acceso y manejo de TIC.
                    <br /> <br />
                    El trabajo activo y colaborativo de todas las áreas interdisciplinares permiten que los estudiantes participen activamente construyendo y ampliando sus aprendizajes.
                </p>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-15 p-5">
                    <div className="flex justify-center items-center mt-10">
                        <img src="img/conectar1.jpg" alt="Artística" className="rounded-lg max-w-[500px] h-auto" />
                    </div>
                    <div className="flex flex-col justify-center p-4">
                        <h2 className="text-2xl text-orange-900 font-bold mb-4 text-center md:text-left">Explora nuestras experiencias artísticas</h2>
                        <p className="text-lg text-orange-600 text-center md:text-left">
                            El proyecto se estructura en cuatro pilares: <br /> <br /> <b>Empoderamiento <br /> Colaboración <br /> Creatividad <br /> Pensamiento crítico <br /> <br /> </b>  Con una dimensión lúdica que motiva el diseño de experiencias. Incluye actividades para la producción de un cortometraje con marionetas, finalizando con una muestra interactiva abierta a la comunidad para compartir resultados y experiencias.
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
