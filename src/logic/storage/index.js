export const saveGameToStorage = ({ board, turn, winner }) => {
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', turn)
  window.localStorage.setItem('winner', winner)
}

export const resetGameStorage = () => {
  window.localStorage.clear('board')
  window.localStorage.clear('turn')
  window.localStorage.clear('winner')
}
