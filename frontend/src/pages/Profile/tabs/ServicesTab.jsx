import ServiceRow from '../../../components/profile/ServiceRow'

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })

function ServicesTab({ services }) {
  if (services.length === 0)
    return <p className="text-gray-400 text-sm text-center py-8">Aucun service rendu pour le moment.</p>

  return services.map(s => (
    <ServiceRow
      key={s.id}
      category={s.category_name}
      date={formatDate(s.date_creation)}
      title={s.title}
      forUser={`${s.needer_firstname} ${s.needer_lastname}`}
      coins={s.points}
    />
  ))
}

export default ServicesTab
