
export interface LiveArenaCardProps {
    title: string;
    argumentNum: number;
    aiMatchQuality: 'low' | 'medium' | 'high';
    affermativeScore: number;
    negativeScore: number;
    numOfUsers: number;
    argumentId: string;
}
export type LiveArenaCardData = LiveArenaCardProps[]


export interface TrendingCardProps {
    category: string;
    title: string;
    affermativeScore: number;
    negativeScore: number;
    activeMinds: number;
    argumentId: string;
}
export type TrendingCardData = TrendingCardProps[]


export interface TrendingTopicsCardProps {
    topic: string;
    changePercentage: number;
    argumnets: number;
    liveBattles: number;
}
export type TrendingTopicsCardData = TrendingTopicsCardProps[]


export interface TopDebatersCardProps {
    rank: number;
    avatar_url: string;
    name: string;
    logicScore: number;
    titles: number;
}
export type TopDebatersCardData = TopDebatersCardProps[]


export interface SystemHealthData {
    status: 'nominal' | 'bad';
    logicStacked: number;
    activeArenas: number;
}