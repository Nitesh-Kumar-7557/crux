export interface ProfileData {}

export interface UserHeadInfoProps {
  name: string;
  level: string;
  description: string;
  reputation: number;
  globalRank: number;
}

export interface ReputationBreakdownProps {
  data: number[];
}

interface statementData {
  id: number;
  title: string;
}
export type ActiveStatementsProps = statementData[];

export interface DebateHistoryProps {
  date: string;
  result: "win" | "loss";
  inFavour: boolean;
  title: string;
  score: number;
  replayLink: string;
}
