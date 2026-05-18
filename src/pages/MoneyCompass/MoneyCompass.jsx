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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">Money Compass</h1>
          <p className="text-lg text-gray-600">Finde deinen persönlichen Startpunkt fürs Investieren.</p>
        </header>

        <div className="mb-8">
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
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 mt-6">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-[#0EB689] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Dein finanzieller Kompass wird erstellt...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoneyCompass;
