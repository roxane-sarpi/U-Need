import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    console.log('Tentative de connexion avec :', { email, password, rememberMe });
    
    // Prochaine étape : envoyer ces données à ton API ou Backend
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-canvas to-primary-soft p-5 font-sans">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <div className="hidden overflow-hidden rounded-2xl bg-white lg:flex lg:w-1/2 lg:flex-none lg:items-center lg:justify-center lg:p-4 lg:self-center">
            <img
              src="/images/photos-login.webp"
              alt="Personnes en discussion"
              className="h-auto w-full object-contain"
            />
          </div>

          <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 bg-white rounded-2xl shadow-lg">
            <div className="mb-8 rounded-full bg-canvas p-1 flex gap-1">
              <Link
                to="/login"
                className="flex-1 text-center px-4 py-2 rounded-full text-sm font-semibold transition-all bg-primary text-white"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center px-4 py-2 rounded-full text-sm font-semibold transition-all text-ink hover:bg-primary-soft"
              >
                Inscription
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-sans">
          
          {/* Champ Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-primary mb-2 font-sans">Email</label>
            <input 
              type="email" 
              id="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="votre@email.com" 
              // AJOUT ICI : text-ink et var(--color-ink) pour l'autofill
              className="px-4 py-3 border-2 border-primary-light rounded-lg text-base text-ink bg-canvas placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white transition-all autofill:bg-white [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#fff] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-ink)] font-sans"
              required 
            />
          </div>

              {/* Champ Mot de passe */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-primary mb-2 font-sans">Mot de passe</label>
                <input 
                  type="password" 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Votre mot de passe" 
                  // AJOUT ICI : text-ink et var(--color-ink) pour l'autofill
                  className="px-4 py-3 border-2 border-primary-light rounded-lg text-base text-ink bg-canvas placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white transition-all autofill:bg-white [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#fff] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-ink)] font-sans"
                  required
                />
              </div>

              {/* Checkbox personnalisée "Se souvenir de moi" */}
              <div className="flex items-center gap-3 text-sm font-sans mt-2">
                <input 
                  type="checkbox" 
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                />
                
                <label 
                  htmlFor="rememberMe" 
                  className="flex items-center gap-3 cursor-pointer text-ink"
                >
                  <div 
                    className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${
                      rememberMe 
                        ? 'bg-primary border-primary' // Utilisation de ta couleur primary
                        : 'bg-white border-primary-light' 
                    }`}
                  >
                    {rememberMe && (
                      <svg 
                        className="w-3 h-3 text-white" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  
                  <span className="font-sans">Se souvenir de moi pendant 30 jours</span>
                </label>
              </div>

              {/* Bouton de soumission */}
              <button 
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-primary-dark active:scale-95 mt-4 font-sans"
              >
                Se connecter
              </button>
            </form>

            {/* Lien d'inscription */}
            <div className="text-center mt-6 text-xs text-ink font-sans">
              Pas encore de compte ? <Link to="/register" className="text-primary font-semibold no-underline hover:underline font-sans">Créer un compte gratuit</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;