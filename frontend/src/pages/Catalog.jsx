import { useEffect, useMemo, useState } from 'react';
import CatalogFilters from '../components/catalog/CatalogFilters';
import CatalogGrid from '../components/catalog/CatalogGrid';
import CatalogPagination from '../components/catalog/CatalogPagination';
import CatalogToolbar from '../components/catalog/CatalogToolbar';
import { catalogCards, categoryOptions } from '../components/catalog/catalogData';

function matchesCatalogFilters(card, options) {
	const term = options.search.trim().toLowerCase();
	const postalTerm = options.postalCode.trim().toLowerCase();

	const matchesSearch =
		!term ||
		card.title.toLowerCase().includes(term) ||
		card.description.toLowerCase().includes(term) ||
		card.location.toLowerCase().includes(term) ||
		card.categories.some((category) => category.label.toLowerCase().includes(term));
	const matchesPostalCode = !postalTerm || card.location.toLowerCase().includes(postalTerm);
	const matchesRadius = card.distance <= options.radius;
	const matchesPoints = Number.parseInt(card.points, 10) <= options.maxPoints;
	const matchesUrgent = !options.urgentOnly || card.urgent;

	return matchesSearch && matchesPostalCode && matchesRadius && matchesPoints && matchesUrgent;
}

function Catalog() {
	const [search, setSearch] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [sortBy, setSortBy] = useState('recent');
	const [postalCode, setPostalCode] = useState('');
	const [radius, setRadius] = useState(25);
	const [maxPoints, setMaxPoints] = useState(2);
	const [urgentOnly, setUrgentOnly] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setCurrentPage(1);
	}, [search, selectedCategory, postalCode, sortBy, radius, maxPoints, urgentOnly]);

	const filteredCards = useMemo(() => {
		const filterOptions = {
			search,
			postalCode,
			radius,
			maxPoints,
			urgentOnly,
		};

		return catalogCards
			.filter((card) => {
				const matchesCategory = selectedCategory === 'all' || card.categoryKey === selectedCategory;
				return matchesCategory && matchesCatalogFilters(card, filterOptions);
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
	}, [search, selectedCategory, postalCode, sortBy, radius, maxPoints, urgentOnly]);

	const countsByCategory = useMemo(
		() =>
			categoryOptions.reduce((counts, category) => {
				const filterOptions = {
					search,
					postalCode,
					radius,
					maxPoints,
					urgentOnly,
				};
				counts[category.key] = catalogCards.filter((card) => card.categoryKey === category.key && matchesCatalogFilters(card, filterOptions)).length;
				return counts;
			}, {}),
		[search, postalCode, radius, maxPoints, urgentOnly],
	);

	const totalResults = filteredCards.length;
	const pageSize = 9;
	const pageCount = Math.max(1, Math.ceil(totalResults / pageSize));
	const safeCurrentPage = Math.min(currentPage, pageCount);
	const displayCards = filteredCards.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize);
	return (
		<main className="min-h-screen bg-canvas text-ink">
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(91,79,207,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(245,158,44,0.10),transparent_28%)]" />

				<div className="mx-auto max-w-360 pl-2 pr-4 py-12 md:pl-4 md:pr-8 lg:pl-6 lg:pr-12">
					<div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
						<CatalogFilters
							categoryOptions={categoryOptions}
							selectedCategory={selectedCategory}
							onSelectCategory={setSelectedCategory}
							postalCode={postalCode}
							onPostalCodeChange={setPostalCode}
							radius={radius}
							onRadiusChange={setRadius}
							maxPoints={maxPoints}
							onMaxPointsChange={setMaxPoints}
							urgentOnly={urgentOnly}
							onUrgentOnlyChange={setUrgentOnly}
							countsByCategory={countsByCategory}
						/>

						<section className="pb-16">
							<CatalogToolbar
								totalResults={totalResults}
								search={search}
								onSearchChange={setSearch}
								sortBy={sortBy}
								onSortByChange={setSortBy}
							/>

							<CatalogGrid cards={displayCards} />

							{displayCards.length === 0 ? (
								<div className="mt-8 rounded-2xl border border-dashed border-ink/15 bg-white/70 p-8 text-center text-sm text-ink/55">
									Aucune annonce ne correspond à ces filtres.
								</div>
							) : null}

							<CatalogPagination currentPage={safeCurrentPage} pageCount={pageCount} onPageChange={setCurrentPage} />
						</section>
					</div>
				</div>
			</section>
		</main>
	);
}

export default Catalog;
