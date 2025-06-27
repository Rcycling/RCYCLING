import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      name: "Laurent Che",
      duration: "4 ans",
      rating: 5,
      text: "Cela fait deux fois que je fais appel à Assugeris, une fois pour le scooter de mon fils et une fois pour sa voiture. Service impeccable, très professionnel et réactif."
    },
    {
      name: "Bouchon san",
      duration: "1 an",
      rating: 5,
      text: "Contact très bien, réactifs, à l'écoute. Je recommande vivement leurs services."
    },
    {
      name: "Sylvie Bottero",
      duration: "6 ans",
      rating: 5,
      text: "Très bon accueil, merci pour votre professionnalisme et votre réactivité."
    },
    {
      name: "Client",
      duration: "2 ans",
      rating: 5,
      text: "Je recommande Assugeris, contact rapide et à l'écoute. Merci pour votre aide précieuse."
    },
    {
      name: "Linda Lamoly",
      duration: "2 ans",
      rating: 5,
      text: "Rapide, efficace. Très satisfaite du service client et de la réactivité de l'équipe."
    }
  ];

  const keyWords = ["Professionnalisme", "Réactivité", "Service téléphonique"];

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length, isPaused]);

  const handleNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    } else {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
    
    // Pause for 25 seconds after manual click
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 25000);
  };

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Avis Google – 4,6★
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">4.6</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-6 h-6 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : i === 4 ? 'fill-yellow-400/60 text-yellow-400' : 'fill-gray-300 text-gray-300'}`} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="bg-white rounded-2xl shadow-lg p-8 min-h-[200px] flex items-center">
            <div className="w-full">
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <blockquote className="text-lg md:text-xl text-gray-700 text-center mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-gray-600">
                  {testimonials[currentTestimonial].duration}
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={() => handleNavigation('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={() => handleNavigation('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-[#83191d]' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Keywords Tags */}
        <div className="flex justify-center space-x-4 mt-8">
          {keyWords.map((keyword, index) => (
            <span
              key={index}
              className="bg-[#83191d] text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;