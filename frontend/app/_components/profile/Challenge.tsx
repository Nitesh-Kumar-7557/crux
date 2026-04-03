
import { Newsreader } from "next/font/google";
import Link from "next/link";
const newsreader = Newsreader({
  subsets: ["latin"],
});

const Challenge = () => {
  return (
    <section className="mt-18 bg-surface-bright/40 backdrop-blur-xl border border-outline-variant/20 p-12 text-center relative">
      <div className="absolute inset-0 bg-noise pointer-events-none"></div>
      <h2 className={`${newsreader.className} text-5xl font-bold italic mb-6`}>
        Ready to challenge the status quo?
      </h2>
      <p className="font-body text-outline mb-10 max-w-2xl mx-auto">
        Your reputation as a thinker is your only asset here. Step into the
        arena and make your case known to the world.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        <Link href={'/'} className="bg-primary text-on-primary px-10 py-4 font-label font-bold tracking-widest uppercase hover:bg-primary-container transition-all">
          Enter Global Arena
        </Link>
        <Link href={'/archive'} className="border border-outline px-10 py-4 font-label font-bold tracking-widest uppercase hover:bg-on-surface hover:text-background transition-all">
          Browse Archive
        </Link>
      </div>
    </section>
  );
};

export default Challenge;
