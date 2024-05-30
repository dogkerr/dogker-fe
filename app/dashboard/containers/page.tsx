import { auth } from "@/app/auth";
import { getContainers } from "@/lib/container-service";
import WholePage from "./_components/whole-page";

const ContainerList = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const data = await getContainers(session.accessToken);
  if ("error" in data) {
    throw new Error("Failed to fetch containers: " + data.error);
  }

  return (
    <div>
      <WholePage data={data} session={session} />
    </div>
  );
};
export default ContainerList;
