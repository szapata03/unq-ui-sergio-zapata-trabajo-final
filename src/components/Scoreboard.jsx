import "./Scoreboard.css";
import { useNavigate } from "react-router";
import { getScoreboard } from "../services/storage";

const Scoreboard = () => {

    const navigate = useNavigate();
    const scoreboard = getScoreboard();

    return (
        <div className="container py-5">
            <div className="titulo-scoreboard">
                🏆 Mejores Puntajes
            </div>
            {scoreboard.length === 0 ? (
                <div className="sin-puntajes">
                    Todavía no hay puntajes registrados.
                </div>
            ) : (
                <div className="tabla-scoreboard">
                    <div className="fila encabezado">
                        <div>#</div>
                        <div>Jugador</div>
                        <div>Puntos</div>
                    </div>

                    {scoreboard.map(([name, score], index) => (
                        <div className="fila" key={index}>
                            <div>{index + 1}</div>
                            <div>{name}</div>
                            <div>{score}</div>
                        </div>
                    ))}
                </div>
            )}
            <button
                className="boton-volver mt-4"
                onClick={() => navigate("/")}
            >
                ← Volver al menú
            </button>

        </div>
    );
};

export default Scoreboard;