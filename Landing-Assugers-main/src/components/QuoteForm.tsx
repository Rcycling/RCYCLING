import React, { useState, useRef } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useInsurance } from '../contexts/InsuranceContext';
import ContactStep from './form/ContactStep';
import SubscriberStep from './form/SubscriberStep';
import LicenseHistoryStep from './form/LicenseHistoryStep';
import AccidentsStep from './form/AccidentsStep';
import NeedStep from './form/NeedStep';

const QuoteForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { selectedProduct, formData } = useInsurance();

  const steps = [
    { id: 1, name: 'Contact', component: ContactStep },
    { id: 2, name: 'Souscripteur', component: SubscriberStep },
    { id: 3, name: 'Permis / Infractions', component: LicenseHistoryStep },
    { id: 4, name: 'Sinistres', component: AccidentsStep },
    { id: 5, name: 'Besoin & Envoi', component: NeedStep }
  ];

  const maxStep = steps.length;

  const handleNext = () => {
    if (currentStep < maxStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    formRef.current?.submit();
  };

  const getCurrentStepComponent = () => {
    const step = steps.find(s => s.id === currentStep);
    return step ? step.component : ContactStep;
  };

  const CurrentStepComponent = getCurrentStepComponent();


  return (
    <section id="quote-form" className="py-16 bg-gradient-to-br from-[#83191d] to-[#a02328]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Obtenez votre devis en 3 minutes
            </h2>
            
            {/* Progress Bar */}
            <div className="flex items-center space-x-2 mb-4 overflow-x-auto">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex items-center flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= step.id 
                        ? 'bg-[#16a34a] text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`ml-2 text-xs md:text-sm font-medium ${
                      currentStep >= step.id ? 'text-[#16a34a]' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 min-w-[20px] ${
                      currentStep > step.id ? 'bg-[#16a34a]' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {/* Form Content */}
          <form ref={formRef} action="/sendmail.php" method="POST" className="p-8">
            <input type="text" name="website" style={{ display: 'none' }} />
            <CurrentStepComponent />
            
            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Précédent</span>
              </button>
              
              {currentStep < maxStep ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center space-x-2 bg-[#16a34a] hover:bg-[#15803d] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>Suivant</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  data-gtag="lead-submitted"
                  className={`flex items-center space-x-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#16a34a] hover:bg-[#15803d] text-white'
                  }`}
                >
                  <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}</span>
                  <CheckCircle className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
