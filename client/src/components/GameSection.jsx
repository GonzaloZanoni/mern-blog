import '../pages/Game-Styles/GamesSection.css';


const games = [
    {
        id: 1,
        name: 'Toca el Libro',
        description: `Este es un divertido juego creado por Benjamin y Felipe. 
        Donde tienes que hacer click en los libros que aparecen. Si tocas el fondo, pierdes.`,
        url: './juegos/Benja-Felipe.html'
    },
    {
        id: 2,
        name: 'Preguntados 1',
        description: `Este es un divertido juego creado por Lola y Emma. 
        Tienes que responder preguntas referidas a la escuela. Tienes 3 vidas para intentarlo.` ,
        url: './juegos/Lola_Emma.html'
    },
    {
        id: 3,
        name: 'Preguntados 2',
        description: `Este es un divertido juego creado por Marti F, Marti B  y Victoria. 
        Esta es una segunda versión del juego Preguntados.` ,
        url: './juegos/Marti-Jazmin-Marti.html'
    },
    {
        id: 4,
        name: 'Map School',
        description: `Este es un divertido juego creado por Ian y Facundo. 
        Recrearon un pequeño mapa de la escuela, donde realizan actividades a diario.` ,
        url: './juegos/FACUNDO-IAN.html'
    },
    {
        id: 5,
        name: 'Música y Piano',
        description: `Este es un divertido juego creado por Benjamin y Bautista. 
        Es un juego donde puedes escuchar melodias con el piano y tambien puedes tocarlas.` ,
        url: './juegos/Benja_Bauty.html'
    },
    {
        id: 6,
        name: 'Preguntados 3',
        description: `Este es un divertido juego creado por Alex y Angie. 
        Es un juego donde puedes escuchar melodias con el piano y tambien puedes tocarlas.` ,
        url: './juegos/Alex-Angie.html'
    },
    {
        id: 7,
        name: 'Cartulipur',
        description: `Este es un divertido juego creado por Iker y Jezlia. 
        Tomas el rol de una maestra, tienes que saltar las cajas. Sino debes realizar una tarea.` ,
        url: './juegos/Iker_Jezlia.html'
    },
    {
        id: 8,
        name: 'Corre',
        description: `Este es un divertido juego creado por Martina y Victoria. 
        Debes realizar las tareas de la clase en un tiempo determinado, para luego salir al recreo.` ,
        url: './juegos/Martina_Victoria.html'
    },
    {
        id: 9,
        name: 'Escapa',
        description: `Este es un divertido juego creado por Lourdes y Mia. 
        Debes realizar las actividades en diferentes lugares de la escuela.` ,
        url: './juegos/Lourdes_Mia.html'
    },

    {
        id: 10,
        name: 'Materias',
        description: `Este es un divertido juego creado por Jony. 
        Debes realizar algunas acitividades de diferentes materias.` ,
        url: './juegos/Jony.html'
    },


];

const GamesSection = () => {

    return (
        <div className="games-container">
            {/* <h1 className="title">Scratch 6to Grado</h1> */}
            <img src="./img/scratch.png" className='logo_scratch' alt="logo_scratch" />
            <div className="games-grid">
                {games.map((game) => (
                    <div key={game.id} className="game-item">
                        <h2>{game.name}</h2>
                        <p className="game-description">{game.description}</p>
                        <div className="iframe-container">
                            <iframe
                                src={game.url}
                                title={game.name}
                                className="game-frame"
                                allowFullScreen
                            ></iframe>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GamesSection;

