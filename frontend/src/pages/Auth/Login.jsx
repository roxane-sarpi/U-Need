import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../index.css';
import { login } from '../../components/services/authService';
import { useAuth } from '../../components/context/AuthContext';
import { validateLogin } from '../../components/auth/authValidation';
import { FormInput, CustomCheckbox } from '../../components/auth/AuthFormComponents';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const clearError = (field) => setErrors((p) => { const n = { ...p }; delete n[field]; return n; });

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError('');
    const errs = validateLogin({ email, password });
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    login({ email, password })
      .then(({ token, user }) => { loginUser(user, token); navigate('/'); })
      .catch(() => setServerError('Email ou mot de passe incorrect.'));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-canvas to-primary-soft p-5 font-sans">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <div className="hidden overflow-hidden rounded-2xl bg-white lg:flex lg:w-1/2 lg:flex-none lg:items-center lg:justify-center lg:p-4 lg:self-center">
            <img src="/images/photos-login.webp" alt="Personnes en discussion" className="h-auto w-full object-contain" />
          </div>

          <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 bg-white rounded-2xl shadow-lg">
            <div className="mb-8 rounded-full bg-canvas p-1 flex gap-1">
              <Link to="/login" className="flex-1 text-center px-4 py-2 rounded-full text-sm font-semibold transition-all bg-primary text-white">Connexion</Link>
              <Link to="/register" className="flex-1 text-center px-4 py-2 rounded-full text-sm font-semibold transition-all text-ink hover:bg-primary-soft">Inscription</Link>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-sans" noValidate>
              <FormInput label="Email" id="email" type="email" value={email} onChange={setEmail} placeholder="votre@email.com" error={errors.email} onClear={() => clearError('email')} />
              <FormInput label="Mot de passe" id="password" type="password" value={password} onChange={setPassword} placeholder="Votre mot de passe" error={errors.password} onClear={() => clearError('password')} />

              <CustomCheckbox id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
                Se souvenir de moi pendant 30 jours
              </CustomCheckbox>

              {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}

              <button type="submit" className="px-6 py-3 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-primary-dark active:scale-95 mt-4 font-sans">
                Se connecter
              </button>
            </form>

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
