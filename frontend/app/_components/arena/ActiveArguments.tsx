"use client";
import LiveArenaCard from "./MainTrendingArenaCard";
import ThesisCard from "./ThesisCard";
import ActiveArgumentsNavbar from "./ActiveArgumentsNavbar";
import { useState } from "react";
import NewestTab from "./NewestTab";
import HighStakesTab from "./HighStakesTab";
import { MainTrendingArenaCardData, TrendingArenaCardData } from "@/app/types";
import TrendingArenaCard from "./TrendingArenaCard";

const tabList = ["trending", "newest"];     // for future: "high stakes"

const ActiveArguments = ({
  mainTrendingArenaCardData,
  trendingArenaCardData,
}: {
  mainTrendingArenaCardData: MainTrendingArenaCardData;
  trendingArenaCardData: TrendingArenaCardData;
}) => {
  const [activeTab, setActiveTab] = useState("trending");
  const hasAnyTrendingData =
    mainTrendingArenaCardData.length > 0 || trendingArenaCardData.length > 0;

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
      {activeTab === "trending" &&
        (hasAnyTrendingData ? (
          <div>
            {mainTrendingArenaCardData.map((e, i) => (
              <LiveArenaCard
                key={i}
                domain={e.domain}
                username={e.username}
                title={e.title}
                argumentNum={e.argumentNum}
                argumentQuality={e.argumentQuality}
                affermativeScore={e.affermativeScore}
                negativeScore={e.negativeScore}
                numOfUsers={e.numOfUsers}
                argumentId={e.argumentId}
              />
            ))}
            <div className="mb-5 md:flex md:flex-wrap md:justify-between">
              {trendingArenaCardData.map(
                (e, i) =>
                  (mainTrendingArenaCardData.length === 0 || i !== 0) && (
                    <TrendingArenaCard
                      key={i}
                      username={e.username}
                      domain={e.domain}
                      title={e.title}
                      affirmativescore={e.affirmativescore}
                      negativescore={e.negativescore}
                      argumentid={e.argumentid}
                      active_minds={e.active_minds}
                    />
                  ),
              )}
            </div>
            <ThesisCard />
          </div>
        ) : (
          <div><ThesisCard /></div>
        ))}
      {activeTab === "newest" && <NewestTab />}
      {activeTab === "high stakes" && <HighStakesTab />}
    </div>
  );
};

export default ActiveArguments;
