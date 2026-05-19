import { MapPin, Clock, Star } from 'lucide-react';

function AdDetail() {
  const ad = {
    title: "Besoin de bras pour un déménagement",
    location: "Marseille, 13009",
    urgency: "ASAP",
    description: "J'ai besoin de bras pour déménager mon appartement situé dans le 9ème. Petits meubles style table, table de chevet, gros meubles.",
    category: { label: "JARDINAGE", className: "bg-[#ff9eb5] text-white" },
    cost: 4,
    images: [
      "../ImageTest/Demenagement1.png",
      "../ImageTest/Demenagement2.png",
      "../ImageTest/Demenagement3.png",
    ],
    points: "4 PTS",
  };

  const provider = {
    name: "Le T.",
    rating: 4.5,
    reviewCount: 1,
    services: 24,
    requests: 12,
    avatar: "../images/leT.jpg",
  };

  return (
    <div className="min-h-screen bg-canvas p-4 sm:p-6 lg:p-8">
      {/* Fil d'Ariane */}
      <div className="mb-4 text-sm text-ink/60">
        <p>Catalogue / Bricolage / Titre de l'annonce</p>
      </div>

      {/* Conteneur principal */}
      <div className="mx-auto max-w-7xl rounded-2xl border border-ink/10 bg-white p-4 shadow-[0_14px_40px_rgba(26,22,51,0.08)] sm:p-6 lg:p-8">
        {/* Section principale (images + détails) */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Section gauche : Images et description */}
          <div className="flex-1">
            {/* Galerie d'images */}
            <div className="mb-6">
              {/* Version mobile */}
              <div className="lg:hidden">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-primary-soft">
                  <img
                    src={ad.images[0]}
                    alt={ad.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {ad.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-[4/3] overflow-hidden rounded-xl bg-primary-soft"
                    >
                      <img
                        src={image}
                        alt={`Déménagement ${index + 2}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Version bureau */}
              <div className="hidden lg:flex lg:gap-4">
                <div className="flex-1">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-primary-soft">
                    <img
                      src={ad.images[0]}
                      alt={ad.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex w-48 flex-col gap-4">
                  {ad.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-[4/3] overflow-hidden rounded-xl bg-primary-soft"
                    >
                      <img
                        src={image}
                        alt={`Déménagement ${index + 2}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Badges alignés horizontalement */}
            <div className="flex items-center justify-between">
              <span
                className={`rounded-md px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${ad.category.className}`}
              >
                {ad.category.label}
              </span>
              <span className="rounded-md bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                {ad.points}
              </span>
            </div>

            {/* Localisation et urgence */}
            <div className="mt-4 flex items-center gap-4 text-sm text-ink/60">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-ink/45" />
                <span>{ad.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-ink/45" />
                <span>{ad.urgency}</span>
              </div>
            </div>

            {/* Titre et description */}
            <h1 className="mt-4 text-xl font-extrabold leading-7 text-ink sm:text-2xl">
              {ad.title}
            </h1>
            <p className="mt-3 line-clamp-4 text-sm leading-6 text-ink/65 sm:text-base">
              {ad.description}
            </p>
          </div>

          {/* Section droite : Coût et prestataire */}
          <div className="w-full space-y-6 lg:w-80">
            {/* Carte de coût */}
            <div className="rounded-xl bg-primary-soft p-6 text-center">
              <h2 className="text-lg font-bold text-ink">Coût de ce service</h2>
              <div className="my-4 text-4xl font-extrabold text-ink">
                {ad.cost}
                <span className="inline-block h-7 w-7 align-middle -mb-1">
                  <img
                    src="../UneedCoin.png"
                    alt="Uneed Coin"
                    className="h-full w-full object-contain"
                  />
                </span>
              </div>
              <button className="w-full rounded-xl bg-primary-dark py-3 text-sm font-bold text-white transition-colors hover:bg-primary">
                Proposer mon aide
              </button>
              <p className="mt-3 cursor-pointer text-sm text-ink/60 hover:text-ink">
                🚩 Signaler cette annonce
              </p>
            </div>

            {/* Carte du prestataire */}
            <div className="rounded-xl border border-ink/10 p-6">
              {/* Avatar centré en haut */}
              <div className="flex justify-center">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-primary-soft">
                  {provider.avatar ? (
                    <img
                      src={provider.avatar}
                      alt={provider.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary-soft text-xl font-bold text-primary-dark">
                      {provider.name?.charAt(0) ?? "?"}
                    </div>
                  )}
                </div>
              </div>

              {/* Infos textuelles centrées */}
              <div className="mt-4 text-center">
                <h3 className="truncate text-lg font-bold text-ink">
                  {provider.name}
                </h3>
                <div className="mt-1 flex items-center justify-center gap-1 text-sm text-ink/75">
                  <span>{provider.rating}</span>
                  <Star size={14} className="fill-accent text-accent" />
                  <span>({provider.reviewCount})</span>
                </div>
                <div className="mt-3 flex justify-center gap-8 text-center">
                  <div>
                    <p className="text-lg font-bold text-ink">{provider.services}</p>
                    <p className="text-xs text-ink/60">services</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-ink">{provider.requests}</p>
                    <p className="text-xs text-ink/60">demandes</p>
                  </div>
                </div>
              </div>

              {/* Bouton "Voir le profil" */}
              <button className="mt-4 w-full rounded-xl border border-primary-dark py-2 text-sm font-bold text-primary-dark transition-colors hover:bg-primary-soft">
                Voir le profil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdDetail;