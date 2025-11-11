import React from 'react';
import { formatDate } from '../utils/dateUtils';

const typeColor = {
  Borrow: 'bg-blue-50 text-blue-700 ring-1 ring-blue-100',
  Return: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
  Register: 'bg-violet-50 text-violet-700 ring-1 ring-violet-100',
};

const RecentActivity = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-gray-500">Belum ada aktivitas terbaru.</div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <ul className="divide-y divide-gray-100">
        {items.map((item) => (
          <li key={item.id} className="py-4 px-4 flex items-start justify-between hover:bg-gray-50 transition">
            <div className="flex items-start gap-3">
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${typeColor[item.type] || 'bg-gray-50 text-gray-700 ring-1 ring-gray-200'}`}>{item.type}</span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.member}</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">{formatDate(item.date)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;