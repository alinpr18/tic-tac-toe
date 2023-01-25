export function Square ({ children, value, isSelected }) {
  const nextPlayer = `${isSelected ? 'bg-slate-300' : ''}`

  return (
    <button
      onClick={value}
      className={`${nextPlayer} w-20 h-20 text-4xl border border-black rounded`}
    >
      {children}
    </button>
  )
}
