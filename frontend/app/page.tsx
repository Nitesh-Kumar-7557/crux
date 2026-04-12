export const dynamic = "force-dynamic";
import ActiveArguments from "./_components/arena/ActiveArguments";
import ArenaSidebar from "./_components/arena/ArenaSidebar";
import api from "./axios";
import serverApi from "./axios.server";
import { LiveArenaCardData, TrendingCardData } from "./types";

const Home = async () => {
  // dummy Data
  const {data} = await serverApi.get('/arena/active/live');
  const trending = await serverApi.get('/arena/active/trending');
  console.log(trending.data)

  const liveArenaCardData: LiveArenaCardData = [
    {
      username: data.username,
      domain: data.domain,
      title: data.content,
      argumentNum: 243,
      aiMatchQuality: "high",
      affermativeScore: data.affirmative,
      negativeScore: data.negative,
      numOfUsers: 18,
      argumentId: `CRX-${data.argumentId}-A`,
    },
  ];

  const trendingCardData: TrendingCardData = trending.data;

  return (
    <div className="px-8 py-6 flex flex-col md:gap-10 md:flex-row">
      <div className="md:w-[70%]">
        <ActiveArguments
          liveArenaCardData={liveArenaCardData}
          trendingCardData={trendingCardData}
        />
      </div>
      <ArenaSidebar />
    </div>
  );
};

export default Home;
