import React from 'react';

const colorMap = {
  blue: {
    iconBg: 'bg-blue-50 text-blue-600',
    ring: 'ring-blue-100',
  },
  emerald: {
    iconBg: 'bg-emerald-50 text-emerald-600',
    ring: 'ring-emerald-100',
  },
  amber: {
    iconBg: 'bg-amber-50 text-amber-600',
    ring: 'ring-amber-100',
  },
  rose: {
    iconBg: 'bg-rose-50 text-rose-600',
    ring: 'ring-rose-100',
  },
};

const StatsCard = ({ icon, label, value, color = 'blue' }) => {
  const styles = colorMap[color] || colorMap.blue;
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition ring-1 ${styles.ring}`}>
      <div className={`h-12 w-12 rounded-lg flex items-center justify-center text-2xl ${styles.iconBg}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;