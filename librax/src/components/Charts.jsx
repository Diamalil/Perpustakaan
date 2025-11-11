import React from 'react';

const Charts = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return <div className="text-gray-500">Belum ada data grafik.</div>;
  }

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const avgValue = Math.round(
    data.reduce((sum, d) => sum + d.value, 0) / data.length
  );
  const ticks = [0.25, 0.5, 0.75, 1];
  const scalePx = 180; // tinggi area batang (px)

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">Peminjaman per bulan</span>
        <span className="text-xs text-gray-400">Maks: {maxValue} • Rata-rata: {avgValue}</span>
      </div>
      <div className="relative h-56">
        {/* Gridlines */}
        {ticks.map((t, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 border-t border-dashed border-gray-200"
            style={{ bottom: `${t * 100}%` }}
          />
        ))}

        {/* Garis rata-rata */}
        <div
          className="absolute left-0 right-0 border-t border-rose-300"
          style={{ bottom: `${(avgValue / maxValue) * 100}%` }}
        >
          <span className="absolute -top-2 right-0 text-[10px] text-rose-400 bg-white/70 px-1">
            Rata-rata
          </span>
        </div>

        {/* Batang */}
        <div className="absolute left-0 right-0 bottom-0 flex items-end gap-2 sm:gap-3 md:gap-4 border-b border-gray-200 pb-3">
          {data.map((d) => {
            const height = Math.round((d.value / maxValue) * scalePx);
            return (
              <div key={d.month} className="flex flex-col items-center">
                <span className="text-[10px] text-gray-500 mb-1">{d.value}</span>
                <div
                  className="w-6 sm:w-7 md:w-8 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md hover:from-indigo-700 hover:to-indigo-500 transition"
                  style={{ height }}
                  title={`${d.month}: ${d.value}`}
                />
                <span className="text-[11px] text-gray-600 mt-2">{d.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Charts;