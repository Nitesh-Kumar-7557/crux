import { TopDebatersCardData } from "@/app/types"
import TopDebatersCard from "./TopDebatersCard"
import Link from "next/link"


const TopDebaters = ({data}:{data: TopDebatersCardData}) => {
  return (
    <div className='mt-10'>
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-label text-xs uppercase tracking-[0.3em] text-outline flex items-center gap-2">
              <span className="w-8 h-px bg-outline-variant"></span>
              Top Debaters
            </h4>
            <Link href={'/leaderboard'} className="font-label text-[10px] text-primary uppercase tracking-widest hover:underline">Full Standings</Link>
          </div>
          <div className="space-y-2">
            {data.map((e,i)=>(
              <TopDebatersCard key={i} rank={i + 1} avatar_url={'https://lh3.googleusercontent.com/aida-public/AB6AXuDY5Anp_D4xW6pJE78a2afpLChi3n-4n80CePZRl9k3_YW9rmmoew2pl6257BuP4_E8hZqh9u13uGYgZXQFhwsbwoQwM0JtnQaaLJBih9wYDfaGqm09iQ_YE538pVkDQcQ5bJaEJzREFPAXwM7dkiihuigd-a6g_2sXBdnGbZgtCFBNZD_NE9zLmWe5uqoqow7VHtx5Yp3eQL-KTBAZ4Pfku3J0sGV0VTFF9GDeJ3NFN_V0u5U6ybXJIEN8rTU4PrUeXh2MfvHK2bL6'} name={e.name} logicScore={e.logicScore}/>
            ))}
          </div>
        </div>
  )
}

export default TopDebaters