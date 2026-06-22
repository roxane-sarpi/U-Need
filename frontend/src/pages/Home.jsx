import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gift, MessageSquare, PencilLine, Smile } from 'lucide-react';
import Card from '../components/ui/Card';
import { getRecentAds } from '../components/services/adService';
import { getCategoryColor } from '../components/ads/adsData';
import { API_URL, buildUrl } from '../components/services/api';

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

function mapAdToCard(ad) {

	return {
		id: ad.id,
		title: ad.title,
		description: ad.description,
		location: `${ad.zip_code}, ${ad.city}`,
		authorName: `${ad.firstname} ${ad.lastname}`,
		image: ad.image_1 ? buildUrl(ad.image_1) : null,
		categories: ad.category_name
			? [{ label: ad.category_name.toUpperCase(), style: { backgroundColor: getCategoryColor(ad.id_category), color: "#374151" } }]
			: [],
		points: `${ad.points} PTS`,
		urgent: ad.urgent,
	};
}

function Home() {
	const [recentAds, setRecentAds] = useState([]);

	 const [isUserConnected, setIsUserConnected] = useState(null);

  useEffect(()=> {
	const userConnected = localStorage.getItem("user");

	if(userConnected){setIsUserConnected(true);}
  },[])

	useEffect(() => {
		getRecentAds(4)
			.then((ads) => setRecentAds(ads.map(mapAdToCard)))
			.catch(() => {});
	}, []);

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

                        {isUserConnected ? <div></div> :
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
						}

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

            {isUserConnected ? <div></div>:
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
			}

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
						{recentAds.map((card) => (
							<Card key={card.id} {...card} />
						))}
					</div>
				</div>
			</section>

			
		</main>
	);
}

export default Home;