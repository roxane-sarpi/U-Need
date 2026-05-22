import { roleStyles } from "./AdminData";

function UserMobileCard({ user, onEdit }) {
  return (
    <div 
      onClick={onEdit} 
      onKeyDown={(e) => e.key === "Enter" && onEdit()} // Permet de cliquer avec la touche Entrée
      role="button"
      tabIndex={0}
      className="p-4 space-y-3 cursor-pointer transition-colors hover:bg-gray-50/50 active:bg-gray-100 focus:outline-none focus:bg-gray-50 select-none"
    >
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
          <span className={`text-[9px] px-1.5 py-0.5 rounded ${roleStyles[user.role]}`}>{user.role}</span>
        </div>
      </div>
    </div>
  );
}

export default UserMobileCard;