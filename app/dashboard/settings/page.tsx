import { Settings } from "lucide-react";

const SettingsPage = () => {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <Settings className="w-10 h-10 stroke-primary" />
        <span className="font-bold text-xl">Settings</span>
      </div>
      <div className="mt-8 space-y-4"></div>
    </div>
  );
};
export default SettingsPage;
