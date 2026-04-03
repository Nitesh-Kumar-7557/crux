import React from "react";
import { MdOutlineGroup, MdOutlinePsychology } from "react-icons/md";

const CruxAIRoleInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-surface-container p-6 border-l border-tertiary/30">
        <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-tertiary mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm"><MdOutlinePsychology /></span>
          Autonomous Adjudication
        </h4>
        <p className="font-body text-xs text-on-surface-variant leading-relaxed">
          The Crux Engine analyzes the semantic integrity of your statement. It
          filters for logical fallacies and assigns a "Clarity Score" before
          broadcasting to the arena.
        </p>
      </div>
      <div className="bg-surface-container p-6 border-l border-primary/30">
        <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-primary mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm"><MdOutlineGroup /></span>
          Matchmaking Logic
        </h4>
        <p className="font-body text-xs text-on-surface-variant leading-relaxed">
          Once live, the system identifies verified debaters with opposing
          historical data and high Elo ratings in your selected category to
          ensure a high-stakes clash.
        </p>
      </div>
    </div>
  );
};

export default CruxAIRoleInfo;
