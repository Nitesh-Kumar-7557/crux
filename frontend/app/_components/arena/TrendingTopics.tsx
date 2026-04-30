import TrendingTopicsCard from "./TrendingTopicsCard";
import { TrendingTopicsCardData } from "@/app/types";

const TrendingTopics = ({ data }: { data: TrendingTopicsCardData }) => {
  return (
    <div>
      <h4 className="font-label text-xs uppercase tracking-[0.3em] text-outline mb-6 flex items-center gap-2">
        <span className="w-8 h-px bg-outline-variant"></span>
        Trending Topics
      </h4>
      <div className="space-y-4">
        {data.length > 0 &&
          data.map((e, i) => (
            <TrendingTopicsCard
              key={i}
              topic={e.topic}
              changePercentage={e.changePercentage}
              arguments={e.arguments}
              liveBattles={e.liveBattles}
            />
          ))}
      </div>
    </div>
  );
};

export default TrendingTopics;
