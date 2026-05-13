import React, { useState } from 'react';
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 p-5">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-10">
        <div className="text-3xl font-bold text-primary text-center mb-7">U-Need</div>
        <h2 className="text-2xl font-semibold text-ink text-center mb-2">Connexion</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-blue-600 mb-1">Email</label>
            <input 
              type="email" 
              id="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="votre@email.com" 
              className="px-3 py-3 border border-gray-300 rounded-md text-sm bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all autofill:bg-gray-100 autofill:text-black [&:-webkit-autofill]:bg-gray-100 [&:-webkit-autofill]:text-black [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#f3f4f6] [&:-webkit-autofill]:[-webkit-text-fill-color:#000]"
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-blue-600 mb-1">Mot de passe</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Votre mot de passe" 
              className="px-3 py-3 border border-gray-300 rounded-md text-sm bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all autofill:bg-gray-100 autofill:text-black [&:-webkit-autofill]:bg-gray-100 [&:-webkit-autofill]:text-black [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#f3f4f6] [&:-webkit-autofill]:[-webkit-text-fill-color:#000]"
              required
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-ink">
            <input 
              type="checkbox" 
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 cursor-pointer accent-primary"
            />
            <label htmlFor="rememberMe">Se souvenir de moi pendant 30 jours</label>
          </div>

          <button 
            type="submit"
            className="px-4 py-3 bg-blue-600 text-white rounded-md text-base font-semibold cursor-pointer transition-all hover:bg-blue-700 active:bg-blue-800 mt-2"
          >
            Se connecter
          </button>
        </form>

        <div className="text-center mt-5 text-xs text-gray-600">
          Pas encore de compte ? <a href="/register" className="text-blue-600 font-semibold no-underline hover:underline">Créer un compte gratuit</a>
        </div>
      </div>
    </div>
  );
};

export default Login;