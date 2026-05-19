import { Link } from "react-router-dom";
import { Heart, Scale, ShieldCheck, Frown, Smile } from "lucide-react";

const stats = [
{ value: "10", unit: "U-Coins", desc: "offert à l'inscription" },
{ value: "20", unit: "annonces", desc: "postées en moyenne par jour" },
{ value: "3", unit: "jours", desc: "en moyenne pour valider un service" },
{ value: "0€", unit: "", desc: "aucune monnaie réelle" },
];

const team = [
{ name: "Théo", subtitle: "Accro au ping-pong", photo: "/images/leT.jpg" },
{ name: "Roxane", subtitle: "Business Woman", photo: "/images/Roxane.jpeg" },
{ name: "Karen", subtitle: "La guide touristique", photo: "/images/karen.jpeg" },
{ name: "Wendy", subtitle: "Le Jukebox", photo: "/images/wendy.jpeg" },
{ name: "Geoffrey", subtitle: "Le maître SQL", photo: "/images/Geoffrey.jpg" },
];

const values = [
{
icon: <Heart size={30} className="text-white" />,
title: "Bienveillance",
desc: "Chaque échange repose sur le respect et l'entraide sincère entre voisins.",
},
{
icon: <Scale size={30} className="text-white" />,
title: "Équité",
desc: "Les U-Coins garantissent que chaque service a la même valeur, sans hiérarchie.",
},
{
icon: <ShieldCheck size={30} className="text-white" />,
title: "Confiance",
desc: "Des profils vérifiés et une communauté locale pour un espace sûr.",
},
];

function InitialsAvatar({ initials, index }) {
const colors = ["bg-primary", "bg-accent-orange", "bg-primary-dark", "bg-accent-orange", "bg-primary"];
return (
<div className={`w-16 h-16 rounded-full ${colors[index]} flex items-center justify-center text-white text-2xl font-bold shadow-md shrink-0`}>
{initials}
</div>
);
}

function About() {
  return (
    <main className="text-ink">

      {/* ── 1. HERO ── */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              U-Need — Né d'une envie<br /> de changer les règles.
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
              Nous croyons que l'entraide ne devrait jamais être une question d'argent.
              U-Need est une plateforme locale d'échanges de services basée sur les U-Coins :
              une monnaie interne qui remet chaque personne sur un pied d'égalité.
              Tu donnes ce que tu peux, tu reçois ce dont tu as besoin. Et personne ne compte.
            </p>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80"
              alt="Deux personnes qui collaborent"
              className="rounded-2xl object-cover w-full h-64 md:h-80 lg:h-96"
            />
          </div>
        </div>
      </section>

      {/* ── 2. LE DÉSÉQUILIBRE DE L'ENTRAIDE ── */}
      <section className="bg-canvas py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Le déséquilibre de l'entraide.
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mb-10">
            Aujourd'hui, beaucoup de gens ont besoin d'aide, mais peu savent qu'ils peuvent
            demander. Pourquoi ? Parce qu'on a l'impression qu'il faut toujours rendre service.
            Il faut aussi toujours pouvoir le faire.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-8 flex flex-col gap-4 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Frown size={26} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold">Le blocage</h3>
              <p className="text-gray-500 text-base leading-relaxed">
                On ne se sent pas à l'aise de demander de l'aide, de peur d'être redevable
                ou de déranger. Les échanges informels disparaissent sans système équitable.
              </p>
            </div>

            <div className="bg-primary rounded-2xl p-8 flex flex-col gap-4 text-white shadow-sm">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Smile size={26} className="text-white" />
              </div>
              <h3 className="text-xl font-bold">L'équilibre U-Need</h3>
              <p className="text-white/75 text-base leading-relaxed">
                Grâce aux U-Coins, chaque service a une valeur équilibrée. Tu aides quelqu'un,
                tu gagnes des coins. Tu as besoin d'aide, tu les dépenses. Simple, juste, humain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. NOTRE MANIFESTE ── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center">Notre Manifeste</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {values.map((v) => (
              <div key={v.title} className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-accent-orange flex items-center justify-center shadow-md">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold">{v.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed max-w-xs">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. U-NEED EN BREF + L'ÉQUIPE ── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border border-primary-light rounded-2xl p-10 flex flex-col md:flex-row gap-12 shadow-sm">

            {/* Stats */}
            <div className="flex-1">
              <h2 className="text-3xl font-extrabold mb-10">U-need en bref.</h2>
              <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                {stats.map((s) => (
                  <div key={s.value}>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold text-accent-orange">{s.value}</span>
                      {s.unit && <span className="text-2xl font-extrabold text-accent-orange">{s.unit}</span>}
                    </div>
                    <p className="text-sm text-ink mt-1.5 leading-snug">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:block w-px bg-primary-light self-stretch" />

            {/* Équipe */}
            <div className="flex-1 border border-primary-light rounded-xl p-8">
              <h2 className="text-3xl font-extrabold mb-8">L'équipe</h2>
              <div className="grid grid-cols-2 gap-6">
                {team.map((member, i) => (
                  <div key={member.name} className="flex items-center gap-3">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover shrink-0 shadow-md"
                    />
                    <div>
                      <p className="font-extrabold text-xl">{member.name}</p>
                      <p className="text-sm text-ink">{member.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. CTA ── */}
      <section className="bg-white pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border-2 border-ink rounded-2xl p-10 md:p-16 flex flex-col items-center text-center gap-4">
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Alors,<br />prêt à faire circuler votre premier U-Coins ?
            </h2>
            <p className="text-gray-500 text-base max-w-sm">
              Inscrivez-vous dès maintenant et recevez vos 10 premiers U-Coins.
            </p>
            <p className="text-base font-bold">
              C'est gratuit, c'est local, c'est humain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                to="/catalogue"
                className="btn bg-primary text-white border-none rounded-xl px-10 text-base font-bold hover:bg-primary-dark transition-colors"
              >
                Parcourir les annonces
              </Link>
              <Link
                to="/create-ads"
                className="btn bg-white text-ink border border-gray-300 rounded-xl px-10 text-base font-bold hover:border-ink transition-colors"
              >
                Créer une annonce
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

export default About;

