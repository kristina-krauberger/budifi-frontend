import React from 'react';

/**
 * CoachAvatar Component
 * Displays the friendly coach's avatar and name.
 */
function CoachAvatar() {
  return (
    <div className="flex items-center gap-3 mb-3">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Clara - Money Compass Coach"
        className="w-14 h-14 rounded-full object-cover bg-[#E1E8ED] border-[3px] border-[#EAF5F1]"
      />
      <div>
        <h3 className="m-0 text-base text-gray-800 font-bold">Hi, ich bin Clara dein Money Compass Coach</h3>
      </div>
    </div>
  );
}

export default CoachAvatar;
