import { TrendingCardProps } from "@/app/types";
import { Newsreader } from "next/font/google";
import Link from "next/link";

const newsreader = Newsreader({
  subsets: ["latin"],
});

const TrendingCard = ({
  username,
  domain,
  title,
  affirmativescore,
  negativescore,
  argumentid,
}: TrendingCardProps) => {
  return (
    <div className="bg-surface-container-low cursor-pointer md:w-[49%] mt-5 p-6 border-l-2 border-outline-variant/30 hover:border-primary transition-all">
      <Link className="flex flex-col justify-between h-full" href={`/argument/CRX-${argumentid}-A`}>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              alt="Dr. Aris Thorne"
              className="w-6 h-6 border border-outline-variant/20 grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY5Anp_D4xW6pJE78a2afpLChi3n-4n80CePZRl9k3_YW9rmmoew2pl6257BuP4_E8hZqh9u13uGYgZXQFhwsbwoQwM0JtnQaaLJBih9wYDfaGqm09iQ_YE538pVkDQcQ5bJaEJzREFPAXwM7dkiihuigd-a6g_2sXBdnGbZgtCFBNZD_NE9zLmWe5uqoqow7VHtx5Yp3eQL-KTBAZ4Pfku3J0sGV0VTFF9GDeJ3NFN_V0u5U6ybXJIEN8rTU4PrUeXh2MfvHK2bL6"
            />
            <span className="font-body text-[10px] font-bold text-outline uppercase tracking-wider">
              {username}
            </span>
          </div>
          <span className="font-label text-[10px] text-tertiary uppercase tracking-widest mb-3 block">
            {domain}
          </span>
          <h3 className={`${newsreader.className} text-xl mb-4`}>"{title}"</h3>
        </div>

        <div>
          <div className="h-2 w-full bg-surface-container-highest flex mb-4">
            <div
              className={`h-full bg-primary-container`}
              style={{ width: `${affirmativescore}%` }}
            ></div>
            <div
              className={`h-full bg-secondary-container`}
              style={{ width: `${negativescore}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center font-label text-[10px] text-outline uppercase tracking-widest">
            <span>{10} Active Minds</span>
            {affirmativescore > negativescore ? (
              <span className="text-primary-container">
                {affirmativescore}% Favor
              </span>
            ) : (
              <span className="text-secondary-container">
                {negativescore}% Against
              </span>
            )}
          </div>
        </div>

      </Link>
    </div>
  );
};

export default TrendingCard;
