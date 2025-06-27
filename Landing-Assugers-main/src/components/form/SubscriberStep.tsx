import React from 'react';
import { useInsurance } from '../../contexts/InsuranceContext';

const SubscriberStep = () => {
  const { formData, updateFormData } = useInsurance();

  const handleInputChange = (field: string, value: string) => {
    updateFormData('subscriber', { [field]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Souscripteur
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date de naissance *
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.subscriber?.birthDate || ''}
            onChange={(e) => handleInputChange('birthDate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profession *
          </label>
          <select
            name="profession"
            value={formData.subscriber?.profession || ''}
            onChange={(e) => handleInputChange('profession', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
            required
          >
            <option value="">Sélectionnez</option>
            <option value="employee">Salarié (Employé)</option>
            <option value="artisan">Artisan</option>
            <option value="merchant">Commerçant</option>
            <option value="liberal">Profession libérale</option>
            <option value="other">Autre</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Situation matrimoniale *
          </label>
          <select
            name="maritalStatus"
            value={formData.subscriber?.maritalStatus || ''}
            onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
            required
          >
            <option value="">Sélectionnez</option>
            <option value="single">Célibataire</option>
            <option value="married">Marié(e)</option>
            <option value="pacs">Pacsé(e)</option>
            <option value="divorced">Divorcé(e)</option>
            <option value="separated">Séparé(e)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Code postal *
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.subscriber?.postalCode || ''}
            onChange={(e) => handleInputChange('postalCode', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
            placeholder="Ex: 75001"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ville *
          </label>
          <input
            type="text"
            name="city"
            value={formData.subscriber?.city || ''}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
            placeholder="Ex: Paris, Lyon..."
            required
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriberStep;