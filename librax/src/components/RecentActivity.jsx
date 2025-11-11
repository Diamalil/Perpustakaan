import React from 'react';
import { formatDate } from '../utils/dateUtils';

const typeColor = {
  Borrow: 'bg-blue-100 text-blue-700',
  Return: 'bg-green-100 text-green-700',
  Register: 'bg-purple-100 text-purple-700',
};

const RecentActivity = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-gray-500">Belum ada aktivitas terbaru.</div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100">
      {items.map((item) => (
        <li key={item.id} className="py-3 flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <span className={`px-2 py-1 rounded text-xs font-medium ${typeColor[item.type] || 'bg-gray-100 text-gray-700'}`}>{item.type}</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">{item.title}</p>
              <p className="text-xs text-gray-500">{item.member}</p>
            </div>
          </div>
          <div className="text-xs text-gray-500">{formatDate(item.date)}</div>
        </li>
      ))}
    </ul>
  );
};

export default RecentActivity;