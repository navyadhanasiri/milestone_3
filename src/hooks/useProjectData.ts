import { useEffect, useState } from 'react';
import { supabase, Module, Problem, Commit, ProjectInfo } from '../lib/supabase';

export function useModules() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, []);

  async function fetchModules() {
    setLoading(true);
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data) {
      setModules(data);
    }
    setLoading(false);
  }

  return { modules, loading, refetch: fetchModules };
}

export function useProblems() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblems();
  }, []);

  async function fetchProblems() {
    setLoading(true);
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data) {
      setProblems(data);
    }
    setLoading(false);
  }

  return { problems, loading, refetch: fetchProblems };
}

export function useCommits() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommits();
  }, []);

  async function fetchCommits() {
    setLoading(true);
    const { data, error } = await supabase
      .from('commits')
      .select('*')
      .order('commit_date', { ascending: false });

    if (!error && data) {
      setCommits(data);
    }
    setLoading(false);
  }

  return { commits, loading, refetch: fetchCommits };
}

export function useProjectInfo() {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectInfo();
  }, []);

  async function fetchProjectInfo() {
    setLoading(true);
    const { data, error } = await supabase
      .from('project_info')
      .select('*')
      .maybeSingle();

    if (!error && data) {
      setProjectInfo(data);
    }
    setLoading(false);
  }

  return { projectInfo, loading, refetch: fetchProjectInfo };
}
