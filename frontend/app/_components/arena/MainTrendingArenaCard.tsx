import { MainTrendingArenaCardProps } from "@/app/types";
import { Newsreader } from "next/font/google";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { LuMessageSquare } from "react-icons/lu";

const newsreader = Newsreader({
  subsets: ["latin"],
});

const MainTrendingArenaCard = ({username,domain,title,argumentNum,argumentQuality,affermativeScore,negativeScore,numOfUsers,argumentId}: MainTrendingArenaCardProps) => {
  return (
    <div className="bg-surface-container-low mt-5 p-8 pb-4 border-l-2 border-primary group hover:bg-surface-container transition-colors relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <img alt="Aurelius_X" className="w-8 h-8 border border-outline-variant/30 grayscale hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY5Anp_D4xW6pJE78a2afpLChi3n-4n80CePZRl9k3_YW9rmmoew2pl6257BuP4_E8hZqh9u13uGYgZXQFhwsbwoQwM0JtnQaaLJBih9wYDfaGqm09iQ_YE538pVkDQcQ5bJaEJzREFPAXwM7dkiihuigd-a6g_2sXBdnGbZgtCFBNZD_NE9zLmWe5uqoqow7VHtx5Yp3eQL-KTBAZ4Pfku3J0sGV0VTFF9GDeJ3NFN_V0u5U6ybXJIEN8rTU4PrUeXh2MfvHK2bL6"/>
        <div className="flex flex-col">
        <span className="font-label text-[10px] text-primary uppercase tracking-[0.2em]">Proposed By</span>
        <span className="font-body text-xs font-bold text-on-surface">{username}</span>
        </div>
      </div>
      <span className="font-label text-[10px] text-tertiary uppercase tracking-widest mb-3 block">{domain}</span>
      <h2
        className={`${newsreader.className} text-4xl leading-tight mb-4 transition-colors`}
      >
        "{title}"
      </h2>
      <div className="flex gap-5 border-b border-gray-800 pb-5">
        <span className="font-label [word-spacing:-4px] text-xs text-outline uppercase tracking-widest">
          <LuMessageSquare className="inline text-primary" /> {argumentNum} {argumentNum === 1 ? 'Argument' : 'Arguments'}
        </span>
        <span className="font-label [word-spacing:-4px] text-xs text-outline uppercase tracking-widest">
          <GoVerified className="inline text-tertiary" /> Argument Quality: {argumentQuality}
        </span>
      </div>
      <div className="py-5">
        <div className="flex justify-between font-label text-[10px] uppercase tracking-[0.25em] mb-3">
          <span className="text-primary-container">Affirmative ({affermativeScore}%)</span>
          <span className="text-secondary">Negative ({negativeScore}%)</span>
        </div>
        <div className="w-full h-5 flex gap-0.5">
          <span className={`bg-primary-container`} style={{width:`${affermativeScore}%`}}></span>
          <span className={`bg-secondary-container`} style={{width:`${negativeScore}%`}}></span>
        </div>
        <div className="mt-7 flex justify-between items-center">
          <div></div>
          {/* <div className="flex -space-x-2">
            <img
              className="w-8 h-8 border-2 border-surface bg-surface"
              data-alt="portrait of a focused intellectual man with glasses and serious expression"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeo6e1sWqzzs6au5jN-gKF9rlmR8mSbOH3_Uit8UWCXcVfHikcKcxZomGqGy9MJLAS7MN3norzk3YL-udQxW-FPVBv3pfUCo1np-8KmW8Tssjmh0cVQ0uAj_ZNt1y79c21WOmMBDmD9wYdcl00bZ5vuegXHF31hYoGFYpbI0H2ni8d7blzs8wQOvTQuqel97Kh7CxA4TTXc7L_8nMUjfcm1zRI9GtHRjZNW5eQykPgweiaVKRZn0y8XylgscUbVvMaQ6En4wqaeRzL"
            />
            <img
              className="w-8 h-8 border-2 border-surface bg-surface"
              data-alt="portrait of a professional woman with a piercing gaze and minimalist aesthetic"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_-_zQ4k3njp3pDJZZK_LYM-PmfF3SzPuDbf9hpjMlyCu2B5IvrJClJ0rRYzRyzeIG0Zd5MxfW-06X6IRSRRhRJNO5GIGz_CD7I1LPCWZqB63LkUlbmj4DnE10U8Oo3HSNrlQRLER9c4uWx07M32JDivemKcUl8fSERv1DdnuqjBl7HL0EU4z_DyD1cCGs8qIasfb1mxwLN4WGx863r5CmT_rVRFmj4YV_HMyLbs0R7aHATfTPIb1ye9sH5_RPmGYYD9u70tnVy256"
            />
            <img
              className="w-8 h-8 border-2 border-surface bg-surface"
              data-alt="portrait of a young digital native with colorful neon lighting highlights"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVtFPxA7bWNP9oOYrzOZw5PEe__rizN3LhV1pnL4sjSQkeVV36vrFIW68XyUMcEhKSe0cSPSmFw5FqtG_y3Zk17E6hdSggXAkmGn0DHaWmF9xyCDt0pubBTdevFBfFcWm03VFMSZX1CiNRwHpxW7zSyECUN45v4f5pM9pdhyfyWTN2KFSC9NK6qSEPuB_YuS4gAXNWKCzdqg5ClriWxZe3WRpkBhalrXiPd7T_AaXCAz4baGJaVrMWiMp0WNw7eVJ6uxWNkH9E6NCr"
            />
            <div className="w-8 h-8 border-2 border-surface bg-surface-container-highest flex items-center justify-center font-label text-[10px]">
              +{numOfUsers}
            </div>
          </div> */}
          <Link href={`/argument/${argumentId}`} className="border border-primary/30 text-primary px-6 py-2 font-label uppercase tracking-widest text-[10px] hover:bg-primary/10 transition-colors">
            Enter Argument
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainTrendingArenaCard;
