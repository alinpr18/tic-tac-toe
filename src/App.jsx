import confetti from 'canvas-confetti'
import { Board } from './components/Board'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkEndGame, checkWinner } from './logic/board'
import { resetGameStorage } from './logic/storage'
import { useLocalStorage } from './hooks/useLocalStorage'

export function App () {
  const [board, setBoard] = useLocalStorage('board', Array(9).fill(null))
  const [turn, setTurn] = useLocalStorage('turn', TURNS.X)
  const [winner, setWinner] = useLocalStorage('winner', null)

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
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
