"use client";
import LiveArenaCard from "./LiveArenaCard";
import TrendingCard from "./TrendingCard";
import ThesisCard from "./ThesisCard";
import ActiveArgumentsNavbar from "./ActiveArgumentsNavbar";
import { useState } from "react";
import NewestTab from "./NewestTab";
import HighStakesTab from "./HighStakesTab";
import { LiveArenaCardData, TrendingCardData } from "@/app/types";


const tabList = ["trending", "newest", "high stakes"];

// dummy Data
const liveArenaCardData: LiveArenaCardData = [
  {
    title: "AI is the final evolution of human artistry.",
    argumentNum: 243,
    aiMatchQuality: 'high',
    affermativeScore: 20,
    negativeScore: 80,
    numOfUsers: 18,
    argumentId: 'CRX-1108-A'
  }
]
const trendingCardData: TrendingCardData = [
  {
    category: 'Political Science',
    title: 'Decentralized governance is the only cure for institutional rot.',
    affermativeScore: 70,
    negativeScore: 30,
    activeMinds: 89,
    argumentId: "CRX-1010-B"
  },
  {
    category: 'Political Science',
    title: 'Decentralized governance is the only cure for institutional rot.',
    affermativeScore: 70,
    negativeScore: 30,
    activeMinds: 89,
    argumentId: "CRX-1020-A"
  },
]

const ActiveArguments = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const changeActive = (e: string) => {
    setActiveTab(e);
  };
  return (
    <div>
      <ActiveArgumentsNavbar
        tabList={tabList}
        active={activeTab}
        changeActive={changeActive}
      />
      {activeTab === "trending" && (
        <div>
          {liveArenaCardData.map((e,i)=>(
            <LiveArenaCard key={i} title={e.title} argumentNum={e.argumentNum} aiMatchQuality={e.aiMatchQuality} affermativeScore={e.affermativeScore} negativeScore={e.negativeScore} numOfUsers={e.numOfUsers} argumentId={e.argumentId}/>
          ))}
          <div className="mb-5 md:flex md:flex-wrap md:justify-between">
            {trendingCardData.map((e,i)=>(
              <TrendingCard key={i} category={e.category} title={e.title} affermativeScore={e.affermativeScore} negativeScore={e.negativeScore} activeMinds={e.activeMinds} argumentId={e.argumentId} />
            ))}
          </div>
          <ThesisCard />
        </div>
      )}
      {activeTab === "newest" && (
        <NewestTab/>
      )}
      {activeTab === "high stakes" && (
        <HighStakesTab/>
      )}
    </div>
  );
};

export default ActiveArguments;
