import { AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Problem } from '../lib/supabase';

interface ProblemListProps {
  problems: Problem[];
  loading: boolean;
}

const severityConfig = {
  low: {
    icon: AlertCircle,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  medium: {
    icon: AlertTriangle,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
  high: {
    icon: AlertCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
};

export function ProblemList({ problems, loading }: ProblemListProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (problems.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <p className="text-center text-gray-500">No problems recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {problems.map((problem) => {
        const config = severityConfig[problem.severity];
        const Icon = config.icon;

        return (
          <div
            key={problem.id}
            className={`bg-white rounded-lg border ${config.border} p-6`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${config.bg}`}>
                <Icon className={`w-5 h-5 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {problem.title}
                  </h4>
                  {problem.resolved && (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  )}
                  <span className={`ml-auto text-xs font-medium px-2.5 py-0.5 rounded-full ${config.bg} ${config.color}`}>
                    {problem.severity}
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Problem:</p>
                    <p className="text-sm text-gray-600">{problem.description}</p>
                  </div>
                  {problem.solution && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Solution:</p>
                      <p className="text-sm text-gray-600">{problem.solution}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
