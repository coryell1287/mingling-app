export interface Pa11y {
  documentTitle: string;
  pageUrl: string;
  issues: Issue[];
}

interface Issue {
  code: string;
  type: string;
  typeCode: number;
  message: string;
  context: string;
  selector: string;
  runner: string;
  runnerExtras: RunnerExtra[];
}

interface RunnerExtra {
  description: string;
  impact: string;
  help: string;
  helpUrl: string;
}

export interface Browser {
  name: string;
  family: string;
  channel: string;
  displayName: string;
  version: string;
  majorVersion: number;
  path: string;
  isHeaded: boolean;
  isHeadless: boolean;
}
