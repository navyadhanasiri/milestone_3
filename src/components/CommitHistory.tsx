import { GitCommitVertical as GitCommit, FileText } from 'lucide-react';
import { Commit } from '../lib/supabase';

interface CommitHistoryProps {
  commits: Commit[];
  loading: boolean;
}

export function CommitHistory({ commits, loading }: CommitHistoryProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (commits.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <p className="text-center text-gray-500">No commits recorded yet.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="space-y-4">
        {commits.map((commit, index) => (
          <div key={commit.id} className="relative">
            {index !== commits.length - 1 && (
              <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200" />
            )}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center relative z-10">
                <GitCommit className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{commit.message}</h4>
                    {commit.description && (
                      <p className="mt-1 text-sm text-gray-600">{commit.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2">
                      <span className="inline-flex items-center text-xs text-gray-500">
                        <FileText className="w-3 h-3 mr-1" />
                        {commit.files_changed} file{commit.files_changed !== 1 ? 's' : ''} changed
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(commit.commit_date)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
