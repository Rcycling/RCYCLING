import React, { useEffect, useRef, useState } from 'react';
import { Award, Clock, Globe, TrendingUp } from 'lucide-react';

const WhyUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: Award,
      title: '20 ans d\'expertise',
      description: 'Spécialiste des risques aggravés depuis 2006'
    },
    {
      icon: Clock,
      title: 'Réponse en une heure',
      description: 'Service rapide et réactif'
    },
    {
      icon: Globe,
      title: 'Couverture nationale',
      description: 'France métropolitaine + DOM-TOM (Corse, Réunion, Martinique, Guadeloupe)'
    },
    {
      icon: TrendingUp,
      title: 'Taux d\'acceptation élevé',
      description: 'Forte approbation sur les dossiers complexes'
    }
  ];

  return (
    <section id="why-us" ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir Assugeris ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            L'assureur de référence pour les profils à risques
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`text-center group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mb-6 flex justify-center">
                  <div className="bg-gradient-to-br from-[#83191d] to-[#a02328] text-white p-6 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110">
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;