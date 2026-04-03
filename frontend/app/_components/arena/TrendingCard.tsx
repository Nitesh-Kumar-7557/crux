
import { TrendingCardProps } from "@/app/types";
import { Newsreader } from "next/font/google";
import Link from "next/link";

const newsreader = Newsreader({
  subsets: ["latin"],
});



const TrendingCard = ({category,title,affermativeScore,negativeScore,activeMinds,argumentId}:TrendingCardProps) => {


  return (
    <div className="bg-surface-container-low cursor-pointer md:w-[49%] mt-5 p-6 border-l-2 border-outline-variant/30 hover:border-primary transition-all"><Link href={`/argument/${argumentId}`}>
      <span className="font-label text-[10px] text-tertiary uppercase tracking-widest mb-3 block">
        {category}
      </span>
      <h3 className={`${newsreader.className} text-xl mb-4`}>
        "{title}"
      </h3>
      <div className="h-2 w-full bg-surface-container-highest flex mb-4">
        <div className={`h-full bg-primary-container`} style={{width: `${affermativeScore}%`}}></div>
        <div className={`h-full bg-secondary-container`} style={{width: `${negativeScore}%`}}></div>
      </div>
      <div className="flex justify-between items-center font-label text-[10px] text-outline uppercase tracking-widest">
        <span>{activeMinds} Active Minds</span>
        {affermativeScore > negativeScore ? (
          <span className="text-primary-container">{affermativeScore}% Favor</span>
        ):(
          <span className="text-secondary-container">{negativeScore}% Against</span>
        )}
      </div>
    </Link></div>
  );
};

export default TrendingCard;
