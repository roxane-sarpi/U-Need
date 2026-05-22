import { TrendingUp, TrendingDown } from 'lucide-react'
import CoinsBadge from './CoinsBadge'

function HistoryRow({ date, label, delta }) {
  const positive = delta > 0
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: positive ? 'var(--color-accent-orange-light)' : '#FEE2E2' }}
        >
          {positive
            ? <TrendingUp size={14} style={{ color: 'var(--color-accent-orange-dark)' }} />
            : <TrendingDown size={14} color="#DC2626" />
          }
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate" style={{ color: 'var(--color-ink)' }}>{label}</p>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </div>
      <div className="ml-3 shrink-0">
        {positive
          ? <CoinsBadge amount={delta} prefix="+" />
          : <span className="text-sm font-bold" style={{ color: '#DC2626' }}>-{Math.abs(delta)}</span>
        }
      </div>
    </div>
  )
}

export default HistoryRow
