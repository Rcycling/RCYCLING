import React from 'react';

const LegalBand = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#83191d] text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="text-xl font-bold">
              Assugeris
            </div>
            <div className="text-sm text-white/80">
              © {currentYear} Tous droits réservés
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <a
              href="https://www.assugeris-espace-assurances.fr/mentions-legales.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors duration-300"
            >
              Mentions légales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LegalBand;