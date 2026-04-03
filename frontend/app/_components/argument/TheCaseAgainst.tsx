
import { ArgumentArenaProps } from "@/app/argument/types";
import UserArgumentCard from "./UserArgumentCard";

const TheCaseAgainst = ({argumentArenaData}:{argumentArenaData: ArgumentArenaProps}) => {
  return (
    <div className="bg-background lg:pl-12 py-8 border-t lg:border-t-0 lg:border-l border-outline-variant/20">
      <div className="flex items-center justify-between mb-10 border-l-4 border-secondary pl-4">
        <h2 className="font-label uppercase tracking-[0.3em] text-xl font-bold text-secondary">
          The Case Against
        </h2>
        <span className="font-label text-xs text-outline italic">
          {argumentArenaData.againstArgumentsCount} Arguments
        </span>
      </div>
      <div className="flex flex-col gap-10">
        {argumentArenaData.againstCaseComments.map((e,i)=>(
          <UserArgumentCard key={i} side={e.side} reputation={e.reputation} username={e.username} grade={e.grade} comment={e.comment} likes={e.likes}/>
        ))}
      </div>
    </div>
  );
};

export default TheCaseAgainst;
