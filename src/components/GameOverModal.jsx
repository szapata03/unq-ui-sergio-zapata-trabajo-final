import './GameOverModal.css';
import { useState } from "react";

const GameOverModal = ({ score, words, onRetry, onMenu, onScoreboard }) => {

    const [name, setName] = useState("");

    return (
        <div className="gameover-backdrop">
            <div className="modal fade show d-block">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header justify-content-center">
                            <div className="modal-title fw-bold fs-4 m-0">
                                ¡Tiempo Agotado!
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="mb-2">
                                <div className="fw-bold">
                                    Puntaje: {score}
                                </div>
                                <div className="fw-bold">
                                    Palabras encadenadas: {words.length}
                                </div>
                                <div className="fw-bold mb-2">
                                    Cadena formada
                                </div>
                                <div className="lista-palabras-final mb-3">
                                    {words.map((word, index) => (
                                        <div key={index} className="d-flex align-items-center mb-2">

                                            <div className="border border-info rounded-pill px-2 py-1 bg-info-subtle">
                                                {word}
                                            </div>
                                            {index < words.length - 1 && (
                                                <div className="mx-1">→</div>
                                            )}

                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="form-label mb-1">
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

                        </div>
                        <div className="modal-footer d-flex flex-column gap-2">
                            <button
                                className="btn btn-success w-100"
                                onClick={() => onRetry(name)}
                            >
                                🔁 Guardar y Reintentar
                            </button>
                            <button
                                className="btn btn-primary w-100"
                                onClick={() => onScoreboard(name)}
                            >
                                🏆 Guardar y Ver Scoreboard
                            </button>
                            <button
                                className="btn btn-secondary w-100"
                                onClick={() => onMenu(name)}
                            >
                                💾 Guardar y Salir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameOverModal;