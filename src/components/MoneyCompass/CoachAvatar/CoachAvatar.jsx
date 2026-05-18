import React from 'react';

/**
 * CoachAvatar Component
 * Displays the friendly coach's avatar and name.
 */
function CoachAvatar() {
  return (
    <div className="flex items-center gap-4 mb-4">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Clara - Money Compass Coach"
        className="w-16 h-16 rounded-full object-cover bg-[#E1E8ED] border-[3px] border-[#EAF5F1]"
      />
      <div>
        <h3 className="m-0 text-lg text-gray-800 font-bold">Hi, ich bin Clara dein Money Compass Coach</h3>
      </div>
    </div>
  );
}

export default CoachAvatar;
