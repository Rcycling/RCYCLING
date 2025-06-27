import React from 'react';
import { Phone } from 'lucide-react';

const TopContactBar = () => {
  return (
    <div className="bg-[#83191d] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 md:py-3">
        <div className="flex items-center justify-between h-8 md:h-10">
          <span className="text-xs md:text-sm">
            Vous avez d'autres questions ? Nos experts sont là pour vous aider
          </span>
          <a
            href="tel:0468057545"
            className="bg-white text-[#83191d] px-2 py-1 md:px-3 md:py-2 rounded-full font-semibold transition-all duration-300 hover:bg-gray-100 inline-flex items-center space-x-1 md:space-x-2 text-xs md:text-sm"
          >
            <Phone className="w-3 h-3 md:w-4 md:h-4" />
            <span>04 68 05 75 45</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopContactBar;