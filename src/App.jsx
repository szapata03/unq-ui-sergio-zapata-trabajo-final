import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Routes, Route, Navigate } from 'react-router';
import Game from "./components/Game.jsx"
import MenuGame from "./components/MenuGame.jsx"
import Scoreboard from "./components/Scoreboard.jsx"

function App() {

  return (
    <>
    <Routes>
        <Route path='/' element={<MenuGame />}/>
        <Route path='/game' element={<Game />}/>
        <Route path='/scoreboard' element={<Scoreboard />}/>
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
