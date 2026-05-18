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
  const content = error || recommendation;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-[#0EB689]/15 mb-4">
      <CoachAvatar />
      {content && (
        <div className={`p-4 rounded-2xl rounded-tl-sm text-[15px] leading-relaxed relative ${error ? 'bg-[#FFF5F5] border border-[#FFEBEB] text-[#5C3D3D]' : 'bg-[#F0F9F6] text-gray-800'}`}>
          <p className="m-0">{content}</p>
        </div>
      )}
    </div>
  );
}

export default RecommendationCard;
