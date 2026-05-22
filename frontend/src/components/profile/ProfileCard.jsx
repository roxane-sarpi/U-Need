import { Link } from 'react-router-dom'
import { MapPin, LogOut } from 'lucide-react'

function ProfileCard({ userData, onLogout }) {
  const initials = `${userData.firstname?.[0] ?? ''}${userData.lastname?.[0] ?? ''}`.toUpperCase()

  return (
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
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 border border-red-200 rounded-lg px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={14} />
            Se déconnecter
          </button>
        </div>
      </div>

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
  )
}

export default ProfileCard
