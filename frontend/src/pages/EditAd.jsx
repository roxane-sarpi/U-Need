import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { API_URL, authFetch } from '../components/services/api';

function EditAd() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;

  const [form, setForm] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    Promise.all([
      fetch(`${API_URL}/ads/${id}`).then((r) => r.json()),
      fetch(`${API_URL}/categories`).then((r) => r.json()),
    ]).then(([ad, cats]) => {
      setForm(ad);
      setCategories(cats);
      setLoading(false);
    }).catch(() => { setError('Impossible de charger l\'annonce.'); setLoading(false); });
  }, [id]);

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    authFetch(`/ads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        navigate('/profile', { state: { message: 'Annonce modifiée avec succès !' } });
      })
      .catch(() => { setError('Erreur lors de la sauvegarde.'); setSaving(false); });
  };

  if (loading) return (
    <div className="min-h-screen bg-canvas flex items-center justify-center text-ink/50">Chargement...</div>
  );

  if (!form) return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center gap-4 text-ink/50">
      <p>Annonce introuvable.</p>
      <button onClick={() => navigate('/profile')} className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
        <ArrowLeft size={16} /> Retour au profil
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-canvas p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Bouton retour */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-sm text-ink/60 hover:text-ink transition-colors"
        >
          <ArrowLeft size={18} /> Retour
        </button>

        <div className="bg-white rounded-2xl border border-ink/10 shadow-[0_14px_40px_rgba(26,22,51,0.08)] p-6 sm:p-8">
          <h1 className="text-2xl font-extrabold text-ink mb-6">Modifier l'annonce</h1>

          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Titre */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-primary">Titre</label>
              <input
                value={form.title ?? ''}
                onChange={set('title')}
                required
                className="px-4 py-3 border-2 border-primary-light focus:border-primary rounded-lg text-sm text-ink bg-canvas focus:outline-none focus:bg-white transition-all"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-primary">Description</label>
              <textarea
                value={form.description ?? ''}
                onChange={set('description')}
                rows={4}
                required
                className="px-4 py-3 border-2 border-primary-light focus:border-primary rounded-lg text-sm text-ink bg-canvas focus:outline-none focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Catégorie */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-primary">Catégorie</label>
              <select
                value={form.id_category ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, id_category: Number(e.target.value) }))}
                className="px-4 py-3 border-2 border-primary-light focus:border-primary rounded-lg text-sm text-ink bg-canvas focus:outline-none focus:bg-white transition-all"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Ville + Code postal */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-primary">Ville</label>
                <input
                  value={form.city ?? ''}
                  onChange={set('city')}
                  className="px-4 py-3 border-2 border-primary-light focus:border-primary rounded-lg text-sm text-ink bg-canvas focus:outline-none focus:bg-white transition-all"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-primary">Code postal</label>
                <input
                  value={form.zip_code ?? ''}
                  onChange={set('zip_code')}
                  className="px-4 py-3 border-2 border-primary-light focus:border-primary rounded-lg text-sm text-ink bg-canvas focus:outline-none focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Points */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-primary">Points demandés</label>
              <input
                type="number"
                min={1}
                max={6}
                value={form.points ?? ''}
                onChange={(e) => setForm((p) => ({ ...p, points: Number(e.target.value) }))}
                className="px-4 py-3 border-2 border-primary-light focus:border-primary rounded-lg text-sm text-ink bg-canvas focus:outline-none focus:bg-white transition-all"
              />
            </div>

            {/* Urgent */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.urgent === 1 || form.urgent === true}
                onChange={(e) => setForm((p) => ({ ...p, urgent: e.target.checked ? 1 : 0 }))}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm font-semibold text-ink">Urgente (ASAP)</span>
            </label>

            <button
              type="submit"
              disabled={saving}
              className="mt-2 w-full rounded-xl bg-primary py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
            >
              {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAd;
