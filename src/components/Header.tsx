import { Calendar, Github } from 'lucide-react';
import { ProjectInfo } from '../lib/supabase';

interface HeaderProps {
  projectInfo: ProjectInfo | null;
}

export function Header({ projectInfo }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {projectInfo?.project_name || 'Milestone 3 Status Report'}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Development Progress Tracking System
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {projectInfo?.repository_url && (
              <a
                href={projectInfo.repository_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Github className="w-4 h-4 mr-2" />
                Repository
              </a>
            )}
            {projectInfo?.due_date && (
              <div className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white">
                <Calendar className="w-4 h-4 mr-2" />
                Due: {new Date(projectInfo.due_date).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
