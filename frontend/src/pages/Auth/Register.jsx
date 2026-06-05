import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../index.css';
import { register } from '../../components/services/authService';
import { validateRegister } from '../../components/auth/authValidation';
import { FormInput, CustomCheckbox } from '../../components/auth/AuthFormComponents';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', city: '', postalCode: '', password: '', confirmPassword: '' });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const set = (field) => (value) => setForm((p) => ({ ...p, [field]: value }));
  const clearError = (field) => setErrors((p) => { const n = { ...p }; delete n[field]; return n; });

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError('');
    const errs = validateRegister({ ...form, acceptTerms });
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    register({ firstname: form.firstName, lastname: form.lastName, phone: form.phone, email: form.email, city: form.city, zip_code: form.postalCode, password: form.password })
      .then((res) => {
        if (res.status === 409) { setErrors((p) => ({ ...p, email: 'Cette adresse mail est déjà utilisée' })); return; }
        if (!res.ok) throw new Error();
        navigate('/login');
      })
      .catch(() => setServerError('Une erreur est survenue, veuillez réessayer.'));
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
              <Link to="/login" className="flex-1 text-center px-4 py-2 rounded-full text-sm font-semibold transition-all text-ink hover:bg-primary-soft">Connexion</Link>
              <Link to="/register" className="flex-1 text-center px-4 py-2 rounded-full text-sm font-semibold transition-all bg-primary text-white">Inscription</Link>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-sans" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Prénom" id="firstName" value={form.firstName} onChange={set('firstName')} placeholder="Votre prénom" error={errors.firstName} onClear={() => clearError('firstName')} />
                <FormInput label="Nom" id="lastName" value={form.lastName} onChange={set('lastName')} placeholder="Votre nom" error={errors.lastName} onClear={() => clearError('lastName')} />
              </div>
              <FormInput label="Téléphone" id="phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="Votre numéro de téléphone" error={errors.phone} onClear={() => clearError('phone')} />
              <FormInput label="Email" id="email" type="email" value={form.email} onChange={set('email')} placeholder="votre@email.com" error={errors.email} onClear={() => clearError('email')} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Ville" id="city" value={form.city} onChange={set('city')} placeholder="Votre ville" error={errors.city} onClear={() => clearError('city')} />
                <FormInput label="Code postal" id="postalCode" value={form.postalCode} onChange={set('postalCode')} placeholder="Votre code postal" error={errors.postalCode} onClear={() => clearError('postalCode')} />
              </div>
              <div className="flex flex-col gap-1">
                <FormInput label="Mot de passe" id="password" type="password" value={form.password} onChange={set('password')} placeholder="Créer un mot de passe" error={errors.password} onClear={() => clearError('password')} />
                {!errors.password && <p className="text-xs text-gray-400 font-sans">Min. 8 caractères, 1 majuscule et 1 chiffre</p>}
              </div>
              <FormInput label="Confirmer le mot de passe" id="confirmPassword" type="password" value={form.confirmPassword} onChange={set('confirmPassword')} placeholder="Répéter le mot de passe" error={errors.confirmPassword} onClear={() => clearError('confirmPassword')} />

              <CustomCheckbox id="acceptTerms" checked={acceptTerms} onChange={(e) => { setAcceptTerms(e.target.checked); clearError('acceptTerms'); }} error={errors.acceptTerms}>
                J'accepte les conditions d'utilisation
              </CustomCheckbox>

              {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}

              <button
                type="submit"
                disabled={!acceptTerms}
                className={`px-6 py-3 text-white rounded-lg text-base font-semibold transition-all mt-4 font-sans ${acceptTerms ? 'bg-primary hover:bg-primary-dark active:scale-95 cursor-pointer' : 'bg-primary opacity-50 cursor-not-allowed'}`}
              >
                Créer mon compte
              </button>
            </form>

            <div className="text-center mt-6 text-xs text-ink font-sans">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-primary font-semibold no-underline hover:underline font-sans">Se connecter</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
