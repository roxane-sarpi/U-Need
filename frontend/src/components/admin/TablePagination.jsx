function TablePagination() {
  return (
    <div className="p-7 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/20">
      <span className="text-xs text-gray-400 font-medium">
        Affichage de 1-8 sur 1 247
      </span>
      
      <div className="join gap-2 bg-transparent">
        <button className="join-item btn btn-xs border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 rounded-lg shadow-sm w-8 h-8">‹</button>
        <button className="join-item btn btn-xs bg-blue-600 border-blue-600 text-white rounded-lg w-8 h-8 font-bold text-xs">1</button>
        <button className="join-item btn btn-xs border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 rounded-lg shadow-sm w-8 h-8 text-xs font-semibold">2</button>
        <button className="join-item btn btn-xs border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 rounded-lg shadow-sm w-8 h-8 text-xs font-semibold">3</button>
        <button className="join-item btn btn-xs border-none bg-transparent text-gray-400 cursor-default pointer-events-none w-6 h-7">...</button>
        <button className="join-item btn btn-xs border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 rounded-lg shadow-sm w-8 h-8 text-xs font-semibold">156</button>
        <button className="join-item btn btn-xs border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 rounded-lg shadow-sm w-8 h-8">›</button>
      </div>
    </div>
  );
}

export default TablePagination;