import confetti from 'canvas-confetti'
import { createContext } from 'react'
import { TURNS } from '../constants'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { checkEndGame, checkWinner } from '../logic/board'

export const GameContext = createContext()

export const GameProvider = ({ children }) => {
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
    window.localStorage.clear()
  }

  return (
    <GameContext.Provider value={{ board, turn, winner, resetGame, updateBoard }}>
      {children}
    </GameContext.Provider>
  )
}
