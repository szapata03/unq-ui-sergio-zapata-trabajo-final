import { useState } from "react";

const GameOverModal = ({ score, onRetry, onMenu, onScoreboard }) => {

    const [name, setName] = useState("");

    return (
        <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content">

                    <div className="modal-header">
                        <div className="modal-title fw-bold fs-3">
                            Game Over
                        </div>
                    </div>

                    <div className="modal-body">

                        <div className="fs-4 mb-4">
                            Puntaje: <strong>{score}</strong>
                        </div>
                        <div className="form-label">
                            Nombre (opcional)
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            maxLength={20}
                            value={name}
                            placeholder='Si queda vacío se usará "Player"'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="modal-footer d-flex flex-column gap-2">
                        <button
                            className="btn btn-success w-100"
                            onClick={() => onRetry(name)}
                        >
                            🔁 Reintentar
                        </button>
                        <button
                            className="btn btn-primary w-100"
                            onClick={() => onScoreboard(name)}
                        >
                            🏆 Ver Scoreboard
                        </button>

                        <button
                            className="btn btn-secondary w-100"
                            onClick={() => onMenu(name)}
                        >
                            🏠 Ir al Inicio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameOverModal;