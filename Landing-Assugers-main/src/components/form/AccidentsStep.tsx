import React, { useState } from 'react';
import { useInsurance } from '../../contexts/InsuranceContext';
import { Plus, Trash2 } from 'lucide-react';

const AccidentsStep = () => {
  const { formData, updateFormData } = useInsurance();
  const [accidents, setAccidents] = useState(formData.accidents?.list || [{}]);

  const handleAccidentChange = (index: number, field: string, value: string) => {
    const newAccidents = [...accidents];
    newAccidents[index] = { ...newAccidents[index], [field]: value };
    setAccidents(newAccidents);
    updateFormData('accidents', { list: newAccidents });
  };

  const addAccident = () => {
    if (accidents.length < 3) {
      const newAccidents = [...accidents, {}];
      setAccidents(newAccidents);
      updateFormData('accidents', { list: newAccidents });
    }
  };

  const removeAccident = (index: number) => {
    const newAccidents = accidents.filter((_, i) => i !== index);
    setAccidents(newAccidents);
    updateFormData('accidents', { list: newAccidents });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Sinistres &lt; 3 ans
      </h3>
      
      <div className="space-y-4">
        {accidents.map((accident, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">
                Sinistre {index + 1}
              </h4>
              {accidents.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAccident(index)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name={`accidentDate_${index}`}
                  value={accident.date || ''}
                  onChange={(e) => handleAccidentChange(index, 'date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nature
                </label>
                <select
                  name={`accidentNature_${index}`}
                  value={accident.nature || ''}
                  onChange={(e) => handleAccidentChange(index, 'nature', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
                >
                  <option value="">Sélectionnez</option>
                  <option value="material">Matériel</option>
                  <option value="bodily">Corporel</option>
                  <option value="glass-breakage">Bris de glace</option>
                  <option value="theft-fire">Vol-Incendie</option>
                  <option value="all-accidents">Dommage tous accidents</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  % responsabilité
                </label>
                <select
                  name={`accidentResponsibility_${index}`}
                  value={accident.responsibility || ''}
                  onChange={(e) => handleAccidentChange(index, 'responsibility', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
                >
                  <option value="">Sélectionnez</option>
                  <option value="0">0</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Détail
                </label>
                <textarea
                  name={`accidentDetails_${index}`}
                  value={accident.details || ''}
                  onChange={(e) => handleAccidentChange(index, 'details', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
                  placeholder="Circonstances, dégâts..."
                />
              </div>
            </div>
          </div>
        ))}
        
        {accidents.length < 3 && (
          <button
            type="button"
            onClick={addAccident}
            className="flex items-center space-x-2 text-[#16a34a] hover:text-[#15803d] transition-colors duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter un sinistre</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AccidentsStep;