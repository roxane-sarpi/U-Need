import { useState, useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
import CreerAnnonce from "../components/ads/AdForm";
import Adform from "../components/ads/AdForm";
import { useAuth } from "../components/context/AuthContext";

function CreateAds() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login', { replace: true });
  }, [isAuthenticated]);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const coins = storedUser?.points;

  // Le state vit ici, à la racine de la page
  const [selectedCoins, setSelectedCoins] = useState(3); 

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-12 font-sans antialiased bg-canvas min-h-screen">
      
      {/* Titre général */}
      <header className="mb-10 text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink mb-1">
          CRÉER VOTRE ANNONCE
        </h1>
        <p className="text-sm font-semibold text-gray-600">
          Remplissez les champs suivants pour votre Annonce
        </p>
      </header>

      {/* Grille : Formulaire à gauche (1fr), Aside à droite (340px) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">
        
        {/* On injecte les télécommandes dans Adform */}
        <Adform 
          selectedCoins={selectedCoins} 
          setSelectedCoins={setSelectedCoins} 
        />

        {/* Barre latérale */}
        <aside className="flex flex-col gap-6 w-full">

          {/* Solde U-Coins */}
          <div className="card bg-white border border-gray-300 rounded-2xl p-6 text-center shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black mb-4">Votre solde de U-coins :</h3>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-6xl font-extrabold text-[#e2a04e] leading-none">{coins}</span>
              <img src="/UneedCoin.png" alt="U-Coin" className='w-15' />
            </div>
            {/* Le calcul se met automatiquement à jour grâce au state partagé ! */}
            <p className="text-xs text-gray-600 font-medium">
              après création : <strong className="text-black">{coins - selectedCoins}</strong> <img src="/UneedCoin.png" alt="U-Coin" className="inline w-4 h-4 mb-1" />
            </p>
          </div>

          {/* Aperçu */}
          <div className="card hidden lg:block bg-[#e0e0ff] border border-[#c5c5ff] rounded-2xl p-6 text-indigo-950">
            <h3 className="text-base font-bold flex items-center gap-2 mb-3">
              <span>ⓘ</span> Aperçu
            </h3>
            <p className="text-xs font-semibold leading-relaxed">
              Votre annonce apparaîtra au catalogue dès sa publication et restera visible tant qu'aucun helper n'aura été accepté.
            </p>
          </div>

          {/* Conseils */}
          <div className="hidden lg:block card bg-white border border-gray-300 rounded-2xl p-6 text-black mt-4">
            <h3 className="text-xs font-extrabold tracking-wider mb-3">💡 CONSEILS</h3>
            <p className="text-xs font-semibold leading-relaxed text-gray-800">
              Plus vous offrez de U-Coins pour votre services, plus cela indiquera que votre services demande des efforts et du temps.
            </p>
          </div>
          
        </aside>
      </div>
    </main>
  );
}

export default CreateAds;

