
import TheCaseFor from "./TheCaseFor";
import TheCaseAgainst from "./TheCaseAgainst";
import { ArgumentArenaProps } from "@/app/argument/types";

const ArgumentArena = ({aiAnalysis, argumentArenaData}:{aiAnalysis: [string,string], argumentArenaData: ArgumentArenaProps}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-outline-variant/20">
      <TheCaseFor aiForAnalysis={aiAnalysis[0]} argumentArenaData={argumentArenaData}/>
      <TheCaseAgainst aiAgainstAnalysis={aiAnalysis[1]} argumentArenaData={argumentArenaData}/>
    </div>
  );
};

export default ArgumentArena;
