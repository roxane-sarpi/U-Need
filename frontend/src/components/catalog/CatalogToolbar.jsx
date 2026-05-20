import { Search, SlidersHorizontal } from 'lucide-react';

function CatalogToolbar({ totalResults, search, onSearchChange, sortBy, onSortByChange }) {
	return (
		<div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
			<div>
				<p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/50">Catalogue</p>
				<h1 className="mt-2 text-3xl font-black text-ink sm:text-4xl">Parcourez les annonces autour de vous</h1>
				<p className="mt-2 text-sm text-ink/55">{totalResults} annonces trouvées</p>
			</div>

			<div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
				<label className="flex min-h-12 flex-1 items-center gap-3 rounded-xl border border-ink/15 bg-white px-4 shadow-sm">
					<Search size={18} className="text-ink/35" />
					<input type="search" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Rechercher une annonce..." className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/35" />
				</label>

				<label className="flex min-h-12 items-center gap-3 rounded-xl border border-ink/15 bg-white px-4 text-sm font-medium text-ink/70 shadow-sm sm:w-56">
					<SlidersHorizontal size={18} className="text-ink/35" />
					<select value={sortBy} onChange={(event) => onSortByChange(event.target.value)} className="w-full bg-transparent outline-none">
						<option value="recent">Trier par : Plus récent</option>
						<option value="points">Trier par : Moins de points</option>
						<option value="distance">Trier par : Distance</option>
					</select>
				</label>
			</div>
		</div>
	);
}

export default CatalogToolbar;