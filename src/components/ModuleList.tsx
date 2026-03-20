import { CheckCircle2, Clock, Circle } from 'lucide-react';
import { Module } from '../lib/supabase';

interface ModuleListProps {
  modules: Module[];
  loading: boolean;
}

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    label: 'Completed',
  },
  in_progress: {
    icon: Clock,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    label: 'In Progress',
  },
  planned: {
    icon: Circle,
    color: 'text-gray-400',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    label: 'Planned',
  },
};

export function ModuleList({ modules, loading }: ModuleListProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  const groupedModules = {
    completed: modules.filter((m) => m.status === 'completed'),
    in_progress: modules.filter((m) => m.status === 'in_progress'),
    planned: modules.filter((m) => m.status === 'planned'),
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedModules).map(([status, statusModules]) => {
        const config = statusConfig[status as keyof typeof statusConfig];
        const Icon = config.icon;

        if (statusModules.length === 0) return null;

        return (
          <div key={status} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon className={`w-5 h-5 ${config.color}`} />
              <h3 className="text-lg font-semibold text-gray-900">
                {config.label}
              </h3>
              <span className="ml-auto text-sm font-medium text-gray-500">
                {statusModules.length} module{statusModules.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="space-y-3">
              {statusModules.map((module) => (
                <div
                  key={module.id}
                  className={`p-4 rounded-lg border ${config.border} ${config.bg}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{module.name}</h4>
                      <p className="mt-1 text-sm text-gray-600">{module.description}</p>
                      <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {module.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
