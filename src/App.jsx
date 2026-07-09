import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Routes, Route, Navigate } from 'react-router';
import Game from "./components/Game.jsx"

function App() {

  return (
    <>
    <Routes>
        <Route path='/' element={<Game />}/>
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
