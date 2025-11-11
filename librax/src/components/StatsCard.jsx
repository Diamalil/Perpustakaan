import React from 'react';

const StatsCard = ({ icon, label, value, bgColor = 'bg-white' }) => {
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-md flex items-center space-x-4`}>
      <div className="text-4xl">{icon}</div>
      <div>
        <p className="text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;