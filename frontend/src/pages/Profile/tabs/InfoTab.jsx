import { User, Mail, Phone, MapPin } from 'lucide-react'

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

export default InfoTab
