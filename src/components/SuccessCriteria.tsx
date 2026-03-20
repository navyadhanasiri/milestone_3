import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface Criterion {
  id: string;
  number: number;
  description: string;
  targetValue: string;
  currentProgress: string;
  status: 'pending' | 'in_progress' | 'completed';
}

interface SuccessCriteriaProps {
  criteria: Criterion[];
  loading: boolean;
}

const statusConfig = {
  pending: {
    icon: AlertCircle,
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
  },
  in_progress: {
    icon: Clock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  completed: {
    icon: CheckCircle2,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
};

export function SuccessCriteria({ criteria, loading }: SuccessCriteriaProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  const completedCount = criteria.filter((c) => c.status === 'completed').length;
  const completionPercentage = Math.round((completedCount / criteria.length) * 100);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Criteria</h3>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-gray-900">{completionPercentage}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {criteria.map((criterion) => {
          const config = statusConfig[criterion.status];
          const Icon = config.icon;

          return (
            <div
              key={criterion.id}
              className={`p-4 rounded-lg border border-gray-200 ${config.bgColor} transition-colors`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 ${config.color} flex-shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-medium text-gray-900 text-sm">
                      {criterion.number}. {criterion.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                    <span className="font-medium">Target: {criterion.targetValue}</span>
                    <span className="text-gray-400">•</span>
                    <span>Progress: {criterion.currentProgress}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <p className="text-xs text-indigo-900">
          <span className="font-semibold">Target Metrics:</span> These criteria define project success and are monitored throughout development to ensure the system meets all technical requirements.
        </p>
      </div>
    </div>
  );
}
