import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Comment s'assurer après une suspension de permis ?",
      answer: "Après une suspension, vous devez déclarer votre situation à votre assureur. Si celui-ci vous résilie, Assugeris peut vous proposer une solution adaptée. Nous étudions chaque dossier individuellement pour trouver la meilleure couverture possible."
    },
    {
      question: "Quels documents sont nécessaires pour obtenir un devis ?",
      answer: "Vous aurez besoin de : votre permis de conduire, le certificat d'immatriculation du véhicule, votre relevé d'informations (si disponible), et tout document relatif à la suspension ou résiliation. Nos conseillers vous guideront dans la constitution du dossier."
    },
    {
      question: "Puis-je payer mon assurance en plusieurs fois ?",
      answer: "Oui, nous proposons des facilités de paiement adaptées à votre situation : mensualités, trimestrialités ou semestrialités. Nous étudions ensemble la solution de paiement qui vous convient le mieux."
    },
    {
      question: "Comment assurer un jeune conducteur avec malus ?",
      answer: "Nous avons des solutions spécifiques pour les jeunes conducteurs en situation de malus. Grâce à notre expertise, nous pouvons proposer des tarifs compétitifs même pour les profils considérés comme à risque par les assureurs traditionnels."
    },
    {
      question: "Quels sont les délais d'activation de mon contrat ?",
      answer: "Une fois votre dossier complet et accepté, votre contrat peut être activé sous 24 à 48h. En cas d'urgence, nous pouvons même proposer une couverture immédiate pour vous permettre de reprendre la route rapidement."
    },
    {
      question: "Êtes-vous présents en Corse et dans les DOM-TOM ?",
      answer: "Nous intervenons en Martinique, Guadeloupe, La Réunion et Corse (hors Mayotte et Guyane). Nos tarifs et garanties sont adaptés aux spécificités de chaque territoire."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Questions fréquentes
          </h2>
          <p className="text-lg text-gray-600">
            Trouvez rapidement les réponses à vos questions
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:ring-offset-2 rounded-lg"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#83191d] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#83191d] flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;