import { useNavigate } from 'react-router-dom'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import CoinsBadge from './CoinsBadge'

const STATUS_STYLE = {
  'en cours':   { bg: 'var(--color-accent-orange-light)', color: 'var(--color-accent-orange-dark)' },
  'disponible': { bg: '#DCFCE7', color: '#16A34A' },
  'terminé':    { bg: '#F3F4F6', color: '#6B7280' },
  'signalé':    { bg: '#FEE2E2', color: '#DC2626' },
}

const HATCH_BG = {
  background: 'repeating-linear-gradient(45deg,#e5e7eb 0,#e5e7eb 1px,#fff 1px,#fff 8px)',
}

function IconBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
    >
      {children}
    </button>
  )
}

function AdRow({ id, category, status, coins, title, desc, image }) {
  const navigate = useNavigate()
  const st = STATUS_STYLE[status] ?? STATUS_STYLE['disponible']
  const showEye   = status !== 'brouillon'
  const showEdit  = status !== 'terminé'
  const showTrash = status === 'brouillon'

  return (
    <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shrink-0 overflow-hidden">
        {image
          ? <img src={image} alt={title} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 font-medium" style={HATCH_BG}>IMAGE</div>
        }
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap gap-1.5 mb-1.5">
          <span className="text-xs font-medium border border-gray-300 rounded px-2 py-0.5 text-gray-600">{(category ?? 'AUTRE').toUpperCase()}</span>
          <span className="text-xs font-semibold rounded px-2 py-0.5" style={{ background: st.bg, color: st.color }}>{status?.toUpperCase()}</span>
        </div>
        <p className="text-base font-semibold truncate" style={{ color: 'var(--color-ink)' }}>{title}</p>
        <p className="text-sm text-gray-400 truncate mt-0.5">{desc}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2 shrink-0">
        <CoinsBadge amount={coins} />
        <div className="flex gap-1">
          {showEye  && <IconBtn onClick={() => navigate('/detail', { state: { id } })}><Eye size={14} /></IconBtn>}
          {showEdit && <IconBtn onClick={() => navigate('/edit-ad', { state: { id } })}><Pencil size={14} /></IconBtn>}
          {showTrash && <IconBtn><Trash2 size={14} /></IconBtn>}
        </div>
      </div>
    </div>
  )
}

export default AdRow
