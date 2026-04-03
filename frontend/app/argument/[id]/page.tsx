import ArgumentArena from "@/app/_components/argument/ArgumentArena";
import ArgumentHeader from "@/app/_components/argument/ArgumentHeader";
import type { ArgumentPageData } from "../types";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // Dummy data
  const argumentPageData: ArgumentPageData = {
    argumentHeaderData: {
      statementId: id,
      statement:
        "Artificial Intelligence should be granted legal personhood to ensure accountability for autonomous damage.",
      statementKeyword: "legal personhood",
      affirmativeProbability: 58,
      negativeProbability: 42,
    },
    argumentArenaData: {
      forArgumentsCount: 24,
      againstArgumentsCount: 18,
      forCaseComments: [
        {
          side: "for",
          reputation: "master",
          username: "vector_shift",
          grade: "A+",
          comment:
            'Without legal personhood, we face a "responsibility gap." Corporations use AI as a shield to deflect liability. Personhood allows for the creation of insurance-backed digital assets that can directly compensate victims without the need to pierce corporate veils.',
          likes: 81,
        },
        {
          side: "for",
          reputation: "master",
          username: "vector_shift",
          grade: "A+",
          comment:
            'Without legal personhood, we face a "responsibility gap." Corporations use AI as a shield to deflect liability. Personhood allows for the creation of insurance-backed digital assets that can directly compensate victims without the need to pierce corporate veils.',
          likes: 81,
        },
      ],
      againstCaseComments: [
        {
          side: "against",
          reputation: "master",
          username: "vector_shift",
          grade: "A+",
          comment:
            'Without legal personhood, we face a "responsibility gap." Corporations use AI as a shield to deflect liability. Personhood allows for the creation of insurance-backed digital assets that can directly compensate victims without the need to pierce corporate veils.',
          likes: 81,
        },
        {
          side: "against",
          reputation: "master",
          username: "vector_shift",
          grade: "A+",
          comment:
            'Without legal personhood, we face a "responsibility gap." Corporations use AI as a shield to deflect liability. Personhood allows for the creation of insurance-backed digital assets that can directly compensate victims without the need to pierce corporate veils.',
          likes: 81,
        },
      ],
    },
  };

  return (
    <>
      <div className="absolute inset-0 perspective-grid -z-10 pointer-events-none"></div>
      <section className="max-w-screen-2xl mx-auto px-6 pt-12 pb-16">
        <ArgumentHeader
          argumentHeaderData={argumentPageData.argumentHeaderData}
        />
        <ArgumentArena argumentArenaData={argumentPageData.argumentArenaData} />

        <div className="fixed bottom-0 left-0 right-0 bg-neutral-950/80 backdrop-blur-xl border-t border-outline-variant/20 py-6 px-6 z-40">
          <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 w-full relative">
              <input
                className="w-full bg-surface-container border border-outline-variant/50 focus:border-primary focus:ring-0 px-6 py-4 font-body text-on-surface placeholder:text-outline/50 transition-all"
                placeholder="Join the Argument..."
                type="text"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                <span className="font-label text-[10px] uppercase text-outline bg-surface-container-high px-2 py-1">
                  Shift + Enter to Submit
                </span>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button className="flex-1 cursor-pointer md:flex-none border border-primary text-primary hover:bg-primary/10 px-8 py-4 font-label uppercase tracking-widest text-xs transition-all">
                Support Affirmative
              </button>
              <button className="flex-1 cursor-pointer md:flex-none border border-secondary text-secondary hover:bg-secondary/10 px-8 py-4 font-label uppercase tracking-widest text-xs transition-all">
                Support Negative
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
