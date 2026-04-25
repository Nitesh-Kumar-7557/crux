import { ArgumentArenaProps } from "@/app/argument/types";
import UserArgumentCard from "./UserCommentCard";
import { MdMemory } from "react-icons/md";

const TheCaseAgainst = ({
  argumentArenaData,
  aiAgainstAnalysis
}: {
  argumentArenaData: ArgumentArenaProps,
  aiAgainstAnalysis: string,
}) => {
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
      <div className="mb-10 relative p-6 bg-[#0a0f12] border border-secondary/30 shadow-[0_0_20px_rgba(164,230,255,0.05)]">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="material-symbols-outlined text-secondary text-sm"
            data-icon="memory"
          >
            <MdMemory />
          </span>
          <span className="font-label text-[10px] uppercase tracking-[0.15em] text-secondary font-bold">
            Crux AI Analysis
          </span>
        </div>
        <p className="min-h-30 font-headline text-lg text-on-surface-variant italic leading-relaxed">
          {aiAgainstAnalysis}
        </p>
      </div>
      <div className="flex flex-col gap-10">
        {argumentArenaData.againstCaseComments.map((e, i) => (
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

export default TheCaseAgainst;
