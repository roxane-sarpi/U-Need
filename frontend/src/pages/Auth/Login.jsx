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
    <div className="login-container">
      <div>
        <div className="logo">U-Need</div>
        <h2>Connexion</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="votre@email.com" 
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Votre mot de passe" 
              required
            />
          </div>

          <div className="checkbox-group">
            <input 
              type="checkbox" 
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Se souvenir de moi pendant 30 jours</label>
          </div>

          <button type="submit">Se connecter</button>
        </form>

        <div className="login-footer">
          Pas encore de compte ? <a href="/register">Créer un compte gratuit</a>
        </div>
      </div>
    </div>
  );
};

export default Login;