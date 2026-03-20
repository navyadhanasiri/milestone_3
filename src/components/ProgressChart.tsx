import { Module } from '../lib/supabase';

interface ProgressChartProps {
  modules: Module[];
}

export function ProgressChart({ modules }: ProgressChartProps) {
  const completed = modules.filter((m) => m.status === 'completed').length;
  const inProgress = modules.filter((m) => m.status === 'in_progress').length;
  const planned = modules.filter((m) => m.status === 'planned').length;
  const total = modules.length;

  const completedPercent = total > 0 ? (completed / total) * 100 : 0;
  const inProgressPercent = total > 0 ? (inProgress / total) * 100 : 0;
  const plannedPercent = total > 0 ? (planned / total) * 100 : 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Progress Overview
      </h3>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Completion</span>
          <span className="text-sm font-bold text-gray-900">
            {completedPercent.toFixed(0)}%
          </span>
        </div>
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full flex">
            <div
              className="bg-green-500 transition-all duration-500"
              style={{ width: `${completedPercent}%` }}
            />
            <div
              className="bg-orange-400 transition-all duration-500"
              style={{ width: `${inProgressPercent}%` }}
            />
            <div
              className="bg-gray-300 transition-all duration-500"
              style={{ width: `${plannedPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">{completed}</div>
          <div className="text-xs text-gray-600 mt-1">Completed</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">{inProgress}</div>
          <div className="text-xs text-gray-600 mt-1">In Progress</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-600">{planned}</div>
          <div className="text-xs text-gray-600 mt-1">Planned</div>
        </div>
      </div>
    </div>
  );
}
