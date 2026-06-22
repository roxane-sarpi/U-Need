import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, ArrowLeft } from 'lucide-react'
import { getUserById } from '../../components/services/userService'
import { getAdsByUser } from '../../components/services/adService'
import AdsTab from './tabs/AdsTab'

function PublicProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.all([getUserById(id), getAdsByUser(id)])
      .then(([user, userAds]) => {
        setUserData(user)
        // Les brouillons restent privés, ils ne doivent pas apparaître sur un profil public
        setAds(userAds.filter((ad) => ad.statut !== 'brouillon'))
      })
      .catch(() => setError('Impossible de charger ce profil.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <p className="text-gray-400">Chargement...</p>
    </div>
  )

  if (error || !userData) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <p className="text-red-400">{error ?? 'Profil introuvable.'}</p>
    </div>
  )

  const initials = `${userData.firstname?.[0] ?? ''}${userData.lastname?.[0] ?? ''}`.toUpperCase()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-2xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-ink mb-4"
        >
          <ArrowLeft size={16} /> Retour
        </button>

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
            {userData.city && (
              <span className="flex items-center justify-center sm:justify-start gap-1 text-sm text-gray-500">
                <MapPin size={13} style={{ color: 'var(--color-primary)' }} />
                {userData.city}
              </span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm mt-4">
          <div className="px-3 sm:px-6 py-3.5 border-b border-gray-100">
            <h2 className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>
              Annonces ({ads.length})
            </h2>
          </div>
          <div className="p-3 sm:p-6 flex flex-col gap-3">
            <AdsTab ads={ads} readOnly />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicProfile
