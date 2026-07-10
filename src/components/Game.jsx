import './Game.css';
import { useState, useRef, useEffect } from "react";
import { validateWord } from "../services/api";


const Game = () => {

    const [word, setWord] = useState("");
    const [words, setWords] = useState([]);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [shake, setShake] = useState(false);

    const inputRef = useRef(null);

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
            setError("Palabra actual ya fue utilizada")
            setShake(true);
            setTimeout(() => {
                setShake(false);
            }, 400);
            return;
        }

        if (words.length > 0) {
            const ultimaPalabra = words[words.length - 1];

            if (palabraActual[0] !== ultimaPalabra.at(-1)) {
                setWord("");
                setError(`La palabra debe comenzar con letra ${ultimaPalabra.at(-1).toUpperCase()}`)
                setShake(true);
                setTimeout(() => {
                    setShake(false);
                }, 400);
                return;
            }
        }

        setLoading(true);
        
        try {
            const exists = await validateWord(palabraActual);

            if (exists) {
                setWords([...words, palabraActual]);
                setScore(score + palabraActual.length);
            }
            if (!exists){
                setError("La palabra no existe en el diccionario")
                setShake(true);
                setTimeout(() => {
                    setShake(false);
                }, 400);
            }
            setWord("");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return(
    <div className="container py-5 ">

      <div className="text-center mb-4 fw-bold fs-1">Palabras Encadenadas</div>


        <div className="">

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
                
                disabled={loading}
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />

              <button className="btn btn-primary" disabled={loading}>
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


    </div>
    )
};

export default Game;