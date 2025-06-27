import React, { useState } from 'react';
import { useInsurance } from '../../contexts/InsuranceContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const LicenseHistoryStep = () => {
  const { formData, updateFormData, selectedProduct } = useInsurance();
  const [openSections, setOpenSections] = useState<string[]>([]);

  const handleInputChange = (section: string, field: string, value: string) => {
    updateFormData(section, { [field]: value });
  };

  const handleMultiSelectChange = (section: string, field: string, value: string, checked: boolean) => {
    const currentValues = formData[section]?.[field] || [];
    let newValues;
    
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((v: string) => v !== value);
    }
    
    updateFormData(section, { [field]: newValues });
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isVehicleAuto = selectedProduct === 'car';
  const isVehicleMoto = selectedProduct === 'motorbike' || selectedProduct === 'scooter';

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Permis & Historique
      </h3>
      
      {/* Vehicle-specific sections */}
      {isVehicleAuto && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4">Auto</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date permis Auto
              </label>
              <input
                type="date"
                name="autoLicenseDate"
                value={formData.license?.autoLicenseDate || ''}
                onChange={(e) => handleInputChange('license', 'autoLicenseDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Déjà assuré en Auto ?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="autoInsured"
                    value="yes"
                    checked={formData.license?.autoInsured === 'yes'}
                    onChange={(e) => handleInputChange('license', 'autoInsured', e.target.value)}
                    className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                  />
                  <span>Oui</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="autoInsured"
                    value="no"
                    checked={formData.license?.autoInsured === 'no'}
                    onChange={(e) => handleInputChange('license', 'autoInsured', e.target.value)}
                    className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                  />
                  <span>Non</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bonus Auto
              </label>
              <input
                type="text"
                name="autoBonus"
                value={formData.license?.autoBonus || ''}
                onChange={(e) => handleInputChange('license', 'autoBonus', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
                placeholder="Ex: 0.50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date résiliation Auto
              </label>
              <input
                type="date"
                name="autoTerminationDate"
                value={formData.license?.autoTerminationDate || ''}
                onChange={(e) => handleInputChange('license', 'autoTerminationDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motif résiliation Auto
              </label>
              <select
                name="autoTerminationReason"
                value={formData.license?.autoTerminationReason || ''}
                onChange={(e) => handleInputChange('license', 'autoTerminationReason', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
              >
                <option value="">Sélectionnez</option>
                <option value="false-declaration">Fausse déclaration</option>
                <option value="missing-document">Défaut de pièce</option>
                <option value="company-termination">Résiliation compagnie</option>
                <option value="non-payment">Non-paiement</option>
                <option value="claims-frequency">Fréquence sinistres</option>
                <option value="malus">Malus</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {isVehicleMoto && (
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4">Moto / Scooter</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date permis Moto
              </label>
              <input
                type="date"
                name="motoLicenseDate"
                value={formData.license?.motoLicenseDate || ''}
                onChange={(e) => handleInputChange('license', 'motoLicenseDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Déjà assuré en Moto ?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="motoInsured"
                    value="yes"
                    checked={formData.license?.motoInsured === 'yes'}
                    onChange={(e) => handleInputChange('license', 'motoInsured', e.target.value)}
                    className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                  />
                  <span>Oui</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="motoInsured"
                    value="no"
                    checked={formData.license?.motoInsured === 'no'}
                    onChange={(e) => handleInputChange('license', 'motoInsured', e.target.value)}
                    className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                  />
                  <span>Non</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assuré ≥ 2 ans sur moto &lt; 400 cc ?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="motoUnder400Experience"
                    value="yes"
                    checked={formData.license?.motoUnder400Experience === 'yes'}
                    onChange={(e) => handleInputChange('license', 'motoUnder400Experience', e.target.value)}
                    className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                  />
                  <span>Oui</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="motoUnder400Experience"
                    value="no"
                    checked={formData.license?.motoUnder400Experience === 'no'}
                    onChange={(e) => handleInputChange('license', 'motoUnder400Experience', e.target.value)}
                    className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                  />
                  <span>Non</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bonus Moto
              </label>
              <input
                type="text"
                name="motoBonus"
                value={formData.license?.motoBonus || ''}
                onChange={(e) => handleInputChange('license', 'motoBonus', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
                placeholder="Ex: 0.50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date résiliation Moto
              </label>
              <input
                type="date"
                name="motoTerminationDate"
                value={formData.license?.motoTerminationDate || ''}
                onChange={(e) => handleInputChange('license', 'motoTerminationDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motif résiliation Moto
              </label>
              <select
                name="motoTerminationReason"
                value={formData.license?.motoTerminationReason || ''}
                onChange={(e) => handleInputChange('license', 'motoTerminationReason', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
              >
                <option value="">Sélectionnez</option>
                <option value="false-declaration">Fausse déclaration</option>
                <option value="missing-document">Défaut de pièce</option>
                <option value="company-termination">Résiliation compagnie</option>
                <option value="non-payment">Non-paiement</option>
                <option value="claims-frequency">Fréquence sinistres</option>
                <option value="malus">Malus</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Véhicule bridé ?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="vehicleBridged"
                    value="yes"
                    checked={formData.license?.vehicleBridged === 'yes'}
                    onChange={(e) => handleInputChange('license', 'vehicleBridged', e.target.value)}
                    className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                  />
                  <span>Oui</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="vehicleBridged"
                    value="no"
                    checked={formData.license?.vehicleBridged === 'no'}
                    onChange={(e) => handleInputChange('license', 'vehicleBridged', e.target.value)}
                    className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                  />
                  <span>Non</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sanctions Section */}
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-900">Sanctions (-5 ans)</h4>
        </div>
        
        <div className="space-y-4">
          {/* Alcohol/Drugs/Points */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sanction alcool / stupéfiants / points nuls
            </label>
            <div className="space-y-2 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="alcoholDrugsSanction"
                  value="yes"
                  checked={formData.sanctions?.alcoholDrugsSanction === 'yes'}
                  onChange={(e) => handleInputChange('sanctions', 'alcoholDrugsSanction', e.target.value)}
                  className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                />
                <span>Oui</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="alcoholDrugsSanction"
                  value="no"
                  checked={formData.sanctions?.alcoholDrugsSanction === 'no'}
                  onChange={(e) => handleInputChange('sanctions', 'alcoholDrugsSanction', e.target.value)}
                  className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                />
                <span>Non</span>
              </label>
            </div>
            
            {formData.sanctions?.alcoholDrugsSanction === 'yes' && (
              <div className="pl-4 border-l-2 border-[#16a34a] space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date dernière infraction
                    </label>
                    <input
                      type="date"
                      name="lastInfractionDate"
                      value={formData.sanctions?.lastInfractionDate || ''}
                      onChange={(e) => handleInputChange('sanctions', 'lastInfractionDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taux air (mg/L)
                    </label>
                    <input
                      type="number"
                      name="airLevel"
                      value={formData.sanctions?.airLevel || ''}
                      onChange={(e) => handleInputChange('sanctions', 'airLevel', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
                      placeholder="Ex: 0.25"
                      step="0.01"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taux sang (g/L)
                    </label>
                    <input
                      type="number"
                      name="bloodLevel"
                      value={formData.sanctions?.bloodLevel || ''}
                      onChange={(e) => handleInputChange('sanctions', 'bloodLevel', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
                      placeholder="Ex: 0.5"
                      step="0.01"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contrôle lors d'un accident ?
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="accidentControl"
                          value="yes"
                          checked={formData.sanctions?.accidentControl === 'yes'}
                          onChange={(e) => handleInputChange('sanctions', 'accidentControl', e.target.value)}
                          className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                        />
                        <span>Oui</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="accidentControl"
                          value="no"
                          checked={formData.sanctions?.accidentControl === 'no'}
                          onChange={(e) => handleInputChange('sanctions', 'accidentControl', e.target.value)}
                          className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                        />
                        <span>Non</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* License Suspension */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suspension de permis
            </label>
            <div className="space-y-2 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="licenseSuspension"
                  value="yes"
                  checked={formData.sanctions?.licenseSuspension === 'yes'}
                  onChange={(e) => handleInputChange('sanctions', 'licenseSuspension', e.target.value)}
                  className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                />
                <span>Oui</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="licenseSuspension"
                  value="no"
                  checked={formData.sanctions?.licenseSuspension === 'no'}
                  onChange={(e) => handleInputChange('sanctions', 'licenseSuspension', e.target.value)}
                  className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                />
                <span>Non</span>
              </label>
            </div>
            
            {formData.sanctions?.licenseSuspension === 'yes' && (
              <div className="pl-4 border-l-2 border-[#16a34a]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durée
                </label>
                <select
                  name="suspensionDuration"
                  value={formData.sanctions?.suspensionDuration || ''}
                  onChange={(e) => handleInputChange('sanctions', 'suspensionDuration', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
                >
                  <option value="">Sélectionnez</option>
                  <option value="less-6-months">&lt; 6 mois</option>
                  <option value="6-months">6 mois</option>
                  <option value="more-6-months">&gt; 6 mois</option>
                  <option value="more-1-year">&gt; 1 an</option>
                </select>
              </div>
            )}
          </div>

          {/* License Cancellation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annulation de permis
            </label>
            <div className="space-y-2 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="licenseCancellation"
                  value="yes"
                  checked={formData.sanctions?.licenseCancellation === 'yes'}
                  onChange={(e) => handleInputChange('sanctions', 'licenseCancellation', e.target.value)}
                  className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                />
                <span>Oui</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="licenseCancellation"
                  value="no"
                  checked={formData.sanctions?.licenseCancellation === 'no'}
                  onChange={(e) => handleInputChange('sanctions', 'licenseCancellation', e.target.value)}
                  className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                />
                <span>Non</span>
              </label>
            </div>
            
            {formData.sanctions?.licenseCancellation === 'yes' && (
              <div className="pl-4 border-l-2 border-[#16a34a]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motif
                </label>
                <select
                  name="cancellationReason"
                  value={formData.sanctions?.cancellationReason || ''}
                  onChange={(e) => handleInputChange('sanctions', 'cancellationReason', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
                >
                  <option value="">Sélectionnez</option>
                  <option value="alcohol">Alcool au volant</option>
                  <option value="drugs">Stupéfiants</option>
                  <option value="alcohol-drugs">Alcool &amp; stupéfiants</option>
                  <option value="refusal">Refus d'obtempérer</option>
                  <option value="speed">Excès de vitesse</option>
                  <option value="points">Perte de points</option>
                  <option value="other">Autre</option>
                </select>
              </div>
            )}
          </div>

          {/* License Dates */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date permis N°1
              </label>
              <input
                type="date"
                name="license1Date"
                value={formData.sanctions?.license1Date || ''}
                onChange={(e) => handleInputChange('sanctions', 'license1Date', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date permis N°2
              </label>
              <input
                type="date"
                name="license2Date"
                value={formData.sanctions?.license2Date || ''}
                onChange={(e) => handleInputChange('sanctions', 'license2Date', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          {/* Additional Questions */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jugement ?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="judgment"
                    value="yes"
                    checked={formData.sanctions?.judgment === 'yes'}
                    onChange={(e) => handleInputChange('sanctions', 'judgment', e.target.value)}
                    className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                  />
                  <span>Oui</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="judgment"
                    value="no"
                    checked={formData.sanctions?.judgment === 'no'}
                    onChange={(e) => handleInputChange('sanctions', 'judgment', e.target.value)}
                    className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                  />
                  <span>Non</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Délit de fuite / refus d'obtempérer ?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hitAndRun"
                    value="yes"
                    checked={formData.sanctions?.hitAndRun === 'yes'}
                    onChange={(e) => handleInputChange('sanctions', 'hitAndRun', e.target.value)}
                    className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                  />
                  <span>Oui</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hitAndRun"
                    value="no"
                    checked={formData.sanctions?.hitAndRun === 'no'}
                    onChange={(e) => handleInputChange('sanctions', 'hitAndRun', e.target.value)}
                    className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                  />
                  <span>Non</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Autres condamnations (récidive) ?
              </label>
              <div className="space-y-2 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="otherConvictions"
                    value="yes"
                    checked={formData.sanctions?.otherConvictions === 'yes'}
                    onChange={(e) => handleInputChange('sanctions', 'otherConvictions', e.target.value)}
                    className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                  />
                  <span>Oui</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="otherConvictions"
                    value="no"
                    checked={formData.sanctions?.otherConvictions === 'no'}
                    onChange={(e) => handleInputChange('sanctions', 'otherConvictions', e.target.value)}
                    className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                  />
                  <span>Non</span>
                </label>
              </div>
              
              {formData.sanctions?.otherConvictions === 'yes' && (
                <div className="pl-4 border-l-2 border-[#16a34a]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Décrivez la situation
                  </label>
                  <textarea
                    name="otherConvictionsDetails"
                    value={formData.sanctions?.otherConvictionsDetails || ''}
                    onChange={(e) => handleInputChange('sanctions', 'otherConvictionsDetails', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
                    placeholder="Décrivez les circonstances..."
                  />
                </div>
              )}
            </div>
          </div>

          {/* Drugs Section */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-4">Stupéfiants</h5>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date dernière infraction
                </label>
                <input
                  type="date"
                  name="drugsLastInfractionDate"
                  value={formData.sanctions?.drugsLastInfractionDate || ''}
                  onChange={(e) => handleInputChange('sanctions', 'drugsLastInfractionDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Substance (plusieurs choix possibles)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Cannabis', 'Cocaïne', 'Amphétamines', 'Opiacés', 'Autres'].map((substance) => (
                    <label key={substance} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={(formData.sanctions?.substances || []).includes(substance)}
                        onChange={(e) => handleMultiSelectChange('sanctions', 'substances', substance, e.target.checked)}
                        className="mr-2 text-[#16a34a] focus:ring-[#16a34a]"
                      />
                      <span className="text-sm">{substance}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taux (ng/mL)
                </label>
                <input
                  type="number"
                  name="drugsLevel"
                  value={formData.sanctions?.drugsLevel || ''}
                  onChange={(e) => handleInputChange('sanctions', 'drugsLevel', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
                  placeholder="Ex: 2.5"
                  step="0.1"
                />
              </div>
            </div>
          </div>

          {/* Other Infractions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Autres infractions
            </label>
            <textarea
              name="otherInfractions"
              value={formData.sanctions?.otherInfractions || ''}
              onChange={(e) => handleInputChange('sanctions', 'otherInfractions', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition-all duration-300"
              placeholder="Décrivez les autres infractions..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseHistoryStep;