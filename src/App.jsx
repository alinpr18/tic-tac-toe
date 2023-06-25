import { Board } from './components/Board'
import { Winner } from './components/Winner'
import { GameContext } from './context/GameContext'
import { useContext } from 'react'

export function App () {
  const { board, turn, resetGame, updateBoard, winner } = useContext(GameContext)

  return (
    <main className='grid place-content-center place-items-center gap-4 h-screen'>
      <h1 className='text-3xl'>Tic Tac Toe</h1>
      <button onClick={resetGame} className='border border-black rounded px-2'>Reiniciar el juego</button>
      <Board board={board} updateBoard={updateBoard} />
      <Winner winner={winner} turn={turn} />
    </main>
  )
}
