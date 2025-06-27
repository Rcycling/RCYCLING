import React from 'react';
import { Car, Bike, Zap } from 'lucide-react';
import { useInsurance } from '../contexts/InsuranceContext';

const ProductPicker = () => {
  const { selectedProduct, setSelectedProduct } = useInsurance();

  const products = [
    {
      id: 'car',
      name: 'Voiture',
      icon: Car,
      description: 'Assurance auto tous risques'
    },
    {
      id: 'motorbike',
      name: 'Moto',
      icon: Bike,
      description: 'Assurance moto & scooter'
    },
    {
      id: 'scooter',
      name: 'Scooter',
      icon: Zap,
      description: 'Assurance deux-roues'
    }
  ];

  const scrollToForm = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
    scrollToForm();
  };

  return (
    <div id="product-picker" className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
            Que souhaitez-vous assurer ?
          </h2>
          <p className="text-lg text-red-500 max-w-2xl mx-auto">
            Choisissez votre véhicule pour un devis personnalisé
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                onClick={() => handleProductSelect(product.id)}
                className={`cursor-pointer bg-white rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 ${
                  selectedProduct === product.id ? 'border-[#83191d]' : 'border-transparent'
                }`}
              >
                <div className="text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="bg-[#83191d] text-white p-4 rounded-full">
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600">
                    {product.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductPicker;