import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera } from 'lucide-react'

function EditProfile() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="max-w-lg mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
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

          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full"
                style={{ backgroundColor: 'var(--color-primary-light)' }}
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 p-1.5 rounded-full shadow-md text-white"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <Camera size={14} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">Changer la photo</p>
          </div>

          <form className="flex flex-col gap-4">

            {/* Prénom + Nom */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-ink)' }}>
                  Prénom
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[var(--color-primary)] transition-colors"
                  placeholder="Jean"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-ink)' }}>
                  Nom
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[var(--color-primary)] transition-colors"
                  placeholder="Dupont"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-ink)' }}>
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[var(--color-primary)] transition-colors"
                placeholder="jean.dupont@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-ink)' }}>
                Téléphone
              </label>
              <input
                type="tel"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[var(--color-primary)] transition-colors"
                placeholder="+33 6 00 00 00 00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-ink)' }}>
                Bio
              </label>
              <textarea
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                rows={3}
                placeholder="Parlez un peu de vous..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-ink)' }}>
                Ville
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[var(--color-primary)] transition-colors"
                placeholder="Ex: Lyon, France"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl py-2.5 text-sm font-semibold text-white mt-2 transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Enregistrer
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
