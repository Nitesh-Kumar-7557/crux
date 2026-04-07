'use client';
import { jwtDecode } from "jwt-decode";
import ActiveArguments from "./_components/arena/ActiveArguments";
import ArenaSidebar from "./_components/arena/ArenaSidebar";
import { useUser } from "./_hooks/useUser";



const Home = () => {
  const user = useUser()
  console.log(user)
  return (
    <div className="px-8 py-6 flex flex-col md:gap-10 md:flex-row">
      <div className="md:w-[70%]">
        <ActiveArguments />
      </div>
      <ArenaSidebar />

    </div>
  );
};

export default Home;
