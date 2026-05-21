import { MapPin } from 'lucide-react';

function CatalogFilters({
	categoryOptions,
	selectedCategory,
	onSelectCategory,
	postalCode,
	onPostalCodeChange,
	radius,
	onRadiusChange,
	maxPoints,
	onMaxPointsChange,
	urgentOnly,
	onUrgentOnlyChange,
	countsByCategory,
}) {
	return (
		<aside className="rounded-[1.5rem] border border-ink/10 bg-white/90 p-7 shadow-[0_18px_50px_rgba(26,22,51,0.06)] backdrop-blur-sm lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto">
			<div className="mb-8">
				<p className="text-xs font-black uppercase tracking-[0.22em] text-ink/50">Categorie</p>
				<div className="mt-5 space-y-4">
					{categoryOptions.map((category) => (
						<label key={category.key} className="flex cursor-pointer items-center gap-3 text-base text-ink/80">
							<input type="radio" name="catalog-category" checked={selectedCategory === category.key} onChange={() => onSelectCategory(category.key)} className="sr-only" />
							<span className={`h-5 w-5 shrink-0 rounded-sm border transition-colors ${selectedCategory === category.key ? 'border-primary bg-primary' : 'border-gray-300 bg-gray-200'}`} />
							<span className="flex-1">{category.label}</span>
							<span className="text-sm text-ink/40">{countsByCategory[category.key] ?? 0}</span>
						</label>
					))}
					<label className="flex cursor-pointer items-center gap-3 pt-1 text-base text-ink/80">
						<input type="radio" name="catalog-category" checked={selectedCategory === 'all'} onChange={() => onSelectCategory('all')} className="sr-only" />
						<span className={`h-5 w-5 shrink-0 rounded-sm border transition-colors ${selectedCategory === 'all' ? 'border-primary bg-primary' : 'border-gray-300 bg-gray-200'}`} />
						<span className="flex-1 font-semibold text-ink">Toutes les catégories</span>
					</label>
				</div>
			</div>

			<div className="mb-8">
				<p className="text-xs font-black uppercase tracking-[0.22em] text-ink/50">Localisation</p>
				<div className="mt-5">
					<label className="flex items-center gap-2 rounded-xl border border-ink/15 bg-ink/5 px-4 py-3 text-ink/45 shadow-inner">
						<MapPin size={16} />
						<input type="text" value={postalCode} onChange={(event) => onPostalCodeChange(event.target.value)} placeholder="Code postal" className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink/35" />
					</label>
				</div>
			</div>

			<div className="mb-8">
				<p className="text-xs font-black uppercase tracking-[0.22em] text-ink/50">Rayon</p>
				<div className="mt-5 space-y-4 text-ink/70">
					<div className="flex items-center justify-between text-sm font-semibold uppercase tracking-wide text-ink/40">
						<span>5 km</span>
						<span>{radius} km</span>
						<span>50 km</span>
					</div>
					<input type="range" min="5" max="50" step="5" value={radius} onChange={(event) => onRadiusChange(Number(event.target.value))} className="range range-primary range-sm" />
					<div className="flex flex-wrap gap-2 text-sm text-ink/55">
						{[5, 10, 25, 50].map((value) => (
							<button key={value} type="button" onClick={() => onRadiusChange(value)} className={`rounded-full border px-3 py-1.5 transition-colors ${radius === value ? 'border-primary bg-primary text-white' : 'border-ink/10 bg-white hover:border-primary/40'}`}>
								{value} km
							</button>
						))}
					</div>
				</div>
			</div>

			<div className="mb-8">
				<p className="text-xs font-black uppercase tracking-[0.22em] text-ink/50">Cout (points)</p>
				<div className="mt-5 space-y-4 text-ink/70">
					<div className="flex items-center justify-between text-sm font-semibold uppercase tracking-wide text-ink/40">
						<span>0</span>
						<span>{maxPoints}</span>
						<span>6</span>
					</div>
					<input type="range" min="1" max="6" step="1" value={maxPoints} onChange={(event) => onMaxPointsChange(Number(event.target.value))} className="range range-primary range-sm" />
					<label className="flex items-center gap-3 rounded-xl border border-ink/10 px-4 py-3 hover:border-primary/40">
						<input type="checkbox" checked={urgentOnly} onChange={(event) => onUrgentOnlyChange(event.target.checked)} className="checkbox checkbox-primary checkbox-sm" />
						<span className="text-base font-medium text-ink/75">Urgent uniquement</span>
					</label>
				</div>
			</div>

			<div className="rounded-2xl bg-primary-soft p-5 text-ink/70">
				<p className="text-base font-bold text-ink">Astuce</p>
				<p className="mt-2 text-sm leading-6">Filtrez par catégorie puis réduisez le rayon pour faire remonter les annonces proches de chez vous.</p>
			</div>
		</aside>
	);
}

export default CatalogFilters;
