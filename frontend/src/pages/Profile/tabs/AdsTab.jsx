import AdRow from '../../../components/profile/AdRow'
import { API_URL } from '../../../components/services/api'

function AdsTab({ ads }) {
  if (ads.length === 0)
    return <p className="text-gray-400 text-sm text-center py-8">Aucune annonce pour le moment.</p>

  return ads.map(ad => (
    <AdRow
      key={ad.id}
      id={ad.id}
      category={ad.category_name}
      categoryId={ad.id_category}
      status={ad.statut}
      coins={ad.points}
      title={ad.title}
      desc={ad.description}
      image={ad.image_1 ? `${API_URL}${ad.image_1}` : null}
    />
  ))
}

export default AdsTab
