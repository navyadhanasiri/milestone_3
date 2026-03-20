import { ArrowDown } from 'lucide-react';

interface Layer {
  id: string;
  name: string;
  description: string;
  technologies: string;
  status: 'completed' | 'in_progress' | 'planned';
  order: number;
}

interface ArchitectureDiagramProps {
  layers: Layer[];
  loading: boolean;
}

const statusStyles = {
  completed: 'bg-green-50 border-green-300 text-green-900',
  in_progress: 'bg-orange-50 border-orange-300 text-orange-900',
  planned: 'bg-gray-50 border-gray-300 text-gray-900',
};

const statusBadge = {
  completed: 'bg-green-100 text-green-800',
  in_progress: 'bg-orange-100 text-orange-800',
  planned: 'bg-gray-100 text-gray-800',
};

export function ArchitectureDiagram({ layers, loading }: ArchitectureDiagramProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  const sortedLayers = [...layers].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">System Architecture</h3>

      <div className="flex flex-col items-center gap-4">
        {sortedLayers.map((layer, index) => (
          <div key={layer.id} className="w-full max-w-2xl">
            <div className={`border-2 rounded-lg p-4 ${statusStyles[layer.status]}`}>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{layer.name}</h4>
                  <p className="text-xs mt-1 opacity-75">{layer.description}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusBadge[layer.status]}`}>
                  {layer.status === 'in_progress' ? 'In Progress' : layer.status.charAt(0).toUpperCase() + layer.status.slice(1)}
                </span>
              </div>
              <div className="text-xs font-medium opacity-75">
                {layer.technologies}
              </div>
            </div>

            {index < sortedLayers.length - 1 && (
              <div className="flex justify-center py-2">
                <ArrowDown className="w-5 h-5 text-gray-400" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-900">
          <span className="font-semibold">System Overview:</span> The architecture follows a layered approach from input capture through visualization, enabling modular development and testing of each component independently.
        </p>
      </div>
    </div>
  );
}
