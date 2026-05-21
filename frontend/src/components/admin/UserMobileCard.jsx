function UserMobileCard({ user }) {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div>
            <h4 className="font-bold text-sm text-ink">{user.name}</h4>
            <p className="text-sm text-gray-400 font-medium">{user.email}</p>
          </div>
        </div>
        <span className="text-xs font-bold text-gray-700 bg-gray-50 px-2 py-0.5 rounded-md">
          {user.balance} U-coins
        </span>
      </div>
      
      <div className="flex items-center justify-between pt-1 text-xs">
        <div className="flex gap-2">
          <span className="text-gray-500 font-semibold">{user.city}</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-400">Inscrit le {user.joined}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{user.role}</span>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600">{user.status}</span>
        </div>
      </div>
    </div>
  );
}

export default UserMobileCard;