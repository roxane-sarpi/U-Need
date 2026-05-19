import { Link } from 'react-router-dom';
import { ArrowRight, Gift, MessageSquare, PencilLine, Smile, Sparkles } from 'lucide-react';
import Card from '../components/ui/Card';

const steps = [
	{
		icon: PencilLine,
		title: 'Exprimez votre besoin',
		description: 'Un meuble à monter ou un cours de yoga ? Posez votre annonce, vos U-Coins sont prêts à voyager.',
		ring: 'border-primary text-primary',
	},
	{
		icon: MessageSquare,
		title: 'La rencontre',
		description: 'Échangez en messagerie avec les membres de la communauté pour trouver le bon Helper, au bon moment.',
		ring: 'border-accent text-accent',
	},
	{
		icon: Smile,
		title: 'Le sourire partagé',
		description: 'Le service est rendu, les points sont gagnés et la boucle de solidarité continue naturellement.',
		ring: 'border-green-400 text-green-500',
	},
];

const featuredCards = [
	{
		title: 'Besoin de bras pour un déménagement',
		description:
			"J’ai besoin de bras pour déménager mon appartement situé dans le 9ème. Petits meubles, cartons et gros meubles à monter.",
		location: '13009, Marseille',
		authorName: 'Le T.',
		rating: '4,5',
		reviews: 1,
		image: '/images/photos-login.webp',
		categories: [
			{ label: 'Déménagement', className: 'bg-[#6D6D6D] text-white' },
			{ label: 'Jardinage', className: 'bg-[#F88B8B] text-white' },
		],
		points: '4 PTS',
	},
	{
		title: 'Besoin d’aide pour une après-midi jardin',
		description:
			'Je cherche quelqu’un pour m’aider à tailler les haies, rempoter quelques plantes et déplacer des pots lourds.',
		location: '13008, Marseille',
		authorName: 'Camille M.',
		rating: '5,0',
		reviews: 3,
		image: '/images/photos-login.webp',
		categories: [
			{ label: 'Jardinage', className: 'bg-[#6D6D6D] text-white' },
			{ label: 'Maison', className: 'bg-[#F88B8B] text-white' },
		],
		points: '6 PTS',
	},
	{
		title: 'Cours de guitare pour débutant',
		description:
			'Je cherche une personne patiente pour m’aider à progresser sur les accords de base et les rythmiques simples.',
		location: '13005, Marseille',
		authorName: 'Nina B.',
		rating: '4,8',
		reviews: 5,
		image: '/images/photos-login.webp',
		categories: [
			{ label: 'Musique', className: 'bg-[#6D6D6D] text-white' },
			{ label: 'Cours', className: 'bg-[#F88B8B] text-white' },
		],
		points: '5 PTS',
	},
	{
		title: 'Besoin d’un coup de main pour un bureau',
		description:
			'Je monte un bureau et une étagère, mais il me faut une paire de mains pour tenir et aligner les éléments.',
		location: '13001, Marseille',
		authorName: 'Karim D.',
		rating: '4,5',
		reviews: 1,
		image: '/images/photos-login.webp',
		categories: [
			{ label: 'Bricolage', className: 'bg-[#6D6D6D] text-white' },
			{ label: 'Travaux', className: 'bg-[#F88B8B] text-white' },
		],
		points: '4 PTS',
	},
];

function Home() {
	return (
		<main className="min-h-screen bg-canvas text-ink">
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(91,79,207,0.14),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(245,158,44,0.12),_transparent_28%)]" />
				<div className="mx-auto grid max-w-7xl gap-12 px-4 py-10 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-16">
					<div className="flex flex-col justify-center">

						<h1 className="max-w-xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
							C’est le début
							<span className="block text-primary-dark">de l’aventure !</span>
						</h1>

						<p className="mt-5 max-w-lg text-lg italic text-ink/55 sm:text-xl">
							“Tu ne le sais pas encore mais tu en as déjà besoin.”
						</p>

						<div className="mt-10 flex flex-wrap items-center gap-4">
							<Link
								to="/register"
								className="inline-flex items-center gap-3 rounded-xl bg-[#F59E2C] px-6 py-4 text-base font-bold text-white shadow-[0_10px_0_rgba(201,122,10,0.18)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#C97A0A]"
							>
								<Gift size={18} />
								<span>+10 U-Coins offerts à l’inscription</span>
								<ArrowRight size={18} />
							</Link>
						</div>

					</div>

					<div className="relative">
						<div className="absolute -left-6 top-12 hidden h-24 w-24 rounded-full bg-accent/20 blur-3xl lg:block" />
						<div className="absolute -right-4 bottom-10 hidden h-24 w-24 rounded-full bg-primary/20 blur-3xl lg:block" />

						<div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_80px_rgba(26,22,51,0.08)] backdrop-blur md:p-8">
							<div className="mb-8 flex items-center justify-between gap-4">
								<div>
									<p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">U-need</p>
									<h2 className="mt-2 text-2xl font-black text-ink sm:text-3xl">Comment ça marche ?</h2>
								</div>
			
							</div>

							<div className="space-y-8">
								{steps.map((step, index) => {
									const Icon = step.icon;

									return (
										<div key={step.title} className="grid grid-cols-[auto_1fr] gap-4">
											<div className="relative flex flex-col items-center">
												<span className={`flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white ${step.ring}`}>
													<Icon size={20} strokeWidth={2.2} />
												</span>
												{index < steps.length - 1 ? (
													<span className="mt-2 h-full w-px border-l-2 border-dashed border-ink/15" />
												) : null}
											</div>

											<div className="pt-1">
												<h3 className="text-lg font-extrabold text-ink">{step.title}</h3>
												<p className="mt-1 max-w-lg text-sm leading-6 text-ink/60">{step.description}</p>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</section>

            <section className="px-4 pb-10 md:px-8 lg:pb-16">
				<div className="mx-auto max-w-7xl rounded-[2rem] bg-primary-light/70 px-6 py-8 shadow-[0_18px_60px_rgba(91,79,207,0.08)] md:px-10 md:py-10 lg:flex lg:items-center lg:justify-between">
					<div className="max-w-2xl">
						<h2 className="text-2xl font-black text-ink sm:text-3xl">Rejoignez la boucle de l’entraide</h2>
						<p className="mt-3 max-w-xl text-base leading-7 text-ink/65 sm:text-lg">
							Inscrivez-vous et recevez vos 10 premiers U-Coins. Ici, pas d’argent : on échange des talents, tout simplement.
						</p>
					</div>

					<Link
						to="/register"
						className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-[0_10px_0_rgba(61,47,168,0.18)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary-dark lg:mt-0"
					>
						S’inscrire et échanger
					</Link>
				</div>
			</section>

			<section className="px-4 pb-10 md:px-8 lg:pb-16">
				<div className="mx-auto max-w-7xl">
					<div className="mb-6 flex items-end justify-between gap-4">
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">À la une</p>
							<h2 className="mt-2 text-2xl font-black text-ink sm:text-3xl">Les besoins du moment</h2>
						</div>
						<Link to="/catalogue" className="hidden text-sm font-semibold text-primary-dark underline-offset-4 hover:underline md:inline-flex">
							Voir toutes les annonces
						</Link>
					</div>

					<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
						{featuredCards.map((card) => (
							<Card key={card.title} {...card} />
						))}
					</div>
				</div>
			</section>

			
		</main>
	);
}

export default Home;