import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Search, SlidersHorizontal } from 'lucide-react';
import Card from '../components/ui/Card';

const categoryOptions = [
	{ key: 'bricolage', label: 'Bricolage' },
	{ key: 'informatique', label: 'Informatique' },
	{ key: 'jardinage', label: 'Jardinage' },
	{ key: 'garde', label: 'Garde' },
	{ key: 'transport', label: 'Transport' },
	{ key: 'cours', label: 'Cours / Education' },
	{ key: 'menage', label: 'Aide - Ménagère' },
	{ key: 'administratif', label: 'Démarches administratives' },
	{ key: 'autre', label: 'Autre' },
];

const catalogCardTemplates = [
	{
		title: 'Besoin d’un coup de main pour un déménagement',
		description:
			'Je cherche quelques personnes pour m’aider à porter des cartons, démonter un lit et transporter quelques meubles.',
		location: '13008, Marseille',
		authorName: 'Le T.',
		authorAvatar: '/images/leT.jpg',
		rating: '4,5',
		reviews: 1,
		image: '/images/photos-login.webp',
		categories: [
			{ label: 'DÉMÉNAGEMENT', className: 'bg-[#4E4E4E] text-white' },
			{ label: 'MÉNAGE', className: 'bg-[#F4A261] text-white' },
		],
		points: '3 PTS',
		categoryKey: 'transport',
		distance: 5,
		urgent: false,
		sortRank: 12,
	},
	{
		title: 'Aide pour préparer un potager',
		description:
			'Je cherche quelqu’un pour retourner la terre, installer quelques bacs et planter les premières pousses.',
		location: '13009, Marseille',
		authorName: 'Camille M.',
		authorAvatar: '/images/Roxane.jpeg',
		rating: '4,8',
		reviews: 3,
		image: '/images/photos-login.webp',
		categories: [
			{ label: 'JARDINAGE', className: 'bg-[#4E4E4E] text-white' },
			{ label: 'URGENT', className: 'bg-[#E76F51] text-white' },
		],
		points: '2 PTS',
		categoryKey: 'jardinage',
		distance: 10,
		urgent: true,
		sortRank: 11,
	},
	{
		title: 'Besoin d’aide pour monter un meuble',
		description:
			'Je viens de recevoir un bureau et une étagère en kit. Il me faut une personne patiente pour le montage.',
		location: '13006, Marseille',
		authorName: 'Nina B.',
		authorAvatar: '/images/karen.jpeg',
		rating: '4,9',
		reviews: 5,
		image: '/images/photos-login.webp',
		categories: [
			{ label: 'BRICOLAGE', className: 'bg-[#4E4E4E] text-white' },
			{ label: 'URGENT', className: 'bg-[#E76F51] text-white' },
		],
		points: '4 PTS',
		categoryKey: 'bricolage',
		distance: 2,
		urgent: true,
		sortRank: 10,
	},
	{
		title: 'Cours d’informatique pour débutant',
		description:
			'Je cherche quelqu’un pour m’aider à prendre en main mon ordinateur, organiser mes fichiers et utiliser les services en ligne.',
		location: '13005, Marseille',
		authorName: 'Karim D.',
		authorAvatar: '/images/Geoffrey.jpg',
		rating: '4,5',
		reviews: 1,
		image: '/images/photos-login.webp',
		categories: [
			{ label: 'INFORMATIQUE', className: 'bg-[#4E4E4E] text-white' },
			{ label: 'COURS', className: 'bg-[#8F9BF7] text-white' },
		],
		points: '6 PTS',
		categoryKey: 'informatique',
		distance: 15,
		urgent: false,
		sortRank: 9,
	},
	{
		title: 'Aide pour une garde ponctuelle',
		description:
			'Je cherche une personne de confiance pour garder un enfant en fin d’après-midi et l’aider à faire ses devoirs.',
		location: '13004, Marseille',
		authorName: 'Mila R.',
		authorAvatar: '/images/wendy.jpeg',
		rating: '4,7',
		reviews: 2,
		image: '/images/photos-login.webp',
		categories: [
			{ label: 'GARDE', className: 'bg-[#4E4E4E] text-white' },
			{ label: 'AUTRE', className: 'bg-[#8F9BF7] text-white' },
		],
		points: '5 PTS',
		categoryKey: 'garde',
		distance: 8,
		urgent: false,
		sortRank: 8,
	},
	{
		title: 'Transport de quelques cartons',
		description:
			'Je dois déplacer une dizaine de cartons d’un appartement à un autre à quelques rues de distance.',
		location: '13001, Marseille',
		authorName: 'Léa S.',
		authorAvatar: '/images/leT.jpg',
		rating: '4,6',
		reviews: 4,
		image: '/images/photos-login.webp',
		categories: [
			{ label: 'TRANSPORT', className: 'bg-[#4E4E4E] text-white' },
			{ label: 'DÉMÉNAGEMENT', className: 'bg-[#F4A261] text-white' },
		],
		points: '1 PT',
		categoryKey: 'transport',
		distance: 25,
		urgent: false,
		sortRank: 7,
	},
	{
		title: 'Aide aux démarches administratives',
		description:
			'Je cherche quelqu’un pour m’aider à comprendre mes documents, remplir un formulaire et organiser mes pièces.',
		location: '13010, Marseille',
		authorName: 'Sarah P.',
		authorAvatar: '/images/Roxane.jpeg',
		rating: '5,0',
		reviews: 2,
		image: '/images/photos-login.webp',
		categories: [
			{ label: 'ADMINISTRATIF', className: 'bg-[#4E4E4E] text-white' },
			{ label: 'COURS', className: 'bg-[#8F9BF7] text-white' },
		],
		points: '2 PTS',
		categoryKey: 'administratif',
		distance: 12,
		urgent: false,
		sortRank: 6,
	},
	{
		title: 'Besoin d’un coup de main pour la cuisine',
		description:
			'J’organise un repas pour plusieurs personnes et j’aurais besoin d’aide pour préparer les plats et dresser la table.',
		location: '13003, Marseille',
		authorName: 'Lucas T.',
		authorAvatar: '/images/karen.jpeg',
		rating: '4,5',
		reviews: 1,
		image: '/images/photos-login.webp',
		categories: [
			{ label: 'AUTRE', className: 'bg-[#4E4E4E] text-white' },
			{ label: 'MÉNAGE', className: 'bg-[#F4A261] text-white' },
		],
		points: '4 PTS',
		categoryKey: 'autre',
		distance: 30,
		urgent: false,
		sortRank: 5,
	},
	{
		title: 'Petit chantier de jardin en urgence',
		description:
			'Je dois nettoyer un coin de jardin, déplacer quelques sacs de terre et remettre le tout en état rapidement.',
		location: '13011, Marseille',
		authorName: 'Emma C.',
		authorAvatar: '/images/wendy.jpeg',
		rating: '4,4',
		reviews: 1,
		image: '/images/photos-login.webp',
		categories: [
			{ label: 'JARDINAGE', className: 'bg-[#4E4E4E] text-white' },
			{ label: 'URGENT', className: 'bg-[#E76F51] text-white' },
		],
		points: '3 PTS',
		categoryKey: 'jardinage',
		distance: 5,
		urgent: true,
		sortRank: 4,
	},
];

const catalogCards = Array.from({ length: 7 }, (_, pageIndex) =>
	catalogCardTemplates.map((card, cardIndex) => ({
		...card,
		title: `${card.title} ${pageIndex + 1}-${cardIndex + 1}`,
		sortRank: card.sortRank + (6 - pageIndex) * 10,
	}))
).flat();

const sidebarCategories = categoryOptions.map((category) => ({
	...category,
	count: catalogCards.filter((card) => card.categoryKey === category.key).length,
}));

function Catalog() {
	const [search, setSearch] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [sortBy, setSortBy] = useState('recent');
	const [radius, setRadius] = useState(25);
	const [maxPoints, setMaxPoints] = useState(2);
	const [urgentOnly, setUrgentOnly] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setCurrentPage(1);
	}, [search, selectedCategory, sortBy, radius, maxPoints, urgentOnly]);

	const filteredCards = useMemo(() => {
		const term = search.trim().toLowerCase();

		return catalogCards
			.filter((card) => {
				const matchesSearch =
					!term ||
					card.title.toLowerCase().includes(term) ||
					card.description.toLowerCase().includes(term) ||
					card.location.toLowerCase().includes(term) ||
					card.categories.some((category) => category.label.toLowerCase().includes(term));

				const matchesCategory = selectedCategory === 'all' || card.categoryKey === selectedCategory;
				const matchesRadius = card.distance <= radius;
				const matchesPoints = Number.parseInt(card.points, 10) <= maxPoints;
				const matchesUrgent = !urgentOnly || card.urgent;

				return matchesSearch && matchesCategory && matchesRadius && matchesPoints && matchesUrgent;
			})
			.sort((left, right) => {
				if (sortBy === 'points') {
					return Number.parseInt(left.points, 10) - Number.parseInt(right.points, 10);
				}

				if (sortBy === 'distance') {
					return left.distance - right.distance;
				}

				return right.sortRank - left.sortRank;
			});
	}, [search, selectedCategory, sortBy, radius, maxPoints, urgentOnly]);

	const totalResults = filteredCards.length;
	const pageSize = 9;
	const pageCount = Math.max(1, Math.ceil(totalResults / pageSize));
	const safeCurrentPage = Math.min(currentPage, pageCount);
	const displayCards = filteredCards.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize);
	const paginationPages = Array.from({ length: pageCount }, (_, index) => index + 1);

	return (
		<main className="min-h-screen bg-canvas text-ink">
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(91,79,207,0.12),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(245,158,44,0.10),_transparent_28%)]" />

				<div className="mx-auto max-w-[1440px] px-4 py-6 md:px-6 lg:px-8">
					<div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
						<aside className="rounded-[1.5rem] border border-ink/10 bg-white/90 p-5 shadow-[0_18px_50px_rgba(26,22,51,0.06)] backdrop-blur-sm lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto">
							<div className="mb-6">
								<p className="text-sm font-black uppercase tracking-[0.22em] text-ink">Categorie</p>
								<div className="mt-4 space-y-3">
									{sidebarCategories.map((category) => (
										<label key={category.key} className="flex cursor-pointer items-center gap-3 text-sm text-ink/80">
											<input
												type="radio"
												name="catalog-category"
												checked={selectedCategory === category.key}
												onChange={() => setSelectedCategory(category.key)}
												className="sr-only"
											/>
											<span className={`h-4 w-4 rounded-sm border transition-colors ${selectedCategory === category.key ? 'border-primary bg-primary' : 'border-gray-300 bg-gray-200'}`} />
											<span className="flex-1">{category.label}</span>
											<span className="text-xs text-ink/40">{category.count}</span>
										</label>
									))}
									<label className="flex cursor-pointer items-center gap-3 pt-1 text-sm text-ink/80">
										<input
											type="radio"
											name="catalog-category"
											checked={selectedCategory === 'all'}
											onChange={() => setSelectedCategory('all')}
											className="sr-only"
										/>
										<span className={`h-4 w-4 rounded-sm border transition-colors ${selectedCategory === 'all' ? 'border-primary bg-primary' : 'border-gray-300 bg-gray-200'}`} />
										<span className="flex-1 font-semibold text-ink">Toutes les catégories</span>
									</label>
								</div>
							</div>

							<div className="mb-6">
								<p className="text-sm font-black uppercase tracking-[0.22em] text-ink">Localisation</p>
								<div className="mt-4">
									<label className="flex items-center gap-2 rounded-xl border border-ink/15 bg-ink/5 px-3 py-2 text-sm text-ink/45 shadow-inner">
										<MapPin size={14} />
										<input
											type="text"
											value={search}
											onChange={(event) => setSearch(event.target.value)}
											placeholder="Code postal"
											className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/35"
										/>
									</label>
								</div>
							</div>

							<div className="mb-6">
								<p className="text-sm font-black uppercase tracking-[0.22em] text-ink">Rayon</p>
								<div className="mt-4 space-y-3 text-sm text-ink/70">
									<div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-ink/40">
										<span>5 km</span>
										<span>{radius} km</span>
										<span>50 km</span>
									</div>
									<input
										type="range"
										min="5"
										max="50"
										step="5"
										value={radius}
										onChange={(event) => setRadius(Number(event.target.value))}
										className="range range-primary range-sm"
									/>
									<div className="flex flex-wrap gap-2 text-xs text-ink/55">
										{[5, 10, 25, 50].map((value) => (
											<button
												key={value}
												type="button"
												onClick={() => setRadius(value)}
												className={`rounded-full border px-3 py-1 transition-colors ${radius === value ? 'border-primary bg-primary text-white' : 'border-ink/10 bg-white hover:border-primary/40'}`}
											>
												{value} km
											</button>
										))}
									</div>
								</div>
							</div>

							<div className="mb-6">
								<p className="text-sm font-black uppercase tracking-[0.22em] text-ink">Cout (points)</p>
								<div className="mt-4 space-y-3 text-sm text-ink/70">
									<div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-ink/40">
										<span>0</span>
										<span>{maxPoints}</span>
										<span>6</span>
									</div>
									<input
										type="range"
										min="1"
										max="6"
										step="1"
										value={maxPoints}
										onChange={(event) => setMaxPoints(Number(event.target.value))}
										className="range range-primary range-sm"
									/>
									<label className="flex items-center gap-3 rounded-xl border border-ink/10 px-3 py-2 hover:border-primary/40">
										<input
											type="checkbox"
											checked={urgentOnly}
											onChange={(event) => setUrgentOnly(event.target.checked)}
											className="checkbox checkbox-primary checkbox-sm"
										/>
										<span className="text-sm font-medium text-ink/75">Urgent uniquement</span>
									</label>
								</div>
							</div>

							<div className="rounded-2xl bg-primary-soft p-4 text-sm text-ink/70">
								<p className="font-bold text-ink">Astuce</p>
								<p className="mt-2 leading-6">Filtrez par catégorie puis réduisez le rayon pour faire remonter les annonces proches de chez vous.</p>
							</div>
						</aside>

						<section className="pb-8">
							<div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
								<div>
									<p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/50">Catalogue</p>
									<h1 className="mt-2 text-3xl font-black text-ink sm:text-4xl">Parcourez les annonces autour de vous</h1>
									<p className="mt-2 text-sm text-ink/55">{totalResults} annonces trouvées</p>
								</div>

								<div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
									<label className="flex min-h-12 flex-1 items-center gap-3 rounded-xl border border-ink/15 bg-white px-4 shadow-sm">
										<Search size={18} className="text-ink/35" />
										<input
											type="search"
											value={search}
											onChange={(event) => setSearch(event.target.value)}
											placeholder="Rechercher une annonce..."
											className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/35"
										/>
									</label>

									<label className="flex min-h-12 items-center gap-3 rounded-xl border border-ink/15 bg-white px-4 text-sm font-medium text-ink/70 shadow-sm sm:w-56">
										<SlidersHorizontal size={18} className="text-ink/35" />
										<select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="w-full bg-transparent outline-none">
											<option value="recent">Trier par : Plus récent</option>
											<option value="points">Trier par : Moins de points</option>
											<option value="distance">Trier par : Distance</option>
										</select>
									</label>
								</div>
							</div>

							<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
								{displayCards.map((card) => (
									<Card key={card.title} {...card} />
								))}
							</div>

							{displayCards.length === 0 ? (
								<div className="mt-8 rounded-2xl border border-dashed border-ink/15 bg-white/70 p-8 text-center text-sm text-ink/55">
									Aucune annonce ne correspond à ces filtres.
								</div>
							) : null}

							<div className="mt-8 flex items-center justify-center gap-2">
								<button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-transparent text-ink hover:bg-white/90">
									<ChevronLeft size={18} />
								</button>
								{paginationPages.map((page) => (
									<button
										key={page}
										type="button"
										onClick={() => setCurrentPage(page)}
										className={`h-8 w-8 rounded-sm text-sm font-semibold transition-colors ${page === safeCurrentPage ? 'bg-primary text-white shadow-md' : 'bg-white text-ink/60 hover:bg-primary-soft'}`}
									>
										{page}
									</button>
								))}
								<button type="button" onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))} className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-transparent text-ink hover:bg-white/90">
									<ChevronRight size={18} />
								</button>
							</div>
						</section>
					</div>
				</div>
			</section>
		</main>
	);
}

export default Catalog;
