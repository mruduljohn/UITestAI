export type ScenarioStatus = 'Passed' | 'Failed';

export interface Scenario {
  id: string;
  name: string;
  browser: 'Chrome' | 'Safari' | 'Arc';
  startTime: string;
  commentCount: number;
  status: ScenarioStatus;
  errorMessage?: string;
  fixedBy?: 'AI';
}

export interface ScenarioGroup {
  title: string;
  count: number;
  variant: 'default' | 'success' | 'error';
}

export type FilterOption = 'All' | 'Failed only';
export type GroupByOption = 'None' | 'Flows' | 'By failed step'; 