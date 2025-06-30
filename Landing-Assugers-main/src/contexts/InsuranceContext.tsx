import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';

interface InsuranceContextType {
  selectedProduct: string;
  setSelectedProduct: (product: string) => void;
  formData: {
    contact: any;
    subscriber: any;
    license: any;
    sanctions: any;
    accidents: any;
    need: any;
  };
  updateFormData: (section: string, data: any) => void;
}

const InsuranceContext = createContext<InsuranceContextType | undefined>(undefined);

export const useInsurance = () => {
  const context = useContext(InsuranceContext);
  if (!context) {
    throw new Error('useInsurance must be used within an InsuranceProvider');
  }
  return context;
};

interface InsuranceProviderProps {
  children: ReactNode;
}

export const InsuranceProvider: React.FC<InsuranceProviderProps> = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState<string>(() => {
    return localStorage.getItem('selectedProduct') || '';
  });

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('formData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore parse errors
      }
    }
    return {
      contact: {},
      subscriber: {},
      license: {},
      sanctions: {},
      accidents: { list: [] as Record<string, string>[] },
      need: {}
    };
  });

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], ...data }
    }));
  };

  useEffect(() => {
    localStorage.setItem('selectedProduct', selectedProduct);
  }, [selectedProduct]);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  return (
    <InsuranceContext.Provider value={{
      selectedProduct,
      setSelectedProduct,
      formData,
      updateFormData
    }}>
      {children}
    </InsuranceContext.Provider>
  );
};
