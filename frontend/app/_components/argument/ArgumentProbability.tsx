import { ArgumentHeaderProps } from "@/app/argument/types";

const ArgumentProbability = ({
  argumentHeaderData,
}: {
  argumentHeaderData: ArgumentHeaderProps;
}) => {
  return (
    <div className="w-full h-12 bg-surface-container-low relative flex items-center mb-12 border border-outline-variant/20 overflow-hidden">
      <div
        className="h-full bg-primary flex items-center justify-start px-6 transition-all duration-700 relative overflow-hidden"
        style={{ width: `${argumentHeaderData.affirmativeProbability}%` }}
      >
        <span className="font-label text-sm text-on-primary font-bold relative z-10">
          AFFIRMATIVE {argumentHeaderData.affirmativeProbability}%
        </span>
        <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent"></div>
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white z-20 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        style={{ left: `${argumentHeaderData.affirmativeProbability}` }}
      ></div>
      <div
        className="h-full bg-secondary flex items-center justify-end px-6 transition-all duration-700 relative overflow-hidden"
        style={{ width: `${argumentHeaderData.negativeProbability}%` }}
      >
        <span className="font-label text-sm text-on-secondary font-bold relative z-10">
          NEGATIVE {argumentHeaderData.negativeProbability}%
        </span>
        <div className="absolute inset-0 bg-linear-to-l from-white/10 to-transparent"></div>
      </div>
    </div>
  );
};

export default ArgumentProbability;
