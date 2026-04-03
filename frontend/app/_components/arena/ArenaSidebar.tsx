import TopDebaters from './TopDebaters'
import SystemHealth from './SystemHealth'
import TrendingTopics from './TrendingTopics'
import { SystemHealthData, TopDebatersCardData, TrendingTopicsCardData } from '@/app/types'


// Dummy data
const trendingTopicsData: TrendingTopicsCardData = [
  {
    topic: 'Post-Scarcity Economics',
    changePercentage: 12.4,
    argumnets: 14,
    liveBattles: 8
  },
  {
    topic: 'Post-Scarcity Economics',
    changePercentage: -8.5,
    argumnets: 14,
    liveBattles: 8
  },
  {
    topic: 'Post-Scarcity Economics',
    changePercentage: 12.4,
    argumnets: 14,
    liveBattles: 8
  },
]
const topDebatersData: TopDebatersCardData = [
  {
    rank: 1,
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY5Anp_D4xW6pJE78a2afpLChi3n-4n80CePZRl9k3_YW9rmmoew2pl6257BuP4_E8hZqh9u13uGYgZXQFhwsbwoQwM0JtnQaaLJBih9wYDfaGqm09iQ_YE538pVkDQcQ5bJaEJzREFPAXwM7dkiihuigd-a6g_2sXBdnGbZgtCFBNZD_NE9zLmWe5uqoqow7VHtx5Yp3eQL-KTBAZ4Pfku3J0sGV0VTFF9GDeJ3NFN_V0u5U6ybXJIEN8rTU4PrUeXh2MfvHK2bL6',
    name: 'Nitesh Kumar',
    logicScore: 99.9,
    titles: 15
  },
  {
    rank: 2,
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY5Anp_D4xW6pJE78a2afpLChi3n-4n80CePZRl9k3_YW9rmmoew2pl6257BuP4_E8hZqh9u13uGYgZXQFhwsbwoQwM0JtnQaaLJBih9wYDfaGqm09iQ_YE538pVkDQcQ5bJaEJzREFPAXwM7dkiihuigd-a6g_2sXBdnGbZgtCFBNZD_NE9zLmWe5uqoqow7VHtx5Yp3eQL-KTBAZ4Pfku3J0sGV0VTFF9GDeJ3NFN_V0u5U6ybXJIEN8rTU4PrUeXh2MfvHK2bL6',
    name: 'Nitesh Kumar',
    logicScore: 99.9,
    titles: 15
  },
  {
    rank: 3,
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY5Anp_D4xW6pJE78a2afpLChi3n-4n80CePZRl9k3_YW9rmmoew2pl6257BuP4_E8hZqh9u13uGYgZXQFhwsbwoQwM0JtnQaaLJBih9wYDfaGqm09iQ_YE538pVkDQcQ5bJaEJzREFPAXwM7dkiihuigd-a6g_2sXBdnGbZgtCFBNZD_NE9zLmWe5uqoqow7VHtx5Yp3eQL-KTBAZ4Pfku3J0sGV0VTFF9GDeJ3NFN_V0u5U6ybXJIEN8rTU4PrUeXh2MfvHK2bL6',
    name: 'Nitesh Kumar',
    logicScore: 99.9,
    titles: 15
  },
]
const systemHealthData: SystemHealthData = {
    status: 'nominal',
    logicStacked: 1220,
    activeArenas: 20
}

const ArenaSidebar = () => {
  return (
    <div className='py-10 md:w-[30%]'>
        <TrendingTopics data={trendingTopicsData}/>
        <TopDebaters data={topDebatersData}/>
        <SystemHealth status={systemHealthData.status} logicStacked={systemHealthData.logicStacked} activeArenas={systemHealthData.activeArenas} />
    </div>
  )
}

export default ArenaSidebar