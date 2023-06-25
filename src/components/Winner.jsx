import { TURNS } from '../constants'
import { Square } from './Square'

export function Winner ({ winner, turn }) {
  let status

  if (winner === null) {
    status = (
      <>
        <h2>El siguiente en jugar es:</h2>
        <div>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </div>
      </>
    )
  }

  if (winner === TURNS.X || winner === TURNS.O) {
    status = (
      <>
        <h2>El ganador es:</h2>
        <Square>{winner}</Square>
      </>
    )
  }

  if (winner === false) {
    status = (
      <>
        <h2>Empate</h2>
      </>
    )
  }

  return (
    <section className='grid place-items-center'>
      {status}
    </section>
  )
}
