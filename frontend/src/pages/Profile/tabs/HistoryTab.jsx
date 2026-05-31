import HistoryRow from '../../../components/profile/HistoryRow'

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })

function HistoryTab({ history }) {
  if (history.length === 0)
    return <p className="text-gray-400 text-sm text-center py-8">Aucun historique pour le moment.</p>

  return history.map((h, i) => (
    <HistoryRow
      key={i}
      date={formatDate(h.date_creation)}
      label={h.delta > 0 ? `Service rendu — ${h.title}` : `Service reçu — ${h.title}`}
      delta={h.delta}
    />
  ))
}

export default HistoryTab
