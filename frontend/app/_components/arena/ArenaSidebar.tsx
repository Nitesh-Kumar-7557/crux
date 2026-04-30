"use client";
import TopDebaters from "./TopDebaters";
import SystemHealth from "./SystemHealth";
import TrendingTopics from "./TrendingTopics";
import {
  SystemHealthData,
} from "@/app/types";
import { useEffect, useState } from "react";
import api from "@/app/axios";

const ArenaSidebar = () => {
  const [trendingTopicsData, setTrendingTopicsData] = useState([]);
  const [topDebatersData, setTopDebatersData] = useState([]);
  const [systemHealthData, setSystemHealthData] = useState<SystemHealthData>({
    logicStacked: 0,
    activeArenas: 0,
  });

  useEffect(() => {
    async function getData() {
      const { data } = await api.get("/arena/sidebar");
      if (data.length !== 0) {
        setTrendingTopicsData(data.data1);
        setTopDebatersData(data.data2);
        setSystemHealthData(data.data3[0]);
      }
    }
    getData();
  }, []);

  return (
    <div className="py-10 md:w-[30%]">
      <TrendingTopics data={trendingTopicsData} />
      <TopDebaters data={topDebatersData} />
      <SystemHealth data={systemHealthData} />
    </div>
  );
};

export default ArenaSidebar;
