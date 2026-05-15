import { useState } from 'react'
import { MessageCircle, XCircle, CheckCircle, Star } from 'lucide-react'

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    icon: MessageCircle,
    orangeRow: false,
    orangeBtn: true,
    text: 'Vous avez reçu 1 nouveau message pour votre annonce "Aide déménagement"',
    date: 'Le Mercredi 25 avril à 17h30',
    btnLabel: 'Répondre',
    read: false,
  },
  {
    id: 2,
    icon: XCircle,
    orangeRow: true,
    orangeBtn: false,
    text: 'Votre annonce "Démonter un meuble" a été validé et clôturé avec succès !',
    date: 'Le Mardi 26 avril à 17h30',
    btnLabel: 'Évaluer',
    read: false,
  },
  {
    id: 3,
    icon: CheckCircle,
    orangeRow: false,
    orangeBtn: false,
    text: 'Votre proposition d\'aide pour l\'annonce : "Aide course pour personne âgée" a été validée',
    date: 'Le Mardi 25 avril à 20h00',
    btnLabel: "Voir l'annonce",
    read: false,
  },
  {
    id: 4,
    icon: Star,
    orangeRow: false,
    orangeBtn: false,
    text: 'Vous avez reçu vos points ! Votre compte a été crédité',
    date: 'Le Mardi 24 avril à 17h09',
    btnLabel: 'Voir le profil',
    read: true,
  },
]

function NotifRow({ notif }) {
  const { icon: Icon, orangeRow, orangeBtn, text, date, btnLabel } = notif

  return (
    <div className={`flex items-center gap-3 rounded-xl p-4 ${orangeRow ? 'bg-accent-light' : 'bg-primary-soft'}`}>

      <div className={`w-11 h-11 rounded-full shrink-0 flex items-center justify-center ${orangeRow ? 'bg-accent' : 'bg-primary'}`}>
        <Icon size={20} color="white" strokeWidth={2} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-snug text-ink">{text}</p>
        <p className="font-mono text-xs text-gray-400 mt-1">{date}</p>
      </div>

      <button
        className="font-sans shrink-0 rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer"
        style={{ color: 'white', backgroundColor: orangeBtn ? '#F59E2C' : '#5B4FCF' }}
      >
        {btnLabel}
      </button>
    </div>
  )
}

function Notifications() {
  const [notifs, setNotifs] = useState(INITIAL_NOTIFICATIONS)
  const [activeTab, setActiveTab] = useState('all')

  const unreadCount = notifs.filter(n => !n.read).length
  const displayed   = activeTab === 'unread' ? notifs.filter(n => !n.read) : notifs

  const tabs = [
    { key: 'all',    label: `Tous (${notifs.length})` },
    { key: 'unread', label: `Non lus (${unreadCount})` },
  ]

  return (
    <div className="min-h-screen bg-canvas">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-3">
            <h1 className="text-2xl font-bold text-ink">Notification</h1>
            <button
              onClick={() => setNotifs(notifs.map(n => ({ ...n, read: true })))}
              className="font-sans rounded-lg border border-primary text-primary px-4 py-2 text-sm font-medium hover:bg-primary-soft transition-colors cursor-pointer"
            >
              Tout marquer comme lu
            </button>
          </div>

          {/* Onglets */}
          <div className="flex border-b border-gray-100 px-6">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`font-sans px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Liste */}
          <div className="p-6 flex flex-col gap-3">
            {displayed.length === 0 ? (
              <p className="text-center text-gray-400 py-10 text-sm">Aucune notification</p>
            ) : (
              displayed.map(notif => <NotifRow key={notif.id} notif={notif} />)
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Notifications
