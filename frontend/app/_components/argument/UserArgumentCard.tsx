import { UserArgumentCardProps } from "@/app/argument/types";
import { FiThumbsUp } from "react-icons/fi";

const UserArgumentCard = ({side,reputation,username,grade,comment,likes}: UserArgumentCardProps) => {
  return (
    <div>
      <div className={`group mb-4 relative bg-surface-container-low p-6 border-l ${side === 'for' ? 'border-primary/20 hover:border-primary/60':'border-secondary/20 hover:border-secondary/60'}  transition-all shadow-[inset_0_0_20px_rgba(164,230,255,0.03)]`}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-surface-container-high border border-outline-variant/40 flex items-center justify-center">
              <span
                className="text-sm text-primary"
                data-icon="verified_user"
              >
                
              </span>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase text-on-surface">
                Reputation: {reputation}
              </p>
              <p className="font-label text-[10px] uppercase text-outline">
                @{username}
              </p>
            </div>
          </div>
          <div className={`${side === 'for' ? 'bg-primary/10 border border-primary/20':'bg-secondary/10 border border-secondary/20'}  px-3 py-1`}>
            <span className={`font-label font-bold ${side === 'for' ? 'text-primary' : 'text-secondary'} text-sm shadow-[0_0_10px_rgba(164,230,255,0.3)]`}>
              {grade}
            </span>
          </div>
        </div>
        <p className="font-body text-md leading-relaxed text-on-surface-variant mb-6 italic">
          "{comment}"
        </p>
        <div className="flex gap-4">
          <button className={`flex items-center gap-2 font-label text-[10px] uppercase text-outline ${side === 'for' ? 'hover:text-primary' : 'hover:text-secondary'}  transition-colors`}>
            <span
              className="material-symbols-outlined text-sm"
              data-icon="thumb_up"
            >
              <FiThumbsUp />
            </span>{" "}
            {likes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserArgumentCard;
