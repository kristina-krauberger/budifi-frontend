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
    <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#EAF5F1] mb-6">
      <CoachAvatar />
      {content && (
        <div className={`p-5 rounded-2xl rounded-tl-sm text-base leading-relaxed relative ${error ? 'bg-[#FFF5F5] border border-[#FFEBEB] text-[#5C3D3D]' : 'bg-[#F0F9F6] text-gray-800'}`}>
          <p className="m-0">{content}</p>
        </div>
      )}
    </div>
  );
}

export default RecommendationCard;
