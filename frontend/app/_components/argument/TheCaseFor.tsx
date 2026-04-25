import { ArgumentArenaProps } from "@/app/argument/types";
import UserArgumentCard from "./UserCommentCard";
import { MdMemory } from "react-icons/md";

const TheCaseFor = ({
  argumentArenaData,
  aiForAnalysis,
}: {
  argumentArenaData: ArgumentArenaProps,
  aiForAnalysis: string,
}) => {
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
      <div className="mb-10 relative p-6 bg-[#0a0f12] border border-primary/30 shadow-[0_0_20px_rgba(164,230,255,0.05)]">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="material-symbols-outlined text-primary text-sm"
            data-icon="memory"
          >
            <MdMemory />
          </span>
          <span className="font-label text-[10px] uppercase tracking-[0.15em] text-primary font-bold">
            Crux AI Analysis
          </span>
        </div>
        <p className="min-h-30 font-headline text-lg text-on-surface-variant italic leading-relaxed">
          {aiForAnalysis}
        </p>
      </div>
      <div className="flex flex-col gap-10">
        {argumentArenaData.forCaseComments.map((e, i) => (
          <UserArgumentCard
            key={i}
            side={e.side}
            reputation={e.reputation}
            username={e.username}
            grade={e.grade}
            comment={e.comment}
            likes={e.likes}
            user_id={e.user_id}
            comment_id={e.comment_id}
          />
        ))}
      </div>
    </div>
  );
};

export default TheCaseFor;
