import { useState } from "react";
import { X, User, FileText, MessageSquare, AlertCircle } from "lucide-react";
import GeneralTab from "./tabs/GeneralTab";
import AdsTab from "./tabs/AdsTab";
import MessagesTab from "./tabs/MessagesTab";
import ReportsTab from "./tabs/ReportsTab";


function UserDetailsModal({ modalRef, user }) {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "Général", icon: User },
    { id: "ads", label: "Annonces", icon: FileText },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "reports", label: "Signalements", icon: AlertCircle },
  ];

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white text-ink p-0 rounded-t-2xl sm:rounded-2xl border border-gray-100 shadow-2xl relative max-w-2xl w-full h-[85vh] sm:h-auto flex flex-col">
        
        {/* HEADER DE LA MODALE */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div>
              <h3 className="font-black text-base text-ink tracking-tight">{user?.name || "Utilisateur"}</h3>
              <p className="text-xs text-gray-400 font-medium">{user?.email}</p>
            </div>
          </div>
          <button onClick={() => modalRef.current?.close()} className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-ink">
            <X size={16} />
          </button>
        </div>

        {/* BARRE D'ONGLETS RESPONSIVE (Défilement horizontal si trop d'onglets sur mobile) */}
        <div className="flex overflow-x-auto border-b border-gray-100 px-4 bg-white scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                  isActive 
                    ? "border-blue-600 text-blue-600" 
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ZONE DE CONTENU ZONE ENFANT DYNAMIQUE */}
        <div className="p-6 flex-1 overflow-y-auto min-h-[250px]">
          {activeTab === "general" && <GeneralTab user={user} />}
          {activeTab === "ads" && <AdsTab />}
          {activeTab === "messages" && <MessagesTab />}
          {activeTab === "reports" && <ReportsTab />}
        </div>
        
      </div>
    </dialog>
  );
}

export default UserDetailsModal;