import { useNavigate } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';

function Card({
  id,
  image,
  categories = [],
  points = '4 PTS',
  title,
  description,
  location,
  authorName,
  authorAvatar,
  rating,
  reviews,
}) {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate('/detail', { state: { id } });
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_14px_40px_rgba(26,22,51,0.08)] transition-transform duration-200 hover:-translate-y-1">
      <div className="relative aspect-4/3 overflow-hidden bg-primary-soft">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(91,79,207,0.12),rgba(245,158,44,0.18))]">
            <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-primary-dark">U-Need</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <span
              key={category.label}
              className={`rounded-md px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${category.className ?? ''}`}
              style={category.style}
            >
              {category.label}
            </span>
          ))}

          <span className="ml-auto rounded-md bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            {points}
          </span>
        </div>

        <h3 className="mt-6 text-lg font-extrabold leading-7 text-ink">{title}</h3>
        <p className="mt-3 line-clamp-4 text-sm leading-6 text-ink/65">
          {description}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4 text-sm text-ink/45">
          <div className="inline-flex items-center gap-1.5">
            <MapPin size={14} />
            <span>{location}</span>
          </div>
        </div>

        <button
          onClick={handleDetail}
          className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
        >
          Voir le détail
        </button>
      </div>

      <div className="border-t border-ink/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-full bg-primary-soft">
            {authorAvatar ? (
              <img src={authorAvatar} alt={authorName} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary-soft text-sm font-bold text-primary-dark">
                {authorName?.charAt(0) ?? '?'}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="truncate text-base font-bold text-ink">{authorName}</div>
            {rating !== undefined || reviews !== undefined ? (
              <div className="mt-0.5 inline-flex items-center gap-1 text-sm text-ink/75">
                {rating !== undefined ? <span>{rating}</span> : null}
                <Star size={14} className="fill-accent text-accent" />
                {reviews !== undefined ? <span>({reviews})</span> : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export default Card;
