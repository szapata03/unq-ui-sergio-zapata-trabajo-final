import './Game.css';
import { useState, useRef, useEffect } from "react";
import { validateWord } from "../services/api";
import { useTimer } from "../hooks/useTimer";
import { useNavigate } from "react-router";
import GameOverModal from "../components/GameOverModal";
import { saveScore } from "../services/storage";


const Game = () => {

    const [word, setWord] = useState("");
    const [words, setWords] = useState([]);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [shake, setShake] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const {time,start,pause,resume,stop} = useTimer(15, () => {setGameOver(true);});
    const navigate = useNavigate();

    const inputRef = useRef(null);

    function saveResult(name) {
        saveScore(
            name.trim() || "Player",
            score
        );
    }

    function restartGame() {

        setWord("");
        setWords([]);
        setScore(0);
        setLoading(false);
        setError("");
        setShake(false);
        setGameOver(false);

        stop();

        inputRef.current?.focus();
    }

    function showError(message) {
        setError(message);
        setShake(true);

        setTimeout(() => {
            setShake(false);
        }, 400);
    }

    useEffect(() => {
        if (!loading) {
            inputRef.current?.focus();
        }
    }, [loading]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (loading) return;

        const palabraActual = word.trim().toLowerCase();

        if (!palabraActual) return;

        if (words.includes(palabraActual)) {
            setWord("");
            showError("La palabra ya fue utilizada");
            return;
        }

        if (words.length > 0) {
            const ultimaPalabra = words[words.length - 1];

            if (palabraActual[0] !== ultimaPalabra.at(-1)) {
                setWord("");
                showError(`La palabra debe comenzar con ${ultimaPalabra.at(-1).toUpperCase()}`);
                return;
            }
        }

        setLoading(true);
        pause();
        
        try {
            const exists = await validateWord(palabraActual);

            if (exists) {
                setWords([...words, palabraActual]);
                setScore(score + palabraActual.length);
                start();
            } else {
                showError("La palabra no existe");
                resume();
            }
            setWord("");
        } catch (error) {
            console.error(error);
            resume();
        } finally {
            setLoading(false);
        }
    }

    return(
    <div className="container py-5 ">

      <div className="text-center mb-4 fw-bold fs-1">Palabras Encadenadas</div>


        <div className="">
            <h3>Tiempo: {time}</h3>
            <div className="fw-bold fs-3">Puntaje: {score}</div>
            {words.length > 0 && (
                    <div className='info-letra-actual d-flex'>
                        La próxima palabra debe comenzar con la letra: {" "}
                        <div className='fw-bold fs-4'>  {words.at(-1).at(-1).toUpperCase()}</div>
                    </div>
                )}  
            <form onSubmit={handleSubmit} className="mt-4">

                <div className={`input-group ${shake ? "input-shake" : ""}`}>

                <input
                    autoFocus={true}
                    ref={inputRef}
                    type="text"
                    className="form-control"
                    name="palabra"
                    autoComplete="off"
                    placeholder={
                        words.length === 0
                            ? "Ingrese una palabra"
                            : `Debe comenzar con "${words.at(-1).at(-1)}"`
                    }
                    disabled={loading || gameOver}
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                />

                <button className="btn btn-primary" disabled={loading || gameOver}>
                    {loading ? "Validando..." : "Enviar"}
                </button>

                </div>

            </form>
            {error && (
                        <div className="text-danger text-center fw-bold mt-1 mb-1">
                                {error}
                            </div>
                )}

            <div className='py-2'>Palabras ingresadas</div>

            {words.length === 0 ? (
                <p className="text-muted">Todavía no hay palabras.</p>
            ) : (
                <div className="d-flex flex-wrap align-items-center">
                {words.map((word, index) => (
                    <div key={index} className="d-flex align-items-center me-2 mb-2">
                    <div className='border border-info rounded-pill px-2 py-1 bg-info-subtle'>{word}</div>

                    {index < words.length - 1 && (
                        <div className="mx-2">→</div>
                    )}
                    </div>
                ))}
                </div>
            )}

        </div>
        {gameOver && (
            <GameOverModal
                score={score}
                onRetry={(name) => {
                    saveResult(name);
                    restartGame();
                }}
                onMenu={(name) => {
                    saveResult(name);
                    navigate("/");
                }}
                onScoreboard={(name) => {
                    saveResult(name);
                    navigate("/scoreboard");
                }}
            />
        )}
    </div>
    )
};

export default Game;