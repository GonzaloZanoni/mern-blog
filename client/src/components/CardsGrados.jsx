// import { HiUser } from 'react-icons/hi';

export default function CardsGrados() {
    return (
        <div className="flex justify-center items-center mt-10 min-h-screen bg-white">

            <section className="w-full max-w-screen-lg p-6">

                <h1 className="text-5xl font-bold text-center mb-8 bg-green-100 rounded-lg p-3">GRADOS <span></span></h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div className="bg-gradient-to-r from-blue-400 to-purple-600 hover:from-green-400 hover:to-blue-500 p-6 rounded-lg shadow-md text-center hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                        <h3 className="text-2xl font-semibold mb-4 text-white transition-transform duration-300 hover:scale-110">
                            <img src="/img/1.png" alt="" className="inline-block h-20 w-auto mr-2" /> 1er GRADO
                        </h3>
                    </div>

                    <div className="bg-gradient-to-r from-red-400 to-yellow-500 hover:from-yellow-400 hover:to-pink-400 p-6 rounded-lg shadow-md text-center hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                        <h3 className="text-2xl font-semibold mb-4 text-white transition-transform duration-300 hover:scale-110">
                            <img src="/img/2.png" alt="" className="inline-block h-20 w-auto mr-2" />2do GRADO
                        </h3>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-cyan-400 hover:to-pink-400 p-6 rounded-lg shadow-md text-center hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                        <h3 className="text-2xl font-semibold mb-4 text-white transition-transform duration-300 hover:scale-110">
                            <img src="/img/3.png" alt="" className="inline-block h-20 w-auto mr-2" /> 3er GRADO
                        </h3>
                    </div>

                    <div className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-purple-500 hover:to-green-400 p-6 rounded-lg shadow-md text-center hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                        <h3 className="text-2xl font-semibold mb-4 text-white transition-transform duration-300 hover:scale-110">
                            <img src="/img/4.png" alt="" className="inline-block h-20 w-auto mr-2" /> 4to GRADO
                        </h3>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-green-400 hover:to-yellow-400 p-6 rounded-lg shadow-md text-center hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                        <h3 className="text-2xl font-semibold mb-4 text-white transition-transform duration-300 hover:scale-110">
                            <img src="/img/5.png" alt="" className="inline-block h-20 w-auto mr-2" /> 5to GRADO
                        </h3>
                    </div>

                    <div className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-orange-500 hover:to-yellow-300 p-6 rounded-lg shadow-md text-center hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                        <h3 className="text-2xl font-semibold mb-4 text-white transition-transform duration-300 hover:scale-110">
                            <img src="/img/6.png" alt="" className="inline-block h-20 w-auto mr-2" /> 6to GRADO
                        </h3>
                    </div>



                </div >

                <h1 className="text-4xl font-bold text-center mb-8 mt-12 bg-blue-100 rounded-lg p-3">MATERIAS ESPECIALES</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-white hover:to-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border-2 hover:border-green-500 transition-colors duration-300 cursor-pointer">
                        <h3 className="text-2xl font-semibold mb-4">ARTES VISUALES</h3>
                    </div>


                    <div className="bg-gradient-to-r from-orange-500 to-yellow-200 hover:from-white hover:to-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border-2 hover:border-orange-500 transition-colors duration-300 cursor-pointer">
                        <h3 className="text-2xl font-semibold mb-4">MÚSICA</h3>
                        {/* <img src="/img/education1.png" alt="" /> */}
                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-white hover:to-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border-2 hover:border-purple-500 transition-colors duration-300 cursor-pointer">
                        <h3 className="text-2xl font-semibold mb-4">INGLÉS</h3>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-400 to-red-500 hover:from-white hover:to-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border-2 hover:border-red-500 transition-colors duration-300 cursor-pointer">
                        <h3 className="text-2xl font-semibold mb-4">EDUCACIÓN FÍSICA</h3>
                        {/* <img src="/img/education2.png" alt="" /> */}
                    </div>
                </div>

            </section>
        </div>
    );
}
