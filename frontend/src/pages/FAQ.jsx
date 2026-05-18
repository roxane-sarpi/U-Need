const faqs = [
  {
    question: "Comment créer un compte ?",
    answer:
      "Cliquez sur le bouton \"Inscription\" dans le coin supérieur droit et suivez le processus de création de compte.",
  },
  {
    question: "Comment publier une annonce ?",
    answer:
      "Allez à la section annonces, choisissez 'Créer une nouvelle annonce', remplissez les détails et soumettez votre liste.",
  },
  {
    question: "Puis-je modifier mon profil plus tard ?",
    answer:
      "Oui, ouvrez votre page de profil et sélectionnez 'Modifier le profil' pour mettre à jour vos informations à tout moment.",
  },
  {
    question: "Comment contacter un autre utilisateur ?",
    answer:
      "Utilisez la fonction de messagerie sur la page de détail de l'annonce pour envoyer un message privé au vendeur.",
  },
  {
    question: "C'est une bonne situation, ça, scribe ?",
    answer:
      "Vous savez, moi je ne crois pas qu’il y ait de bonne ou de mauvaise situation. En fait, moi, j'ai toujours eu la passion depuis que je suis enfant de la peinture et de l'écriture, c'est-à-dire quasiment de la même chose. Et ce qui est assez amusant, c'est que j'ai eu plus tard l'occasion de vivre cette passion, de l'habiter, de faire profession passion. Moi, si je devais résumer ma vie aujourd’hui avec vous, je dirais que c’est d’abord des rencontres. Des gens qui m’ont tendu la main, peut-être à un moment où je ne pouvais pas, où j’étais seul chez moi. Et c’est assez curieux de se dire que les hasards, les rencontres forgent une destinée... Parce que quand on a le goût de la chose, quand on a le goût de la chose bien faite, le beau geste, comme on dit chez nous, parfois on ne trouve pas l’interlocuteur en face je dirais, le miroir qui vous aide à avancer. Alors ça n’est pas mon cas, comme je disais là, puisque moi au contraire, j’ai pu ; et je dis merci à la vie, je lui dis merci, je chante la vie, je danse la vie... je ne suis qu’amour ! Je chante l'amour. Mais ce qui est amusant d'être là ensemble et qu'on évoque ça aujourd'hui, c'est que je suis à ce tournant-là de la vie aujourd'hui, je réalise pleinement par ce travail avec mon maître, je réalise cette passion. Et quand je dis passion, c'est vraiment, c'est le coeur, c'est les tripes, c'est le vécu d'un homme. Un homme qui peut s'exprimer. Et finalement, quand beaucoup de gens me disent « Mais comment fais-tu pour avoir cette humanité ? », je leur réponds très simplement, je leur dit, c’est ce goût de l’amour, ce goût de faire une chaîne d'amour, une « love channel », comme disent nos amis d'outre-Manche, ce goût donc qui m’a poussé aujourd’hui à entreprendre une construction mécanique... mais demain qui sait ? Peut-être simplement à me mettre au service de la communauté, à faire le don, le don de soi.",
  },
];

import { useState } from 'react';

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      tabIndex={0}
      className={`collapse collapse-arrow border transition-all duration-300 ${
        isOpen ? 'bg-primary-soft border-primary-dark' : 'bg-base-100 border-base-300'
      }`}
      onClick={() => setIsOpen(!isOpen)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setIsOpen(!isOpen);
        }
      }}
    >
      {/* Question */}
      <div className="collapse-title font-semibold text-ink">
        {question}
      </div>

      {/* Réponse (le fond mauve n'apparaît QUE si ouvert) */}
      <div className="collapse-content">
        <div
          className="p-4 rounded-b-lg text-sm text-ink"
          style={{
            backgroundColor: isOpen ? 'var(--color-primary-soft)' : 'transparent',
          }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-base-100 rounded-lg shadow-lg p-8">
          {/* Titre avec fond bleu foncé terne */}
          <div
            className="mb-8 p-4 rounded-lg"
            style={{
              backgroundColor: "var(--color-primary-soft)", // Fond bleu très clair
              border: "1px solid var(--color-primary-dark)", // Bordure bleu foncé
              borderRadius: "0.5rem",
            }}
          >
            <h1 className="text-3xl font-bold text-center mb-2" style={{ color: "var(--color-primary-dark)" }}>
              Questions Fréquemment Posées
            </h1>
            <p className="text-center" style={{ color: "var(--color-ink)", opacity: 0.7 }}>
              Trouvez les réponses aux questions les plus courantes
            </p>
          </div>
                    <div className="space-y-4">
            {faqs.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
