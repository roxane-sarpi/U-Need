import { ChevronLeft, ChevronRight } from 'lucide-react';

function CatalogPagination({ currentPage, pageCount, onPageChange }) {
	const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

	return (
		<div className="mt-8 flex items-center justify-center gap-2">
			<button type="button" onClick={() => onPageChange(Math.max(1, currentPage - 1))} className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-transparent text-ink hover:bg-white/90">
				<ChevronLeft size={18} />
			</button>
			{pages.map((page) => (
				<button key={page} type="button" onClick={() => onPageChange(page)} className={`h-8 w-8 rounded-sm text-sm font-semibold transition-colors ${page === currentPage ? 'bg-primary text-white shadow-md' : 'bg-white text-ink/60 hover:bg-primary-soft'}`}>
					{page}
				</button>
			))}
			<button type="button" onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))} className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-transparent text-ink hover:bg-white/90">
				<ChevronRight size={18} />
			</button>
		</div>
	);
}

export default CatalogPagination;