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


// const ActiveArguments = async() => {
  const ActiveArguments = ({liveArenaCardData,trendingCardData}:{liveArenaCardData: LiveArenaCardData; trendingCardData: TrendingCardData;}) => {
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
            <LiveArenaCard key={i} domain={e.domain} username={e.username} title={e.title} argumentNum={e.argumentNum} aiMatchQuality={e.aiMatchQuality} affermativeScore={e.affermativeScore} negativeScore={e.negativeScore} numOfUsers={e.numOfUsers} argumentId={e.argumentId}/>
          ))}
          <div className="mb-5 md:flex md:flex-wrap md:justify-between">
            {trendingCardData.map((e,i)=> i !== 0 && (
              <TrendingCard key={i} username={e.username} domain={e.domain} title={e.title} affirmativescore={e.affirmativescore} negativescore={e.negativescore} argumentid={e.argumentid} />
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
