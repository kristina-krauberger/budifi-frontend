import React, { useState } from 'react';
import MoneyCompassForm from '../../components/MoneyCompass/MoneyCompassForm/MoneyCompassForm';
import RecommendationCard from '../../components/MoneyCompass/RecommendationCard/RecommendationCard';

function MoneyCompass() {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState('');
  const [error, setError] = useState('');

  const handleGenerateRecommendation = async (formData) => {
    setLoading(true);
    setRecommendation('');
    setError('');

    try {
      // Mock the recommendation response
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const mockResult = {
        recommendation: `Basierend auf deinem Profil (Alter: ${formData.age}, Sparrate: ${formData.monthlySavings}€, Horizont: ${formData.investmentHorizon}) empfehlen wir ein ausgewogenes Portfolio. 
        
Deine Prioritäten (Rendite: ${formData.priorityReturn}%, Sicherheit: ${formData.prioritySecurity}%, Liquidität: ${formData.priorityLiquidity}%) passen gut zu einer diversifizierten ETF-Strategie. Beginne mit einem globalen Aktien-ETF und einem Anteil an sicheren Anleihen.`
      };

      setRecommendation(mockResult.recommendation);
    } catch (err) {
      setError(err.message || 'Etwas ist bei der Erstellung deiner Empfehlung schiefgelaufen. Bitte versuche es später noch einmal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="max-w-[500px] mx-auto px-4">
        <header className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-[#0EB689] tracking-tight mb-1.5">Money Compass</h1>
          <p className="text-sm text-gray-500">Finde deinen persönlichen Startpunkt fürs Investieren.</p>
        </header>

        <div className="mb-6">
          <MoneyCompassForm 
            onSubmit={handleGenerateRecommendation} 
            isLoading={loading} 
          />
        </div>

        {/* Display recommendation or error if any exists */}
        {(recommendation || error) && (
          <RecommendationCard recommendation={recommendation} error={error} />
        )}

        {/* Display loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 mt-4">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#0EB689] rounded-full animate-spin mb-3"></div>
            <p className="text-sm text-gray-600 font-medium">Dein finanzieller Kompass wird erstellt...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoneyCompass;
