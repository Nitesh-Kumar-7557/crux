import ActiveStatements from "../_components/profile/ActiveStatements"
import Challenge from "../_components/profile/Challenge"
import DebateHistory from "../_components/profile/DebateHistory"
import ReputationBreakdown from "../_components/profile/ReputationBreakdown"
import UserHeadInfo from "../_components/profile/UserHeadInfo"

// Types
import type { ActiveStatementsProps, DebateHistoryProps, ReputationBreakdownProps, UserHeadInfoProps } from "./types"


// function levelConverter(){}


// Dummy Data
const userHeadInfo: UserHeadInfoProps = {
  name: "Nitesh Kumar",
  level: "Pro level IV",
  description: "Specializing in geopolitical ethics and existential risk analysis. Maintaining a 78% logical consistency rating across 142 sanctioned debates.",
  reputation: 2840,
  globalRank: 142
}
const reputationBreakdownData: ReputationBreakdownProps = {
  data: [40,55,48,72,90,78,85,70,60,65],
  logicScore: 50,
  citationRatio: "1:2.5",
  fallacyRate: 0.08
}
const activeStatementsData: ActiveStatementsProps = {
  sanctionedData: [
    {
      id: 882,
      title: 'Autonomous systems require a universal kill-switch mandate by 2030.'
    }
  ],
  provisionalData: [
    {
      id: 104,
      title: 'Universal basic income is the only deterrent for socio-economic collapse.'
    },
    {
      id: 104,
      title: 'Universal basic income is the only deterrent for socio-economic collapse.'
    },
    {
      id: 104,
      title: 'Universal basic income is the only deterrent for socio-economic collapse.'
    }
  ]
}
const debateHistoryData: DebateHistoryProps[] = [
  {
    date: "OCT 12, 2024",
    result: 'win',
    inFavour: false,
    title: "The Ethics of Genetic Splicing in Industrial Agriculture",
    score: 88,
    replayLink: ''
  },
  {
    date: "OCT 12, 2024",
    result: 'loss',
    inFavour: true,
    title: "The Ethics of Genetic Splicing in Industrial Agriculture",
    score: 44,
    replayLink: ''
  },
  {
    date: "OCT 12, 2024",
    result: 'win',
    inFavour: true,
    title: "The Ethics of Genetic Splicing in Industrial Agriculture",
    score: 75,
    replayLink: ''
  },
  {
    date: "OCT 12, 2024",
    result: 'loss',
    inFavour: true,
    title: "The Ethics of Genetic Splicing in Industrial Agriculture",
    score: 35,
    replayLink: ''
  },
]


const Profile = () => {
  return (
    <div className="px-8 py-6">
      <UserHeadInfo name={userHeadInfo.name} level={userHeadInfo.level} description={userHeadInfo.description} reputation={userHeadInfo.reputation} globalRank={userHeadInfo.globalRank}/>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <ReputationBreakdown data={reputationBreakdownData.data} logicScore={reputationBreakdownData.logicScore} citationRatio={reputationBreakdownData.citationRatio} fallacyRate={reputationBreakdownData.fallacyRate}/>
        <ActiveStatements sanctionedData={activeStatementsData.sanctionedData} provisionalData={activeStatementsData.provisionalData} />
      </div>
      <DebateHistory debateHistoryData={debateHistoryData}/>
      <Challenge/>
    </div>
  )
}

export default Profile