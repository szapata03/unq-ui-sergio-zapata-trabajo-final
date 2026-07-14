import './MenuGame.css';
import { useNavigate } from 'react-router';

const MenuGame = () => {
    const navigate = useNavigate();
    
        return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="menu-inicio">
                <div className="titulo">
                    Palabras Encadenadas
                </div>
                <div className="descripcion">
                    Formá la cadena más larga de palabras antes de que se acabe el tiempo.
                </div>
                <button
                    className="boton-accion"
                    onClick={() => navigate("/game")}
                >
                    🎮 Comenzar partida
                </button>
                <button
                    className="boton-accion"
                    onClick={() => navigate("/scoreboard")}
                >
                    🏆 Mejores Puntajes
                </button>
                <button 
                    className='boton-accion' 
                    data-bs-toggle="modal" 
                    data-bs-target="#modalInstrucciones"
                > 
                    📖 Instrucciones
                </button>
            </div>
            <div
                className="modal fade"
                id="modalInstrucciones"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title fs-4 fw-bold">
                                Cómo jugar
                            </div>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            />
                        </div>
                        <div className="modal-body">
                            <ul className="mb-0">
                                <li>La primer palabra puede ser cualquiera.</li>
                                <li>Las siguientes deben comenzar con la última letra de la palabra anterior.</li>
                                <li>No se pueden repetir palabras.</li>
                                <li>Cada letra de la palabra suma 1 punto.</li>
                                <li>Por cada acierto, el tiempo vuelve a 15 segundos.</li>
                                <li>Si el tiempo llega a 0, la partida finaliza.</li>
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuGame;

