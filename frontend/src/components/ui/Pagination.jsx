import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, pageCount, onPageChange, isAdmin = false, totalCount = 1247, itemsPerPage = 8 }) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  // Calcul dynamique pour le texte récapitulatif de l'admin
  const from = (currentPage - 1) * itemsPerPage + 1;
  const to = Math.min(currentPage * itemsPerPage, totalCount);

  // VERSION ADMIN 💻📱
  if (isAdmin) {
    return (
      <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/20">
        {/* Texte récapitulatif uniquement pour l'admin */}
        <span className="text-xs text-gray-400 font-medium">
          Affichage de {from}-{to} sur {totalCount}
        </span>
        
        {/* Structure compacte "join" daisyUI calquée sur ta maquette */}
        <div className="join gap-1 bg-transparent">
          <button 
            type="button" 
            onClick={() => onPageChange(Math.max(1, currentPage - 1))} 
            className="join-item btn btn-xs border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 rounded-lg shadow-sm w-7 h-7"
          >
            <ChevronLeft size={14} />
          </button>

          {pages.map((page) => (
            <button 
              key={page} 
              type="button" 
              onClick={() => onPageChange(page)} 
              className={`join-item btn btn-xs w-7 h-7 rounded-lg text-xs font-bold shadow-sm ${
                page === currentPage 
                  ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700' 
                  : 'border border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button 
            type="button" 
            onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))} 
            className="join-item btn btn-xs border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 rounded-lg shadow-sm w-7 h-7"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  // VERSION CATALOGUE PUBLIC (Ton code d'origine reste inchangé) 🛒
  return (
    <div className="mt-12 flex items-center justify-center gap-2">
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

export default Pagination;