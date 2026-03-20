import { ArrowRight, Circle } from 'lucide-react';

interface FlowStep {
  id: string;
  number: number;
  name: string;
  description: string;
  status: 'completed' | 'in_progress' | 'planned';
  order: number;
}

interface DataFlowProps {
  steps: FlowStep[];
  loading: boolean;
}

const statusConfig = {
  completed: {
    circle: 'bg-green-500 border-green-500',
    text: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  in_progress: {
    circle: 'bg-orange-500 border-orange-500',
    text: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
  planned: {
    circle: 'bg-gray-300 border-gray-300',
    text: 'text-gray-600',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
  },
};

export function DataFlow({ steps, loading }: DataFlowProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  const sortedSteps = [...steps].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Data Flow Pipeline</h3>

      <div className="overflow-x-auto pb-4">
        <div className="flex items-center gap-2 min-w-max">
          {sortedSteps.map((step, index) => {
            const config = statusConfig[step.status];

            return (
              <div key={step.id} className="flex items-center gap-2">
                <div className={`flex-shrink-0 ${config.bg} rounded-lg border ${config.border} p-3 min-w-max`}>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full border-2 ${config.circle} flex items-center justify-center text-white text-sm font-bold mb-2`}>
                      {step.number}
                    </div>
                    <p className={`font-medium text-xs text-center ${config.text}`}>
                      {step.name}
                    </p>
                  </div>
                </div>

                {index < sortedSteps.length - 1 && (
                  <div className="flex-shrink-0 -mx-1">
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-xs text-amber-900 mb-2">
          <span className="font-semibold">Pipeline Overview:</span>
        </p>
        <ul className="text-xs text-amber-800 space-y-1">
          {sortedSteps.map((step) => (
            <li key={step.id} className="flex gap-2">
              <span className="font-medium min-w-fit">{step.number}. {step.name}:</span>
              <span>{step.description}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
        <div className="p-2 bg-green-50 rounded-lg border border-green-200">
          <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-1"></div>
          <p className="text-green-700 font-medium">Completed</p>
        </div>
        <div className="p-2 bg-orange-50 rounded-lg border border-orange-200">
          <div className="w-3 h-3 rounded-full bg-orange-500 mx-auto mb-1"></div>
          <p className="text-orange-700 font-medium">In Progress</p>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
          <div className="w-3 h-3 rounded-full bg-gray-300 mx-auto mb-1"></div>
          <p className="text-gray-700 font-medium">Planned</p>
        </div>
      </div>
    </div>
  );
}
