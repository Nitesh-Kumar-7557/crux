

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
    logicScore: number;
    citationRatio: string;
    fallacyRate: number;
}


interface statementData {
    id: number;
    title: string;
}
export interface ActiveStatementsProps {
    sanctionedData: statementData[];
    provisionalData: statementData[];
}


export interface DebateHistoryProps {
    date: string;
    result: 'win' | 'loss';
    inFavour: boolean;
    title: string;
    score: number;
    replayLink: string;
}