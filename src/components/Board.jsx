import { Square } from './Square'

export function Board ({ board, updateBoard }) {
  return (
    <section className='grid grid-cols-3 gap-1'>
      {
        board.map((square, index) => (
          <Square value={() => updateBoard(index)} key={index}>{square}</Square>
        ))
      }
    </section>
  )
}
