const COIN_CLASSES = {
  1: 'bg-primary-soft  text-primary',
  2: 'bg-primary-light text-primary',
  3: 'bg-primary       text-white',
  4: 'bg-amber-100     text-amber-700',
  5: 'bg-amber-400     text-amber-800',
}

function CoinsBadge({ amount, prefix = '' }) {
  const cls = COIN_CLASSES[amount] ?? COIN_CLASSES[5]
  return (
    <span className={`flex items-center gap-1.5 text-sm font-bold rounded-lg px-2.5 py-1 shrink-0 ${cls}`}>
      {prefix}{amount}
      <img src="/UneedCoin.png" alt="coin" className="w-4 h-4 object-contain" />
    </span>
  )
}

export default CoinsBadge
