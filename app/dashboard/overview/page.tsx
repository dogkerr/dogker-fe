import { auth } from "@/app/auth";
import { Home } from "lucide-react";

const Dashboard = async () => {
  const session = await auth();
  if (!session) {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <div className="flex items-center space-x-4">
        <Home className="w-10 h-10 stroke-primary" />
        <span className="font-bold text-xl">Overview</span>
      </div>
      <div className="mt-8 space-y-4"></div>
    </div>
  );
};
export default Dashboard;
