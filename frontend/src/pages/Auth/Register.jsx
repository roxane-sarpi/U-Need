import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../index.css';
import { register } from '../../components/services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    register({
      firstname: firstName,
      lastname: lastName,
      phone,
      email,
      city,
      zip_code: postalCode,
      password,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de l'inscription");
        navigate('/login');
      })
      .catch(() => setError("Une erreur est survenue, veuillez réessayer."));
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
                className="flex-1 text-center px-4 py-2 rounded-full text-sm font-semibold transition-all text-ink hover:bg-primary-soft"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center px-4 py-2 rounded-full text-sm font-semibold transition-all bg-primary text-white"
              >
                Inscription
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-primary mb-2 font-sans">Prénom</label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Votre prénom"
                    className="px-4 py-3 border-2 border-primary-light rounded-lg text-base text-ink bg-canvas placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white transition-all autofill:bg-white [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#fff] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-ink)] font-sans"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-primary mb-2 font-sans">Nom</label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Votre nom"
                    className="px-4 py-3 border-2 border-primary-light rounded-lg text-base text-ink bg-canvas placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white transition-all autofill:bg-white [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#fff] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-ink)] font-sans"
                    required
                  />
                </div>
              </div>


              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-primary mb-2 font-sans">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Votre numéro de téléphone"
                  className="px-4 py-3 border-2 border-primary-light rounded-lg text-base text-ink bg-canvas placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white transition-all autofill:bg-white [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#fff] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-ink)] font-sans"
                  required
                />
              </div>


              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-primary mb-2 font-sans">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="px-4 py-3 border-2 border-primary-light rounded-lg text-base text-ink bg-canvas placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white transition-all autofill:bg-white [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#fff] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-ink)] font-sans"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="city" className="text-sm font-medium text-primary mb-2 font-sans">Ville</label> 
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Votre ville"
                    className="px-4 py-3 border-2 border-primary-light rounded-lg text-base text-ink bg-canvas placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white transition-all autofill:bg-white [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#fff] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-ink)] font-sans"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="postalCode" className="text-sm font-medium text-primary mb-2 font-sans">Code postal</label>
                  <input
                    type="text"
                    id="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Votre code postal"
                    className="px-4 py-3 border-2 border-primary-light rounded-lg text-base text-ink bg-canvas placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white transition-all autofill:bg-white [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#fff] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-ink)] font-sans"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-primary mb-2 font-sans">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Créer un mot de passe"
                  className="px-4 py-3 border-2 border-primary-light rounded-lg text-base text-ink bg-canvas placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white transition-all autofill:bg-white [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#fff] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-ink)] font-sans"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-primary mb-2 font-sans">Confirmer le mot de passe</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Répéter le mot de passe"
                  className="px-4 py-3 border-2 border-primary-light rounded-lg text-base text-ink bg-canvas placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white transition-all autofill:bg-white [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#fff] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-ink)] font-sans"
                  required
                />
              </div>

              <div className="flex items-center gap-3 text-sm font-sans mt-2">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="sr-only"
                />

                <label htmlFor="acceptTerms" className="flex items-center gap-3 cursor-pointer text-ink">
                  <div
                    className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${
                      acceptTerms ? 'bg-primary border-primary' : 'bg-white border-primary-light'
                    }`}
                  >
                    {acceptTerms && (
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

                  <span className="font-sans">J'accepte les conditions d'utilisation</span>
                </label>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-primary-dark active:scale-95 mt-4 font-sans"
              >
                Créer mon compte
              </button>
            </form>

            <div className="text-center mt-6 text-xs text-ink font-sans">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-primary font-semibold no-underline hover:underline font-sans">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
