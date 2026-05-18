import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import MoneyCompassForm from '../../components/MoneyCompass/MoneyCompassForm/MoneyCompassForm';
import RecommendationCard from '../../components/MoneyCompass/RecommendationCard/RecommendationCard';

function MoneyCompass() {
  const navigate = useNavigate();
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
    <div className="main-content min-h-screen py-8">
      {/* Header and Back Button Container */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 transition shadow-sm shrink-0"
            title="Zurück zum Dashboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#0EB689] tracking-tight">Money Compass</h1>
            <p className="text-sm text-gray-500">Finde deinen persönlichen Startpunkt fürs Investieren.</p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Form (5/12 grid-span on desktop) */}
          <div className="md:col-span-5">
            <MoneyCompassForm 
              onSubmit={handleGenerateRecommendation} 
              isLoading={loading} 
            />
          </div>

          {/* Right Column: Clara Coach Output (7/12 grid-span on desktop) */}
          <div className="md:col-span-7">
            {loading ? (
              /* Loading State */
              <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-md border border-gray-100 min-h-[350px]">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-[#0EB689] rounded-full animate-spin mb-4"></div>
                <p className="text-base text-gray-700 font-semibold mb-1">Dein finanzieller Kompass wird erstellt...</p>
                <p className="text-sm text-gray-500 text-center">Clara analysiert deine Eingaben und Prioritäten.</p>
              </div>
            ) : recommendation || error ? (
              /* Generated Result State */
              <RecommendationCard recommendation={recommendation} error={error} />
            ) : (
              /* Initial Welcome State from Clara */
              <div className="bg-white rounded-2xl p-6 shadow-md border border-[#0EB689]/15 min-h-[350px] flex flex-col justify-between">
                <div>
                  {/* Clara Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Clara - Money Compass Coach"
                      className="w-16 h-16 rounded-full object-cover bg-[#E1E8ED] border-[3px] border-[#EAF5F1]"
                    />
                    <div>
                      <h3 className="m-0 text-lg text-gray-800 font-bold">Hi, ich bin Clara</h3>
                      <p className="text-xs text-[#0EB689] font-semibold uppercase tracking-wider m-0">Dein Money Compass Coach</p>
                    </div>
                  </div>

                  {/* Bubble content */}
                  <div className="p-5 rounded-2xl rounded-tl-sm text-[15px] leading-relaxed bg-[#F0F9F6] text-gray-800 border border-[#0EB689]/10">
                    <p className="m-0 font-medium text-gray-800 mb-2">Herzlich willkommen beim Money Compass! 👋</p>
                    <p className="m-0 text-gray-600">
                      Ich helfe dir dabei, deinen optimalen Startpunkt für den Vermögensaufbau zu finden. 
                      Trage links einfach deine Daten ein (deine Sparrate, dein Alter, Anlagehorizont und deine Prioritäten) und klicke auf <strong className="text-gray-800">"Ergebnis anzeigen"</strong>.
                    </p>
                    <p className="m-0 text-gray-600 mt-3">
                      Ich erstelle dir dann umgehend eine maßgeschneiderte ETF- und Anlagestrategie, die perfekt zu deiner Lebenssituation passt!
                    </p>
                  </div>
                </div>
                
                {/* Decorative footer */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-medium">
                  <span>🔒 Deine Daten werden nur lokal verarbeitet</span>
                  <span>Buddy.Fi Coach-System v1.2</span>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default MoneyCompass;
