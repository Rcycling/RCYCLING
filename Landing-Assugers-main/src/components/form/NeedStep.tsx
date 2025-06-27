import React from 'react';
import { useInsurance } from '../../contexts/InsuranceContext';

const NeedStep = () => {
  const { formData, updateFormData, selectedProduct } = useInsurance();

  const handleInputChange = (field: string, value: string) => {
    updateFormData('need', { [field]: value });
  };

  const handleMultiSelectChange = (field: string, value: string, checked: boolean) => {
    const currentValues = formData.need?.[field] || [];
    let newValues;
    
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((v: string) => v !== value);
    }
    
    updateFormData('need', { [field]: newValues });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Véhicule & Besoin
      </h3>
      
      {/* Vehicle Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-4">Véhicule</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Immatriculation (identification du véhicule) *
            </label>
            <input
              type="text"
              name="vehicleLicensePlate"
              value={formData.need?.vehicleLicensePlate || ''}
              onChange={(e) => handleInputChange('vehicleLicensePlate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
              placeholder="Ex: AB-123-CD"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marque
            </label>
            <input
              type="text"
              name="vehicleBrand"
              value={formData.need?.vehicleBrand || ''}
              onChange={(e) => handleInputChange('vehicleBrand', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
              placeholder="Ex: Peugeot, Renault..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modèle
            </label>
            <input
              type="text"
              name="vehicleModel"
              value={formData.need?.vehicleModel || ''}
              onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
              placeholder="Ex: 308, Clio..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {selectedProduct === 'car' ? 'Finition' : 'Cylindrée'}
            </label>
            <input
              type="text"
              name="vehicleFinition"
              value={formData.need?.vehicleFinition || ''}
              onChange={(e) => handleInputChange('vehicleFinition', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
              placeholder={selectedProduct === 'car' ? 'Ex: Allure, GT Line...' : 'Ex: 125cc, 600cc...'}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              1ʳᵉ MEC
            </label>
            <input
              type="date"
              name="vehicleFirstRegistration"
              value={formData.need?.vehicleFirstRegistration || ''}
              onChange={(e) => handleInputChange('vehicleFirstRegistration', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
            />
          </div>
          
          {selectedProduct === 'car' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Puissance fiscale
              </label>
              <input
                type="number"
                name="vehicleFiscalPower"
                value={formData.need?.vehicleFiscalPower || ''}
                onChange={(e) => handleInputChange('vehicleFiscalPower', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
                placeholder="Ex: 7 CV"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Carburant
            </label>
            <select
              name="vehicleFuel"
              value={formData.need?.vehicleFuel || ''}
              onChange={(e) => handleInputChange('vehicleFuel', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
            >
              <option value="">Sélectionnez</option>
              <option value="gasoline">Essence</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Hybride</option>
              <option value="electric">Électrique</option>
              <option value="gpl">GPL</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Garanties souhaitées (plusieurs choix possibles)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {['Responsabilité civile', 'Vol', 'Incendie', 'Bris de glace', 'Tous risques', 'Assistance'].map((guarantee) => (
              <label key={guarantee} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(formData.need?.guarantees || []).includes(guarantee)}
                  onChange={(e) => handleMultiSelectChange('guarantees', guarantee, e.target.checked)}
                  className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                />
                <span className="text-sm">{guarantee}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      
      {/* Insurance Need */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Besoin d'assurance
        </label>
        <select
          name="insuranceNeed"
          value={formData.need?.insuranceNeed || ''}
          onChange={(e) => handleInputChange('insuranceNeed', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
          required
        >
          <option value="">Sélectionnez votre besoin</option>
          <option value="immediate">Immédiatement</option>
          <option value="month">1 mois</option>
          <option value="later">Plus tard</option>
        </select>
      </div>
      
      {/* GDPR Consent */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="gdprConsent"
            checked={formData.need?.gdprConsent || false}
            onChange={(e) => handleInputChange('gdprConsent', e.target.checked.toString())}
            className="mt-1 h-4 w-4 text-[#16a34a] focus:ring-[#16a34a] border-gray-300 rounded"
            required
          />
          <span className="text-sm text-gray-700">
            J'accepte que mes données personnelles soient utilisées par AssuGERIS pour me recontacter dans le cadre de ma demande de devis d'assurance. 
            Ces données ne seront pas transmises à des tiers et je peux exercer mes droits en contactant le 04 68 05 75 45. *
          </span>
        </label>
      </div>
    </div>
  );
};

export default NeedStep;