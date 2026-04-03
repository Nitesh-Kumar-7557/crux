
import TheCaseFor from "./TheCaseFor";
import TheCaseAgainst from "./TheCaseAgainst";
import { ArgumentArenaProps } from "@/app/argument/types";

const ArgumentArena = ({argumentArenaData}:{argumentArenaData: ArgumentArenaProps}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-outline-variant/20">
      <TheCaseFor argumentArenaData={argumentArenaData}/>
      <TheCaseAgainst argumentArenaData={argumentArenaData}/>
    </div>
  );
};

export default ArgumentArena;
