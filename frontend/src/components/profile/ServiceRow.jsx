import { CheckCircle } from 'lucide-react'
import CoinsBadge from './CoinsBadge'

const HATCH_BG = {
  background: 'repeating-linear-gradient(45deg,#e5e7eb 0,#e5e7eb 1px,#fff 1px,#fff 8px)',
}

function ServiceRow({ category, date, title, forUser, coins }) {
  return (
    <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shrink-0 flex items-center justify-center text-xs text-gray-400 font-medium" style={HATCH_BG}>
        IMAGE
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap gap-1.5 mb-1.5">
          <span className="text-xs font-medium border border-gray-300 rounded px-2 py-0.5 text-gray-600">{(category ?? 'AUTRE').toUpperCase()}</span>
          <span className="text-xs text-gray-400">{date}</span>
        </div>
        <p className="text-sm font-medium truncate" style={{ color: 'var(--color-ink)' }}>{title}</p>
        <span className="text-xs text-gray-400">pour {forUser}</span>
      </div>
      <div className="shrink-0 flex items-center gap-1">
        <CheckCircle size={13} style={{ color: '#16A34A' }} />
        <CoinsBadge amount={coins} />
      </div>
    </div>
  )
}

export default ServiceRow
