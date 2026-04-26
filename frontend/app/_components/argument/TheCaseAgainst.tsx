import { ArgumentArenaProps } from "@/app/argument/types";
import UserArgumentCard from "./UserCommentCard";
import { MdMemory } from "react-icons/md";
import ReactMarkdown from "react-markdown";

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
        <div className="min-h-30 max-w-none
          [&>p]:font-headline [&>p]:text-sm [&>p]:text-on-surface-variant [&>p]:italic [&>p]:leading-relaxed [&>p]:mb-4
          [&>h3]:font-label [&>h3]:text-[9px] [&>h3]:uppercase [&>h3]:tracking-[0.2em] [&>h3]:text-secondary [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:border-b [&>h3]:border-secondary/20 [&>h3]:pb-1
          [&>ul]:pl-0 [&>ul]:mt-2 [&>ul]:space-y-3 [&>ul]:list-none
          [&>ul>li]:font-headline [&>ul>li]:text-sm [&>ul>li]:text-on-surface-variant [&>ul>li]:italic [&>ul>li]:leading-snug [&>ul>li]:border-l-2 [&>ul>li]:border-secondary/40 [&>ul>li]:pl-3
          [&>ul>li>strong]:text-white [&>ul>li>strong]:not-italic [&>ul>li>strong]:font-bold [&>ul>li>strong]:font-label [&>ul>li>strong]:text-xs [&>ul>li>strong]:tracking-wide
        ">
          <ReactMarkdown>{aiAgainstAnalysis}</ReactMarkdown>
        </div>
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
