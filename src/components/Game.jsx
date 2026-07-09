import './Game.css';
import { useState } from "react";
import { validateWord } from "../services/api";


const Game = () => {

    const [word, setWord] = useState("");
    const [words, setWords] = useState([]);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (loading) return;

        const palabraActual = word.trim().toLowerCase();

        if (!palabraActual) return;

        if (words.includes(palabraActual)) {
            setWord("");
            return;
        }

        if (words.length > 0) {
            const ultimaPalabra = words[words.length - 1];

            if (palabraActual[0] !== ultimaPalabra.at(-1)) {
                setWord("");
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

            setWord("");
        } catch (error) {
            console.error(error);
        } finally {
        setLoading(false);
        }
    }

    return(
    <div className="container py-5 ">

      <div className="text-center mb-4 ">Palabras Encadenadas</div>


        <div className="">

          <div className="fw-bold fs-2">Puntaje: {score}</div>
          {words.length > 0 && (
                <div className='info-letra-actual d-flex'>
                    La próxima palabra debe comenzar con la letra: {" "}
                    <div className='fw-bold fs-3'>  {words.at(-1).at(-1).toUpperCase()}</div>
                </div>
            )}  
          <form onSubmit={handleSubmit} className="mt-4">

            <div className="input-group">

              <input
                type="text"
                className="form-control"
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


          <div>Palabras ingresadas</div>

          {words.length === 0 ? (
            <p className="text-muted">Todavía no hay palabras.</p>
          ) : (
            <div className="list-group">

              {words.map((word, index) => (
                <div
                  key={index}
                  className="list-group-item"
                >
                  {word}
                </div>
              ))}

            </div>
          )}

        </div>


    </div>
    )
};

export default Game;