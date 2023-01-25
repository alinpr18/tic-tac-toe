import confetti from 'canvas-confetti'
import { useState } from 'react'
import { Board } from './components/Board'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkEndGame, checkWinner } from './logic/board'
import { resetGameStorage, saveGameToStorage } from './logic/storage'

export function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFormStorage = window.localStorage.getItem('turn')
    return turnFormStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem('winner')
    if (winnerFromStorage === TURNS.X) {
      return TURNS.X
    }

    if (winnerFromStorage === TURNS.O) {
      return TURNS.O
    }

    if (winnerFromStorage === 'false') {
      return false
    }

    return null
  })

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    let status
    if (newWinner) {
      status = newWinner
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      status = false
      setWinner(false)
    }
    saveGameToStorage({ board: newBoard, turn: newTurn, winner: status })
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  return (
    <main className='grid place-content-center place-items-center gap-4 h-screen'>
      <h1 className='text-3xl'>Tic Tac Toe</h1>
      <button onClick={resetGame} className='border border-black rounded px-2'>Reiniciar el juego</button>
      <Board board={board} updateBoard={updateBoard} />
      <section className='grid place-items-center'>
        {
          winner === null
            ? (
              <>
                <h2>El siguiente en jugar es:</h2>
                <div>
                  <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                  <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
                </div>
              </>
              )
            : winner
              ? (
                <>
                  <h2>El ganador es:</h2>
                  <Square>{winner}</Square>
                </>
                )
              : <h2>Empate</h2>
        }
      </section>
    </main>
  )
}
