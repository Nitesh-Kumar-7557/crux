import { ArgumentArenaProps} from "@/app/argument/types";
import UserArgumentCard from "./UserArgumentCard";

const TheCaseFor = ({argumentArenaData}:{argumentArenaData: ArgumentArenaProps}) => {
  return (
    <div className="bg-background lg:pr-12 py-8">
      <div className="flex items-center justify-between mb-10 border-l-4 border-primary pl-4">
        <h2 className="font-label uppercase tracking-[0.3em] text-xl font-bold text-primary">
          The Case For
        </h2>
        <span className="font-label text-xs text-outline italic">
          {argumentArenaData.forArgumentsCount} Arguments
        </span>
      </div>
      <div className="flex flex-col gap-10">
        {argumentArenaData.forCaseComments.map((e,i)=>(
          <UserArgumentCard key={i} side={e.side} reputation={e.reputation} username={e.username} grade={e.grade} comment={e.comment} likes={e.likes}/>
        ))}
      </div>
    </div>
  );
};

export default TheCaseFor;
