const NAME_RE = /^[a-zA-ZÀ-ÿ\s\-']+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(?:(?:\+|00)33[\s.-]?|0)[1-9](?:[\s.-]?\d{2}){4}$/;
const POSTAL_RE = /^\d{5}$/;
const PASSWORD_RE = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export const validateRegister = ({ firstName, lastName, phone, email, city, postalCode, password, confirmPassword, acceptTerms }) => {
  const e = {};
  if (!firstName.trim() || !NAME_RE.test(firstName.trim())) e.firstName = 'Prénom invalide';
  if (!lastName.trim() || !NAME_RE.test(lastName.trim())) e.lastName = 'Nom invalide';
  if (!PHONE_RE.test(phone.trim())) e.phone = 'Numéro de téléphone invalide';
  if (!EMAIL_RE.test(email.trim())) e.email = 'Adresse email invalide';
  if (!NAME_RE.test(city.trim())) e.city = 'Ville invalide';
  if (!POSTAL_RE.test(postalCode.trim())) e.postalCode = 'Code postal invalide (5 chiffres)';
  if (!PASSWORD_RE.test(password)) e.password = 'Min. 8 caractères, 1 majuscule et 1 chiffre';
  if (password !== confirmPassword) e.confirmPassword = 'Les mots de passe ne correspondent pas';
  if (!acceptTerms) e.acceptTerms = "Vous devez accepter les conditions d'utilisation";
  return e;
};

export const validateLogin = ({ email, password }) => {
  const e = {};
  if (!EMAIL_RE.test(email.trim())) e.email = 'Adresse email invalide';
  if (!password) e.password = 'Mot de passe requis';
  return e;
};
