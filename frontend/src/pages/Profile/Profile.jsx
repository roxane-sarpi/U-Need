import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../components/context/AuthContext'
import { getUserById } from '../../components/services/userService'
import { getAdsByUser } from '../../components/services/adService'
import { getServicesByHelper, getHistoryByUser } from '../../components/services/requestService'
import ProfileCard from '../../components/profile/ProfileCard'
import AdsTab from './tabs/AdsTab'
import ServicesTab from './tabs/ServicesTab'
import HistoryTab from './tabs/HistoryTab'
import InfoTab from './tabs/InfoTab'

const buildTabs = (ads, services) => [
  { key: 'ads',      label: 'Mes annonces',        short: 'Annonces',  count: ads.length },
  { key: 'services', label: 'Services rendus',      short: 'Services',  count: services.length },
  { key: 'history',  label: 'Historique de points', short: 'Historique' },
  { key: 'info',     label: 'Infos personnelles',   short: 'Infos' },
]

function Profile() {
  const { user: authUser, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const successMessage = location.state?.message
  const [userData, setUserData] = useState(null)
  const [ads, setAds] = useState([])
  const [services, setServices] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('ads')

  useEffect(() => {
    if (!authUser) {
      navigate('/login')
      return
    }
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
      .catch(() => setError('Impossible de charger le profil.'))
      .finally(() => setLoading(false))
  }, [authUser])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <p className="text-gray-400">Chargement...</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <p className="text-red-400">{error}</p>
    </div>
  )

  if (!userData) return null

  const tabs = buildTabs(ads, services)

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col gap-4">
        {successMessage && (
          <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm font-medium text-green-700">
            {successMessage}
          </div>
        )}
        <ProfileCard userData={userData} onLogout={handleLogout} />

        <div className="bg-white rounded-2xl shadow-sm">
          <div className="flex border-b border-gray-100 px-2 sm:px-6 overflow-x-auto">
            {tabs.map(({ key, label, short, count }) => (
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
            {activeTab === 'ads'      && <AdsTab ads={ads} />}
            {activeTab === 'services' && <ServicesTab services={services} />}
            {activeTab === 'history'  && <HistoryTab history={history} />}
            {activeTab === 'info'     && <InfoTab userData={userData} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
