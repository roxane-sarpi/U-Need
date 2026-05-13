import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star, Eye, Pencil, MoreHorizontal, Trash2, Heart, CheckCircle, TrendingUp, TrendingDown, User, Phone, Mail } from 'lucide-react'

const COIN_IMG = <img src="/UneedCoin.png" alt="coin" className="w-4 h-4 object-contain" />

const TABS = [
  { key: 'ads',      label: 'Mes annonces',        short: 'Annonces',  count: 4 },
  { key: 'liked',    label: 'Annonces likées',      short: 'Likées',    count: 5 },
  { key: 'services', label: 'Services rendus',      short: 'Services',  count: 5 },
  { key: 'history',  label: 'Historique de points', short: 'Historique' },
  { key: 'info',     label: 'Infos personnelles',   short: 'Infos' },
]

const ADS = [
  { id: 1, category: 'BRICOLAGE',    status: 'EN COURS',  coins: 3, title: 'Réparation robinet salle de bain',       desc: "Fuite au niveau du joint, besoin d'aide rapidement" },
  { id: 2, category: 'JARDINAGE',    status: 'ACTIVE',    coins: 2, title: 'Taille de haie et débroussaillage',       desc: 'Jardin de 80m², haie de 15m à tailler côté rue' },
  { id: 3, category: 'INFORMATIQUE', status: 'TERMINÉ',   coins: 4, title: 'Installation et configuration PC',        desc: "Mise en place d'un poste de travail sous Windows 11" },
  { id: 4, category: 'TRANSPORT',    status: 'BROUILLON', coins: 1, title: 'Déménagement canapé 2 places',            desc: 'Du 3e étage sans ascenseur, environ 2 km de distance' },
]

const LIKED_ADS = [
  { id: 1, category: 'CUISINE',      author: 'Marie D.',   coins: 3, title: 'Cours de pâtes fraîches maison',         desc: '2h de cours pour apprendre la cuisine italienne' },
  { id: 2, category: 'SPORT',        author: 'Théo R.',    coins: 2, title: 'Séance de coaching running débutant',    desc: "Sortie d'1h adaptée aux débutants, parc de la Tête d'Or" },
  { id: 3, category: 'BRICOLAGE',    author: 'Paul M.',    coins: 4, title: 'Pose de carrelage salle de bain',        desc: 'Surface de 6m², matériaux non fournis' },
  { id: 4, category: 'INFORMATIQUE', author: 'Clara S.',   coins: 2, title: 'Aide configuration réseau Wi-Fi',        desc: 'Box Freebox, problème de connexion intermittente' },
  { id: 5, category: 'JARDINAGE',    author: 'Antoine B.', coins: 3, title: 'Plantation et entretien potager',        desc: 'Conseils et aide pour démarrer un potager de balcon' },
]

const SERVICES = [
  { id: 1, category: 'BRICOLAGE',    date: '12 avr. 2026', title: 'Montage meubles IKEA',                 for: 'Sophie L.', coins: 2, rating: 5 },
  { id: 2, category: 'INFORMATIQUE', date: '28 mars 2026', title: 'Récupération données disque dur',      for: 'Marc T.',   coins: 4, rating: 5 },
  { id: 3, category: 'TRANSPORT',    date: '15 mars 2026', title: 'Aide au déménagement studio',          for: 'Julie F.',  coins: 3, rating: 4 },
  { id: 4, category: 'JARDINAGE',    date: '2 mars 2026',  title: 'Tonte pelouse et ramassage feuilles',  for: 'Pierre C.', coins: 2, rating: 5 },
  { id: 5, category: 'CUISINE',      date: '18 fév. 2026', title: 'Préparation repas pour 10 personnes', for: 'Emma R.',   coins: 5, rating: 4 },
]

const HISTORY = [
  { id: 1, date: '14 mai 2026',  label: 'Service rendu — Réparation robinet',  delta: +3  },
  { id: 2, date: '10 mai 2026',  label: 'Service reçu — Cours de yoga',        delta: -2  },
  { id: 3, date: '5 mai 2026',   label: 'Bonus parrainage — Théo R.',          delta: +5  },
  { id: 4, date: '28 avr. 2026', label: 'Service rendu — Installation PC',     delta: +4  },
  { id: 5, date: '20 avr. 2026', label: 'Service reçu — Livraison courses',    delta: -1  },
  { id: 6, date: '12 avr. 2026', label: 'Service rendu — Montage meubles',     delta: +2  },
  { id: 7, date: '1 avr. 2026',  label: 'Inscription — Bonus bienvenue',       delta: +10 },
]

const USER_INFO = {
  prenom: 'Lucas',
  nom: 'Martin',
  email: 'lucas.martin@gmail.com',
  phone: '+33 6 12 34 56 78',
  ville: 'Lyon, France',
  bio: 'Bricoleur passionné, toujours prêt à donner un coup de main. Je crois aux échanges de services entre voisins !',
  membre: 'mars 2026',
}

const STATUS_STYLE = {
  'EN COURS':  { bg: 'var(--color-accent-light)', color: 'var(--color-accent-dark)' },
  'ACTIVE':    { bg: '#DCFCE7', color: '#16A34A' },
  'TERMINÉ':   { bg: '#F3F4F6', color: '#6B7280' },
  'BROUILLON': { bg: '#F3F4F6', color: '#6B7280' },
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
        <Star key={i} size={11} fill={i < count ? 'var(--color-accent)' : '#e5e7eb'} color={i < count ? 'var(--color-accent)' : '#e5e7eb'} />
      ))}
    </span>
  )
}

function AdRow({ category, status, coins, title, desc }) {
  const st = STATUS_STYLE[status]
  const showEye   = status !== 'BROUILLON'
  const showEdit  = status !== 'TERMINÉ'
  const showMore  = status !== 'BROUILLON'
  const showTrash = status === 'BROUILLON'

  return (
    <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shrink-0 flex items-center justify-center text-xs text-gray-400 font-medium" style={HATCH_BG}>
        IMAGE
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap gap-1.5 mb-1.5">
          <span className="text-xs font-medium border border-gray-300 rounded px-2 py-0.5 text-gray-600">{category}</span>
          <span className="text-xs font-semibold rounded px-2 py-0.5" style={{ background: st.bg, color: st.color }}>{status}</span>
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

function ServiceRow({ category, date, title, for: forUser, coins, rating }) {
  return (
    <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shrink-0 flex items-center justify-center text-xs text-gray-400 font-medium" style={HATCH_BG}>
        IMAGE
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap gap-1.5 mb-1.5">
          <span className="text-xs font-medium border border-gray-300 rounded px-2 py-0.5 text-gray-600">{category}</span>
          <span className="text-xs text-gray-400">{date}</span>
        </div>
        <p className="text-sm font-medium truncate" style={{ color: 'var(--color-ink)' }}>{title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-400">pour {forUser}</span>
          <Stars count={rating} />
        </div>
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
          style={{ backgroundColor: positive ? 'var(--color-accent-light)' : '#FEE2E2' }}
        >
          {positive
            ? <TrendingUp size={14} style={{ color: 'var(--color-accent-dark)' }} />
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

function InfoTab() {
  const rows = [
    { icon: User,   label: 'Nom complet', value: `${USER_INFO.prenom} ${USER_INFO.nom}` },
    { icon: Mail,   label: 'Email',       value: USER_INFO.email },
    { icon: Phone,  label: 'Téléphone',   value: USER_INFO.phone },
    { icon: MapPin, label: 'Ville',       value: USER_INFO.ville },
  ]
  return (
    <div className="flex flex-col gap-4">
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
      <div>
        <p className="text-xs text-gray-400 mb-1">Bio</p>
        <p className="text-sm text-gray-700 leading-relaxed">{USER_INFO.bio}</p>
      </div>
    </div>
  )
}

function Profile() {
  const [activeTab, setActiveTab] = useState('ads')

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col gap-4">

        {/* Carte profil */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">

          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shrink-0 flex items-center justify-center text-xl sm:text-2xl font-bold"
            style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}
          >
            LM
          </div>

          <div className="flex-1 w-full text-center sm:text-left">
            <p className="text-xl font-bold mb-2" style={{ color: 'var(--color-ink)' }}>
              {USER_INFO.prenom} {USER_INFO.nom}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <MapPin size={13} style={{ color: 'var(--color-primary)' }} />
                {USER_INFO.ville}
              </span>
              <span className="flex items-center gap-1">
                <Star size={12} fill="var(--color-accent)" color="var(--color-accent)" />
                <span className="ml-1">4.8 (24 avis)</span>
              </span>
              <span>Membre depuis {USER_INFO.membre}</span>
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
            style={{ backgroundColor: 'var(--color-accent-light)' }}
          >
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-accent-dark)' }}>
              Solde
            </p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-5xl font-black leading-none" style={{ color: 'var(--color-accent-dark)' }}>17</p>
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
            {activeTab === 'ads'      && ADS.map(ad => <AdRow key={ad.id} {...ad} />)}
            {activeTab === 'liked'    && LIKED_ADS.map(ad => <LikedRow key={ad.id} {...ad} />)}
            {activeTab === 'services' && SERVICES.map(s => <ServiceRow key={s.id} {...s} />)}
            {activeTab === 'history'  && HISTORY.map(h => <HistoryRow key={h.id} {...h} />)}
            {activeTab === 'info'     && <InfoTab />}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile
