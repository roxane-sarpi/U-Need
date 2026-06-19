import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { updateUser } from '../../components/services/userService';

function EditProfile() {
  const navigate = useNavigate();

  // États pour les notifications de l'interface
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // États locaux pour gérer dynamiquement les champs éditables
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    city: ""
  });

  // Initialisation des données depuis le localStorage de manière sécurisée
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setFormData({
          firstname: parsed.firstname ?? "",
          lastname: parsed.lastname ?? "",
          email: parsed.email ?? "",
          phone: parsed.phone ?? "",
          city: parsed.city ?? ""
        });
      }
    } catch (err) {
      console.error("Erreur de lecture du localStorage user :", err);
    }
  }, []);

  // Gestionnaire de changement générique pour les inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstname.trim() || !formData.lastname.trim()) {
      setError("Le prénom et le nom sont obligatoires.");
      setFeedback("");
      return;
    }

    if (!formData.email.trim()) {
      setError("L'adresse email est obligatoire.");
      setFeedback("");
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      setFeedback("");

      // 1. Récupération de l'utilisateur connecté pour avoir son ID
      const storedUser = localStorage.getItem("user");
      const userParsed = storedUser ? JSON.parse(storedUser) : null;

      if (!userParsed || !userParsed.id) {
        throw new Error("Session utilisateur introuvable. Veuillez vous reconnecter.");
      }

      // 2. Appel de ton service avec le bon ID
      const updatedUser = await updateUser(userParsed.id, formData);
      
      // 3. Mise à jour du localStorage avec les nouvelles données renvoyées par l'API
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setFeedback("Profil mis à jour avec succès !");
      
      setTimeout(() => {
        navigate(-1);
      }, 1500);

    } catch (err) {
      setError(err.message || "Impossible de mettre à jour le profil.");
      setFeedback("");
    } finally {
      setIsSaving(false);
    }
  };

  // Calcul dynamique des initiales pour la bulle d'avatar
  const initials = `${formData.firstname?.[0] ?? ''}${formData.lastname?.[0] ?? ''}`.toUpperCase();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-lg mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} style={{ color: 'var(--color-ink)' }} />
          </button>
          <h1 className="text-xl font-bold" style={{ color: 'var(--color-ink)' }}>
            Modifier le profil
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">

          {/* Affichage des feedbacks (Success / Error) */}
          {error && <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm font-medium border border-red-100">{error}</div>}
          {feedback && <div className="mb-4 p-3 rounded-xl bg-green-50 text-green-700 text-sm font-medium border border-green-100">{feedback}</div>}

          {/* Avatar dynamique */}
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shrink-0 flex items-center justify-center text-xl sm:text-2xl font-bold shadow-inner"
              style={{ backgroundColor: 'var(--color-primary-soft)', color: 'var(--color-primary-dark)' }}
            >
              {initials || "?"}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Prénom + Nom */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-ink)' }}>
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstname"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[var(--color-primary)] transition-colors"
                  placeholder="Jean"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-ink)' }}>
                  Nom
                </label>
                <input
                  type="text"
                  name="lastname"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[var(--color-primary)] transition-colors"
                  placeholder="Dupont"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-ink)' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[var(--color-primary)] transition-colors"
                placeholder="jean.dupont@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-ink)' }}>
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[var(--color-primary)] transition-colors"
                placeholder="+33 6 00 00 00 00"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-ink)' }}>
                Ville
              </label>
              <input
                type="text"
                name="city"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[var(--color-primary)] transition-colors"
                placeholder="Ex: Marseille, France"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full rounded-xl py-2.5 text-sm font-semibold text-white mt-2 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {isSaving ? "Enregistrement..." : "Enregistrer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;