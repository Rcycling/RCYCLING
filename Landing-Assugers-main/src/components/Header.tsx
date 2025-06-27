import React from 'react';

const Header = () => {
  const scrollToForm = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-white shadow-sm py-3 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 min-h-[54px] md:min-h-[60px]">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=200&h=60&fit=crop" 
              alt="Assugeris - Assureur spécialiste depuis 2006"
              className="h-8 md:h-10 w-auto"
            />
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <button
              onClick={scrollToForm}
              data-gtag="cta-quote"
              className="bg-[#16a34a] hover:bg-[#15803d] text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
            >
              Commencer mon devis
            </button>
            
            <a
              href="https://www.assugeris-espace-assurances.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#16a34a] hover:bg-[#15803d] text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
            >
              Plus d'informations
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;