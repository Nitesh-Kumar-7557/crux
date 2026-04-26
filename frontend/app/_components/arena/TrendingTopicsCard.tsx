import { TrendingTopicsCardProps } from "@/app/types";

const TrendingTopicsCard = ({topic,changePercentage,arguments: argumentsCount,liveBattles}:TrendingTopicsCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="flex justify-between items-start mb-1">
        <span className="font-body capitalize text-sm font-bold group-hover:text-primary transition-colors">
          {topic}
        </span>
        <span className={`font-label text-[10px] ${changePercentage >= 0 ? 'text-primary-container bg-primary-container/10':'text-secondary-container bg-secondary-container/10'} px-1.5`}>
          {changePercentage > 0 ? `+${changePercentage}` : changePercentage }%
        </span>
      </div>
      <div className="text-[10px] font-label text-outline uppercase tracking-widest">
        {argumentsCount} Arguments • {liveBattles} Live Battles
      </div>
    </div>
  );
};

export default TrendingTopicsCard;
