import StatementHeader from "../_components/statement/StatementHeader";
import CruxAIRoleInfo from "../_components/statement/CruxAIRoleInfo";
import { DomainClassification } from "./types";
import StatementForm from "../_components/statement/StatementForm";

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
