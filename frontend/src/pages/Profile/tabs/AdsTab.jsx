import AdRow from '../../../components/profile/AdRow'
import { API_URL, buildUrl } from '../../../components/services/api'

function AdsTab({ ads, readOnly = false }) {
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
      image={ad.image_1 ? buildUrl(ad.image_1) : null}
      urgent={ad.urgent}
      readOnly={readOnly}
    />
  ))
}

export default AdsTab
