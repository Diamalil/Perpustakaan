import React from 'react';

const Charts = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return <div className="text-gray-500 text-center py-8">Belum ada data grafik.</div>;
  }

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="w-full">
      <div className="flex items-end justify-center space-x-4 h-48 mb-4">
        {data.map((d) => {
          const height = Math.round((d.value / maxValue) * 180); // px
          const percentage = Math.round((d.value / maxValue) * 100);
          return (
            <div key={d.month} className="flex flex-col items-center group cursor-pointer">
              <div className="relative">
                <div
                  className="w-8 bg-gradient-to-top from-blue-600 to-blue-400 rounded-t-lg shadow-sm hover:from-blue-700 hover:to-blue-500 transition-all duration-200 hover:shadow-md"
                  style={{ height: `${height}px` }}
                  title={`${d.month}: ${d.value} peminjaman`}
                />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {d.value} peminjaman
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-700 mt-2 font-medium">{d.month}</span>
              <span className="text-xs text-gray-500">{percentage}%</span>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <div className="text-sm text-gray-600 font-medium mb-1">Grafik Peminjaman Bulanan</div>
        <div className="text-xs text-gray-500">Data peminjaman buku per bulan selama setahun</div>
      </div>
    </div>
  );
};

export default Charts;