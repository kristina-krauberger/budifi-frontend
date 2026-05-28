import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import MoneyCompassForm from '../../components/MoneyCompass/MoneyCompassForm/MoneyCompassForm';
import RecommendationCard from '../../components/MoneyCompass/RecommendationCard/RecommendationCard';
import { generatePortfolioRecommendation, getCoachWelcome } from '../../api/moneyCompass.api';
import { LoggedInUserContext } from '../../context/LoggedInUserContext';

function MoneyCompass() {
  const navigate = useNavigate();
  const { loggedInUser } = useContext(LoggedInUserContext);
  const userName = loggedInUser?.first_name || '';

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState('');
  const [error, setError] = useState('');
  const [welcomeData, setWelcomeData] = useState({
    name: "Clara",
    role: "Dein Money Compass Coach",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "Hi, ich bin Clara! Lass uns dein Geld wachsen lassen! 🚀",
    paragraph1: "Ich helfe dir dabei, das absolute Maximum aus deinen Finanzen herauszuholen! Lass uns keine Zeit verschwenden. Trage links einfach deine Daten ein (deine Sparrate, dein Alter, Anlagehorizont und deine Prioritäten) und klicke auf \"Ergebnis anzeigen\".",
    paragraph2: "Ich erstelle dir dann umgehend eine rendite- und wachstumsoptimierte ETF- und Anlagestrategie, die perfekt zu deiner Lebenssituation passt. Lass uns loslegen!"
  });

  useEffect(() => {
    const name = loggedInUser?.first_name || '';
    getCoachWelcome(name)
      .then(data => {
        if (data) {
          setWelcomeData(data);
        }
      })
      .catch(err => {
        console.error("Fehler beim Laden des Coach-Willkommenstextes:", err);
      });
  }, [loggedInUser]);

  const handleGenerateRecommendation = async (formData) => {
    setLoading(true);
    setRecommendation('');
    setError('');

    // Log the data being sent to the console
    console.log("Sende Daten an die Money Compass API:", formData);

    try {
      // Call the API endpoint on the backend
      const response = await generatePortfolioRecommendation(formData);

      // Log the response from the API to the console
      console.log("Antwort von der Money Compass API:", response);

      setRecommendation(response);
    } catch (err) {
      console.error("Fehler bei der Anfrage an die Money Compass API:", err);
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
              <RecommendationCard recommendation={recommendation} error={error} userName={userName} />
            ) : (
              /* Initial Welcome State from Clara */
              <div className="bg-white rounded-2xl p-6 shadow-md border border-[#0EB689]/15 min-h-[350px] flex flex-col justify-between">
                <div>
                  {/* Clara Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <img
                      src={welcomeData.avatar}
                      alt={`${welcomeData.name} - Money Compass Coach`}
                      className="w-16 h-16 rounded-full object-cover bg-[#E1E8ED] border-[3px] border-[#EAF5F1]"
                    />
                    <div>
                      <h3 className="m-0 text-lg text-gray-800 font-bold">
                        Hi{userName ? ` ${userName}` : ''}, ich bin {welcomeData.name}
                      </h3>
                      <p className="text-xs text-[#0EB689] font-semibold uppercase tracking-wider m-0">{welcomeData.role}</p>
                    </div>
                  </div>

                  {/* Bubble content */}
                  <div className="p-5 rounded-2xl rounded-tl-sm text-[15px] leading-relaxed bg-[#F0F9F6] text-gray-800 border border-[#0EB689]/10">
                    <p className="m-0 font-medium text-gray-800 mb-2">{welcomeData.title}</p>
                    <p className="m-0 text-gray-600">
                      {welcomeData.paragraph1}
                    </p>
                    {welcomeData.paragraph2 && (
                      <p className="m-0 text-gray-600 mt-3">
                        {welcomeData.paragraph2}
                      </p>
                    )}
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
