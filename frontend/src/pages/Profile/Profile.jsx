import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star, Eye, Pencil, MoreHorizontal, Trash2, Heart, CheckCircle, TrendingUp, TrendingDown, User, Phone, Mail } from 'lucide-react'
import { useAuth } from '../../components/context/AuthContext'
import { getUserById } from '../../components/services/userService'
import { getAdsByUser } from '../../components/services/adService'
import { getServicesByHelper, getHistoryByUser } from '../../components/services/requestService'



const STATUS_STYLE = {
  'en cours':   { bg: 'var(--color-accent-orange-light)', color: 'var(--color-accent-orange-dark)' },
  'disponible': { bg: '#DCFCE7', color: '#16A34A' },
  'terminé':    { bg: '#F3F4F6', color: '#6B7280' },
  'signalé':    { bg: '#FEE2E2', color: '#DC2626' },
}

const HATCH_BG = {
  background: 'repeating-linear-gradient(45deg,#e5e7eb 0,#e5e7eb 1px,#fff 1px,#fff 8px)',
}

const COIN_CLASSES = {
  1: 'bg-primary-soft  text-primary',
  2: 'bg-primary-light text-primary',
  3: 'bg-primary       text-white',
  4: 'bg-amber-100     text-amber-700',
  5: 'bg-amber-400     text-amber-800',
}

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })

function IconBtn({ children }) {
  return (
    <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors">
      {children}
    </button>
  )
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

function Stars({ count }) {
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={11} fill={i < count ? 'var(--color-accent-orange)' : '#e5e7eb'} color={i < count ? 'var(--color-accent)' : '#e5e7eb'} />
      ))}
    </span>
  )
}

function AdRow({ category, status, coins, title, desc }) {
  const st = STATUS_STYLE[status] ?? STATUS_STYLE['disponible']
  const showEye   = status !== 'brouillon'
  const showEdit  = status !== 'terminé'
  const showMore  = status !== 'brouillon'
  const showTrash = status === 'brouillon'

  return (
    <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shrink-0 flex items-center justify-center text-xs text-gray-400 font-medium" style={HATCH_BG}>
        IMAGE
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
          {showEye   && <IconBtn><Eye size={14} /></IconBtn>}
          {showEdit  && <IconBtn><Pencil size={14} /></IconBtn>}
          {showMore  && <IconBtn><MoreHorizontal size={14} /></IconBtn>}
          {showTrash && <IconBtn><Trash2 size={14} /></IconBtn>}
        </div>
      </div>
    </div>
  )
}

function LikedRow({ category, author, coins, title, desc }) {
  return (
    <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shrink-0 flex items-center justify-center text-xs text-gray-400 font-medium" style={HATCH_BG}>
        IMAGE
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap gap-1.5 mb-1.5">
          <span className="text-xs font-medium border border-gray-300 rounded px-2 py-0.5 text-gray-600">{category}</span>
          <span className="text-xs text-gray-400">par {author}</span>
        </div>
        <p className="text-base font-semibold truncate" style={{ color: 'var(--color-ink)' }}>{title}</p>
        <p className="text-sm text-gray-400 truncate mt-0.5">{desc}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2 shrink-0">
        <CoinsBadge amount={coins} />
        <div className="flex gap-1">
          <IconBtn><Heart size={14} className="text-red-400" /></IconBtn>
          <IconBtn><Eye size={14} /></IconBtn>
        </div>
      </div>
    </div>
  )
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
          : <span className="text-sm font-bold flex items-center gap-1" style={{ color: '#DC2626' }}>
              -{Math.abs(delta)}
            </span>
        }
      </div>
    </div>
  )
}

function InfoTab({ userData }) {
  const rows = [
    { icon: User,   label: 'Nom complet', value: `${userData.firstname} ${userData.lastname}` },
    { icon: Mail,   label: 'Email',       value: userData.email },
    { icon: Phone,  label: 'Téléphone',   value: userData.phone },
    { icon: MapPin, label: 'Ville',       value: userData.city },
  ]
  return (
    <div className="flex flex-col gap-3">
      {rows.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--color-primary-soft)' }}>
            <Icon size={14} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400">{label}</p>
            <p className="text-sm font-medium truncate" style={{ color: 'var(--color-ink)' }}>{value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function Profile() {
  const { user: authUser } = useAuth()
  const [userData, setUserData] = useState(null)
  const [ads, setAds] = useState([])
  const [services, setServices] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('ads')

  useEffect(() => {
    if (!authUser) return
    Promise.all([
      getUserById(authUser.id),
      getAdsByUser(authUser.id),
      getServicesByHelper(authUser.id),
      getHistoryByUser(authUser.id),
    ])
      .then(([user, userAds, userServices, userHistory]) => {
        setUserData(user)
        setAds(userAds)
        setServices(userServices)
        setHistory(userHistory)
      })
      .finally(() => setLoading(false))
  }, [authUser])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <p className="text-gray-400">Chargement...</p>
    </div>
  )

  if (!userData) return null

  const initials = `${userData.firstname?.[0] ?? ''}${userData.lastname?.[0] ?? ''}`.toUpperCase()

  const TABS = [
    { key: 'ads',      label: 'Mes annonces',        short: 'Annonces',  count: ads.length },
    { key: 'services', label: 'Services rendus',      short: 'Services',  count: services.length },
    { key: 'history',  label: 'Historique de points', short: 'Historique' },
    { key: 'info',     label: 'Infos personnelles',   short: 'Infos' },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col gap-4">

        {/* Carte profil */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shrink-0 flex items-center justify-center text-xl sm:text-2xl font-bold"
            style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}
          >
            {initials}
          </div>

          <div className="flex-1 w-full text-center sm:text-left">
            <p className="text-xl font-bold mb-2" style={{ color: 'var(--color-ink)' }}>
              {userData.firstname} {userData.lastname}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <MapPin size={13} style={{ color: 'var(--color-primary)' }} />
                {userData.city}
              </span>
            </div>
            <div className="flex justify-center sm:justify-start gap-2 flex-wrap">
              <Link
                to="/profile/edit"
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm hover:bg-gray-50 transition-colors"
                style={{ color: 'var(--color-ink)' }}
              >
                Éditer mon profil
              </Link>
              <button
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm hover:bg-gray-50 transition-colors"
                style={{ color: 'var(--color-ink)' }}
              >
                Paramètres du compte
              </button>
            </div>
          </div>

          {/* Solde */}
          <div
            className="rounded-xl px-6 py-5 text-center w-full sm:w-auto sm:shrink-0 sm:min-w-36"
            style={{ backgroundColor: 'var(--color-accent-orange-light)' }}
          >
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-accent-orange-dark)' }}>
              Solde
            </p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-5xl font-black leading-none" style={{ color: 'var(--color-accent-orange-dark)' }}>{userData.points}</p>
              <img src="/UneedCoin.png" alt="coin" className="w-10 h-10 object-contain" />
            </div>
          </div>
        </div>

        {/* Onglets + contenu */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="flex border-b border-gray-100 px-2 sm:px-6 overflow-x-auto">
            {TABS.map(({ key, label, short, count }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="px-3 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors"
                style={
                  activeTab === key
                    ? { borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }
                    : { borderColor: 'transparent', color: '#6b7280' }
                }
              >
                <span className="lg:hidden">{short}{count !== undefined ? ` (${count})` : ''}</span>
                <span className="hidden lg:inline">{label}{count !== undefined ? ` (${count})` : ''}</span>
              </button>
            ))}
          </div>

          <div className="p-3 sm:p-6 flex flex-col gap-3">
            {activeTab === 'ads' && (
              ads.length === 0
                ? <p className="text-gray-400 text-sm text-center py-8">Aucune annonce pour le moment.</p>
                : ads.map(ad => (
                    <AdRow
                      key={ad.id}
                      category={ad.category_name}
                      status={ad.statut}
                      coins={ad.points}
                      title={ad.title}
                      desc={ad.description}
                    />
                  ))
            )}
{activeTab === 'services' && (
              services.length === 0
                ? <p className="text-gray-400 text-sm text-center py-8">Aucun service rendu pour le moment.</p>
                : services.map(s => (
                    <ServiceRow
                      key={s.id}
                      category={s.category_name}
                      date={formatDate(s.date_creation)}
                      title={s.title}
                      forUser={`${s.needer_firstname} ${s.needer_lastname}`}
                      coins={s.points}
                    />
                  ))
            )}
            {activeTab === 'history' && (
              history.length === 0
                ? <p className="text-gray-400 text-sm text-center py-8">Aucun historique pour le moment.</p>
                : history.map((h, i) => (
                    <HistoryRow
                      key={i}
                      date={formatDate(h.date_creation)}
                      label={h.delta > 0 ? `Service rendu — ${h.title}` : `Service reçu — ${h.title}`}
                      delta={h.delta}
                    />
                  ))
            )}
            {activeTab === 'info' && <InfoTab userData={userData} />}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile
