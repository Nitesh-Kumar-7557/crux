export const dynamic = "force-dynamic";
import ActiveArguments from "./_components/arena/ActiveArguments";
import ArenaSidebar from "./_components/arena/ArenaSidebar";
import serverApi from "./axios.server";
import { MainTrendingArenaCardData, TrendingArenaCardData } from "./types";

const isNonEmptyObject = (value: unknown): value is Record<string, unknown> => {
  return (
    !!value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value).length > 0
  );
};

const toTrendingCard = (item: Record<string, unknown>) => ({
  username: String(item.username ?? ""),
  domain: String(item.domain ?? ""),
  title: String(item.title ?? ""),
  affirmativescore: Number(item.affirmativescore ?? item.affirmativeScore ?? 0),
  negativescore: Number(item.negativescore ?? item.negativeScore ?? 0),
  argumentid: Number(item.argumentid ?? item.argumentId ?? 0),
});

const Home = async () => {
  const mainResponse = await serverApi.get("/arena/active/main");
  const trendingResponse = await serverApi.get("/arena/active/trending");

  const mainPayload = mainResponse.data;
  const trendingPayload = trendingResponse.data;

  const mainTrendingArenaCardData: MainTrendingArenaCardData =
    isNonEmptyObject(mainPayload)
      ? [
      {
        username: String(mainPayload.username ?? ""),
        domain: String(mainPayload.domain ?? ""),
        title: String(mainPayload.content ?? ""),
        argumentNum: 243,
        aiMatchQuality: "high",
        affermativeScore: Number(mainPayload.affirmative ?? 0),
        negativeScore: Number(mainPayload.negative ?? 0),
        numOfUsers: 18,
        argumentId: mainPayload.argumentId
          ? `CRX-${mainPayload.argumentId}-A`
          : "",
      },
    ]
      : [];

  const trendingArenaCardData: TrendingArenaCardData = Array.isArray(
    trendingPayload,
  )
    ? trendingPayload.map((item) => toTrendingCard(item ?? {}))
    : [];

  return (
    <div className="px-8 py-6 flex flex-col md:gap-10 md:flex-row">
      <div className="md:w-[70%]">
        <ActiveArguments
          mainTrendingArenaCardData={mainTrendingArenaCardData}
          trendingArenaCardData={trendingArenaCardData}
        />
      </div>
      <ArenaSidebar />
    </div>
  );
};

export default Home;
