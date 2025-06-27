import React from 'react';
import TopContactBar from './components/TopContactBar';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import QuoteForm from './components/QuoteForm';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import LegalBand from './components/LegalBand';
import SEOFooter from './components/SEOFooter';
import { InsuranceProvider } from './contexts/InsuranceContext';

function App() {
  return (
    <InsuranceProvider>
      <div className="min-h-screen bg-white font-['Poppins']">
        <TopContactBar />
        <Header />
        <Hero />
        <WhyUs />
        <QuoteForm />
        <Testimonials />
        <FAQ />
        <SEOFooter />
        <LegalBand />
      </div>
    </InsuranceProvider>
  );
}

export default App;