import React, { useState, useEffect } from 'react';

/**
 * RecommendationCard Component
 * Displays the coach avatar and the AI-generated recommendation or error.
 * 
 * @param {string} recommendation - The recommendation text to display
 * @param {string} error - The error text to display
 */
function RecommendationCard({ recommendation, error, userName }) {
  const nameSuffix = userName ? ` ${userName}` : '';
  const welcomeText = `Hey${nameSuffix}! Lass uns dein Wissen aus den Buddy.Fi Lektionen direkt in die Praxis umsetzen. Hier ist dein persönlicher Fahrplan, um dein Geld für dich arbeiten zu lassen:`;
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (error) return;
    setTypedText('');
    
    let currentText = '';
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < welcomeText.length) {
        currentText += welcomeText.charAt(index);
        setTypedText(currentText);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 15);
    
    return () => clearInterval(interval);
  }, [error]);

  // Helper to parse the LLM response into structured data
  const parseRecommendation = (text) => {
    if (!text) return null;

    const investorTypeMarker = /1\.\s*(?:Investor type|Anlegertyp)[:\s]*(.*?)(?=2\.\s*(?:Example portfolio|Beispiel-Portfolio|Portfolio)|$)/is;
    const portfolioMarker = /2\.\s*(?:Example portfolio|Beispiel-Portfolio|Portfolio)[:\s]*(.*?)(?=3\.\s*(?:Explanation|Erklärung|Begründung)|$)/is;
    const explanationMarker = /3\.\s*(?:Explanation|Erklärung|Begründung)[:\s]*(.*)/is;

    const investorTypeMatch = text.match(investorTypeMarker);
    const portfolioMatch = text.match(portfolioMarker);
    const explanationMatch = text.match(explanationMarker);

    if (!investorTypeMatch && !portfolioMatch && !explanationMatch) {
      return null; // Fallback to raw rendering
    }

    const investorType = investorTypeMatch ? investorTypeMatch[1].trim() : '';
    
    // Parse portfolio lines
    const portfolioText = portfolioMatch ? portfolioMatch[1].trim() : '';
    const portfolioItems = portfolioText
      .split('\n')
      .map(line => line.replace(/^-\s*/, '').trim())
      .filter(Boolean)
      .map(item => {
        const pctMatch = item.match(/^(\d+)\s*%\s*(.*)$/);
        if (pctMatch) {
          return { percentage: parseInt(pctMatch[1], 10), label: pctMatch[2].trim() };
        }
        return { percentage: null, label: item };
      });

    // Parse explanation lines
    const explanationText = explanationMatch ? explanationMatch[1].trim() : '';
    const explanationItems = explanationText
      .split('\n')
      .map(line => line.replace(/^-\s*/, '').trim())
      .filter(Boolean);

    return {
      investorType,
      portfolioItems,
      explanationItems
    };
  };

  const parsedData = error ? null : parseRecommendation(recommendation);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-[#0EB689]/15 min-h-[350px] flex flex-col justify-between">
      <div>
        {/* Clara Header & Speech Bubble (Unified inside the card) */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Clara - Money Compass Coach"
            className="w-16 h-16 rounded-full object-cover bg-[#E1E8ED] border-[3px] border-[#EAF5F1] shrink-0"
          />
          
          {/* Clara Speech Bubble with Typing Effect */}
          <div className="p-4 rounded-2xl rounded-tl-sm bg-[#F0F9F6] text-gray-800 border border-[#0EB689]/10 flex-1">
            <p className="text-sm font-semibold text-gray-800 m-0 leading-relaxed min-h-[2.5rem]">
              {error ? 'Es gab ein Problem. Bitte überprüfe die Details unten.' : typedText}
              {!error && typedText.length < welcomeText.length && (
                <span className="inline-block w-1.5 h-3.5 bg-[#0EB689] ml-0.5 animate-pulse shrink-0 align-middle" />
              )}
            </p>
          </div>
        </div>

        {error ? (
          <div className="bg-[#FFF5F5] border border-[#FFEBEB] text-[#5C3D3D] p-5 rounded-2xl text-[15px] leading-relaxed shadow-sm">
            <p className="m-0 font-semibold mb-2">Fehlermeldung:</p>
            <p className="m-0 whitespace-pre-wrap">{error}</p>
          </div>
        ) : parsedData ? (
          <div className="flex flex-col gap-5">
            {/* Card 1: Investor Type */}
            {parsedData.investorType && (
              <div className="bg-gradient-to-r from-[#F0F9F6] to-white rounded-2xl p-5 shadow-sm border border-[#0EB689]/15">
                <span className="text-[11px] font-bold text-[#0EB689] uppercase tracking-wider block mb-1">Dein Anlagetyp</span>
                <p className="text-lg font-bold text-gray-800 m-0 leading-snug">
                  {parsedData.investorType}
                </p>
              </div>
            )}

            {/* Card 2: Portfolio Allocation */}
            {parsedData.portfolioItems && parsedData.portfolioItems.length > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <span className="text-[11px] font-bold text-[#0EB689] uppercase tracking-wider block mb-4">Empfohlene Aufteilung</span>
                
                {/* Responsive 3-Column Layout surrounding the larger Donut Chart */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
                  
                  {/* Left Card: ETFs (Index 0) */}
                  {parsedData.portfolioItems[0] && (() => {
                    const match = parsedData.portfolioItems[0].label.match(/^(.*?)\s*\((.*)\)$/);
                    const mainLabel = match ? match[1] : parsedData.portfolioItems[0].label;
                    return (
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm hover:shadow transition-shadow h-full order-1 sm:order-none">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Wachstum</span>
                        <span className="text-3xl font-bold text-[#0EB689] my-1.5">{parsedData.portfolioItems[0].percentage}%</span>
                        <span className="text-sm font-semibold text-gray-800">{mainLabel}</span>
                      </div>
                    );
                  })()}

                  {/* Center: Large Donut Chart (conic-gradient) */}
                  <div className="flex justify-center items-center order-first sm:order-none">
                    <div 
                      className="relative w-36 h-36 rounded-full shadow-inner flex items-center justify-center shrink-0" 
                      style={{
                        background: `conic-gradient(
                          #4F46E5 0% ${parsedData.portfolioItems[1]?.percentage || 0}%,
                          #F59E0B ${parsedData.portfolioItems[1]?.percentage || 0}% ${(parsedData.portfolioItems[1]?.percentage || 0) + (parsedData.portfolioItems[2]?.percentage || 0)}%,
                          #0EB689 ${(parsedData.portfolioItems[1]?.percentage || 0) + (parsedData.portfolioItems[2]?.percentage || 0)}% 100%
                        )`
                      }}
                    >
                      <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-md">
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Aufteilung</span>
                        <span className="text-base font-bold text-gray-800">100%</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Card: Safe Assets (Index 1) */}
                  {parsedData.portfolioItems[1] && (() => {
                    const match = parsedData.portfolioItems[1].label.match(/^(.*?)\s*\((.*)\)$/);
                    const mainLabel = match ? match[1] : parsedData.portfolioItems[1].label;
                    return (
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm hover:shadow transition-shadow h-full order-2 sm:order-none">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Sicherheit</span>
                        <span className="text-3xl font-bold text-[#4F46E5] my-1.5">{parsedData.portfolioItems[1].percentage}%</span>
                        <span className="text-sm font-semibold text-gray-800">{mainLabel}</span>
                      </div>
                    );
                  })()}

                  {/* Bottom Card: Cash / Liquidity (Index 2) */}
                  {parsedData.portfolioItems[2] && (() => {
                    const match = parsedData.portfolioItems[2].label.match(/^(.*?)\s*\((.*)\)$/);
                    const mainLabel = match ? match[1] : parsedData.portfolioItems[2].label;
                    return (
                      <div className="col-span-1 sm:col-span-3 flex justify-center mt-2 order-3 sm:order-none">
                        <div className="w-full sm:w-2/3 p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm hover:shadow transition-shadow">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Puffer / Cash</span>
                          <span className="text-3xl font-bold text-[#F59E0B] my-1.5">{parsedData.portfolioItems[2].percentage}%</span>
                          <span className="text-sm font-semibold text-gray-800">{mainLabel}</span>
                        </div>
                      </div>
                    );
                  })()}

                </div>
              </div>
            )}

            {/* Card 3: Explanations */}
            {parsedData.explanationItems && parsedData.explanationItems.length > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <span className="text-[11px] font-bold text-[#0EB689] uppercase tracking-wider block mb-3">Erklärung & Begründung</span>
                <ul className="m-0 p-0 list-none flex flex-col gap-3">
                  {parsedData.explanationItems.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-gray-600 leading-relaxed items-start">
                      <span className="text-[#0EB689] font-bold shrink-0 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          /* Fallback: Plain raw text response in bubble */
          <div className="bg-[#F0F9F6] text-gray-800 p-5 rounded-2xl rounded-tl-sm text-[15px] leading-relaxed border border-[#0EB689]/10 shadow-sm">
            <p className="m-0 whitespace-pre-wrap">{recommendation}</p>
          </div>
        )}
        
        {/* Raw Response (Always Visible for Testing) */}
        {!error && recommendation && (
          <div className="mt-4 border-t border-gray-150 pt-4">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Rohe API-Antwort (Test-Ansicht)
            </span>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-mono text-gray-600 whitespace-pre-wrap leading-relaxed">
              {recommendation}
            </div>
          </div>
        )}
      </div>

      {/* Decorative footer */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-medium">
        <span>🔒 Deine Daten werden nur lokal verarbeitet</span>
        <span>Buddy.Fi Coach-System v1.2</span>
      </div>
    </div>
  );
}

export default RecommendationCard;
