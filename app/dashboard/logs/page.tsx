import { FileClock } from "lucide-react";

const Logs = () => {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <FileClock className="w-10 h-10 stroke-primary" />
        <span className="font-bold text-xl">Logs</span>
      </div>
      <div className="mt-8 space-y-4"></div>
    </div>
  );
};
export default Logs;
