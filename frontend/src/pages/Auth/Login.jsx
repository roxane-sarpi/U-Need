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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 p-5 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-12">
        <h2 className="text-3xl font-semibold text-black text-center mb-8 font-sans">Connexion</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-sans">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-blue-500 mb-2 font-sans">Email</label>
            <input 
              type="email" 
              id="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="votre@email.com" 
              className="px-4 py-3 border-2 border-cyan-400 rounded-lg text-base bg-blue-50 text-black placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:bg-blue-50 transition-all autofill:bg-blue-50 autofill:text-black [&:-webkit-autofill]:bg-blue-50 [&:-webkit-autofill]:text-black [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#eff6ff] [&:-webkit-autofill]:[-webkit-text-fill-color:#000] font-sans"
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-blue-500 mb-2 font-sans">Mot de passe</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Votre mot de passe" 
              className="px-4 py-3 border-2 border-gray-300 rounded-lg text-base bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-gray-50 transition-all autofill:bg-gray-50 autofill:text-black [&:-webkit-autofill]:bg-gray-50 [&:-webkit-autofill]:text-black [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#f9fafb] [&:-webkit-autofill]:[-webkit-text-fill-color:#000] font-sans"
              required
            />
          </div>

          <div className="flex items-center gap-3 text-sm text-black font-sans mt-2">
            <input 
              type="checkbox" 
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-5 h-5 cursor-pointer accent-primary border border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="font-sans">Se souvenir de moi pendant 30 jours</label>
          </div>

          <button 
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-indigo-700 active:bg-indigo-800 mt-4 font-sans"
          >
            Se connecter
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-gray-700 font-sans">
          Pas encore de compte ? <a href="/register" className="text-blue-600 font-semibold no-underline hover:underline font-sans">Créer un compte gratuit</a>
        </div>
      </div>
    </div>
  );
};

export default Login;