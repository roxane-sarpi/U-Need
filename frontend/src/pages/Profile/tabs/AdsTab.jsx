import AdRow from '../../../components/profile/AdRow'

function AdsTab({ ads }) {
  if (ads.length === 0)
    return <p className="text-gray-400 text-sm text-center py-8">Aucune annonce pour le moment.</p>

  return ads.map(ad => (
    <AdRow
      key={ad.id}
      category={ad.category_name}
      status={ad.statut}
      coins={ad.points}
      title={ad.title}
      desc={ad.description}
    />
  ))
}

export default AdsTab
