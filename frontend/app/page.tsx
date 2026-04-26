export const dynamic = "force-dynamic";
import ActiveArguments from "./_components/arena/ActiveArguments";
import ArenaSidebar from "./_components/arena/ArenaSidebar";
import serverApi from "./axios.server";
import { MainTrendingArenaCardData, TrendingArenaCardData } from "./types";

const Home = async () => {
  const mainResponse = await serverApi.get("/arena/active/main");
  const trendingResponse = await serverApi.get("/arena/active/trending");

  const mainPayload = mainResponse.data;
  const trendingPayload = trendingResponse.data;

  const mainTrendingArenaCardData: MainTrendingArenaCardData = [
      {
        username: String(mainPayload.username ?? ""),
        domain: String(mainPayload.domain ?? ""),
        title: String(mainPayload.content ?? ""),
        argumentNum:  Number(mainPayload.count_comments ?? 0),
        argumentQuality: "high",
        affermativeScore: Number(mainPayload.affirmative ?? 0),
        negativeScore: Number(mainPayload.negative ?? 0),
        numOfUsers: 18,
        argumentId: mainPayload.argumentId
          ? `CRX-${mainPayload.argumentId}-A`
          : "",
      },
    ]

  const trendingArenaCardData: TrendingArenaCardData = trendingPayload;

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
