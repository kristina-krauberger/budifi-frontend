import React from 'react';
import CoachAvatar from '../CoachAvatar/CoachAvatar';

/**
 * RecommendationCard Component
 * Displays the coach avatar and the AI-generated recommendation or error.
 * 
 * @param {string} recommendation - The recommendation text to display
 * @param {string} error - The error text to display
 */
function RecommendationCard({ recommendation, error }) {
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
    <div className="flex flex-col gap-6">
      {/* Coach Info Header */}
      <div className="bg-white rounded-2xl p-5 shadow-md border border-[#0EB689]/15 flex items-center gap-4">
        <CoachAvatar />
        <div>
          <h4 className="text-base font-bold text-gray-800 m-0">
            {error ? 'Es gab ein Problem' : 'Deine Anlagestrategie ist bereit'}
          </h4>
          <p className="text-xs text-gray-500 m-0">
            {error ? 'Bitte überprüfe die Details unten.' : 'Clara hat deine Angaben analysiert und empfiehlt:'}
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
              <span className="text-[11px] font-bold text-[#0EB689] uppercase tracking-wider block mb-3">Empfohlene Aufteilung</span>
              
              {/* Stacked Progress Bar */}
              <div className="w-full h-5 bg-gray-100 rounded-full overflow-hidden flex mb-4 shadow-inner">
                {parsedData.portfolioItems.map((item, idx) => {
                  if (!item.percentage) return null;
                  const colors = ['bg-[#0EB689]', 'bg-[#4F46E5]', 'bg-[#F59E0B]', 'bg-[#EF4444]'];
                  return (
                    <div
                      key={idx}
                      style={{ width: `${item.percentage}%` }}
                      className={`${colors[idx % colors.length]} h-full transition-all duration-500`}
                      title={`${item.label}: ${item.percentage}%`}
                    />
                  );
                })}
              </div>

              {/* Allocation Legend / List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {parsedData.portfolioItems.map((item, idx) => {
                  const colors = ['bg-[#0EB689]', 'bg-[#4F46E5]', 'bg-[#F59E0B]', 'bg-[#EF4444]'];
                  return (
                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                      <span className={`w-3 h-3 rounded-full ${colors[idx % colors.length]} shrink-0`} />
                      <div className="flex justify-between w-full text-sm">
                        <span className="text-gray-600 font-medium">{item.label}</span>
                        {item.percentage && <span className="font-bold text-gray-800">{item.percentage}%</span>}
                      </div>
                    </div>
                  );
                })}
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
  );
}

export default RecommendationCard;
