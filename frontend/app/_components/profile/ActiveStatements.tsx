
import { ActiveStatementsProps } from "@/app/profile/types";
import { Newsreader } from "next/font/google";
const newsreader = Newsreader({
  subsets: ["latin"],
});




const ActiveStatements = ({sanctionedData,provisionalData}: ActiveStatementsProps) => {
  return (
    <div className="lg:col-span-4 bg-primary text-on-primary p-8 flex flex-col">
      <div className="mb-auto">
        <h2 className={`${newsreader.className} text-3xl font-bold mb-4 leading-tight italic`}>
          Active Statements
        </h2>
        <ul className="space-y-6">
          {sanctionedData.map((e,i)=>(
            <li key={i} className="group cursor-pointer">
            <span className="font-label text-[10px] tracking-widest opacity-70 block mb-1">
              SANCTIONED #{e.id}
            </span>
            <p className="font-body font-bold text-lg group-hover:underline">
              {e.title}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-on-primary animate-pulse"></span>
              <span className="font-label text-[10px] uppercase">
                Live in Arena
              </span>
            </div>
          </li>
          ))}
          {provisionalData.map((e,i)=>(
            <li key={i} className="group cursor-pointer opacity-60">
            <span className="font-label text-[10px] tracking-widest opacity-70 block mb-1">
              PROVISIONAL #{e.id}
            </span>
            <p className="font-body font-bold text-lg group-hover:underline">
              {e.title}
            </p>
          </li>
          ))}
        </ul>
      </div>
      <button className="mt-12 w-full border border-on-primary py-3 font-label text-xs uppercase tracking-[0.2em] font-bold hover:bg-on-primary hover:text-primary transition-all">
        Defend New Claim
      </button>
    </div>
  );
};

export default ActiveStatements;
