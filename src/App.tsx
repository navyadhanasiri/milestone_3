import { CheckCircle2, Clock, AlertTriangle, GitCommitVertical as GitCommit } from 'lucide-react';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { ModuleList } from './components/ModuleList';
import { ProblemList } from './components/ProblemList';
import { CommitHistory } from './components/CommitHistory';
import { ProgressChart } from './components/ProgressChart';
import { useModules, useProblems, useCommits, useProjectInfo } from './hooks/useProjectData';

function App() {
  const { modules, loading: modulesLoading } = useModules();
  const { problems, loading: problemsLoading } = useProblems();
  const { commits, loading: commitsLoading } = useCommits();
  const { projectInfo } = useProjectInfo();

  const completedModules = modules.filter((m) => m.status === 'completed').length;
  const inProgressModules = modules.filter((m) => m.status === 'in_progress').length;
  const resolvedProblems = problems.filter((p) => p.resolved).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header projectInfo={projectInfo} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Completed Modules"
            value={completedModules}
            icon={CheckCircle2}
            subtitle={`${modules.length} total modules`}
            color="green"
          />
          <StatsCard
            title="In Progress"
            value={inProgressModules}
            icon={Clock}
            subtitle="Currently developing"
            color="orange"
          />
          <StatsCard
            title="Problems Resolved"
            value={`${resolvedProblems}/${problems.length}`}
            icon={AlertTriangle}
            subtitle="Technical challenges"
            color="blue"
          />
          <StatsCard
            title="Total Commits"
            value={commits.length}
            icon={GitCommit}
            subtitle="Development activity"
            color="blue"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Implemented Modules
            </h2>
            <ModuleList modules={modules} loading={modulesLoading} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Progress Metrics
            </h2>
            <ProgressChart modules={modules} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Development Activity
            </h2>
            <CommitHistory commits={commits} loading={commitsLoading} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Problems & Solutions
            </h2>
            <ProblemList problems={problems} loading={problemsLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
