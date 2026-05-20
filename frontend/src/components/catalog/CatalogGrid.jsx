import Card from '../ui/Card';

function CatalogGrid({ cards }) {
	return (
		<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
			{cards.map((card) => (
				<Card key={card.title} {...card} />
			))}
		</div>
	);
}

export default CatalogGrid;