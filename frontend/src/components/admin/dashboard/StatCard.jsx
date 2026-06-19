function StatCard({ title, value}) {

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[150px] w-full">
      <div>
        {/* Titre de la stat en petits caractères gris */}
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
          {title}
        </p>
        {/* Valeur principale XXL */}
        <p className="text-3xl font-black text-ink tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}

export default StatCard;