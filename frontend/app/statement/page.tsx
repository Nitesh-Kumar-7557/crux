'use client';
import StatementHeader from "../_components/statement/StatementHeader";
import CruxAIRoleInfo from "../_components/statement/CruxAIRoleInfo";
import { DomainClassification } from "./types";
import dynamic from "next/dynamic";

const StatementForm = dynamic(
  () => import("@/app/_components/statement/StatementForm"),
  { ssr: false }
);

// Dummy Data
const domains: DomainClassification = ['AI','Geopolitics','Technology','Science','Other']

const page = () => {
  return (
    <div className="min-h-screen pt-22 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <StatementHeader/>
        <div className="grid grid-cols-1 gap-8">
          <StatementForm domains={domains}/>
          <CruxAIRoleInfo/>
        </div>
      </div>
    </div>
  );
};

export default page;
