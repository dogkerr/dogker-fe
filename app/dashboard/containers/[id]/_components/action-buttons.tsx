"use client";

import FormInput from "@/components/form/input";
import FormSelect from "@/components/form/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form } from "@/components/ui/form";
import { revalidatePathServer } from "@/lib/action-utils";
import {
  scheduleContainerAction,
  startContainer,
  stopContainer,
  terminateContainer,
  updateContainer,
} from "@/lib/container-service";
import { addContainerSchema } from "@/schema";
import { addContainerDefault } from "@/schema/default";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ActionButtons = ({
  session,
  container,
}: {
  session: Session;
  container: Container;
}) => {
  const [loading, startTransition] = useTransition();

  const router = useRouter();

  const addContainerDefaultValue = {
    ...addContainerDefault,
    name: container.name,
    image: container.image,
    limit: {
      cpus: container.limit.cpus,
      memory: container.limit.memory,
    },
    replica: container.replica,
    endpoint: [
      {
        target_port: container.endpoint[0].target_port,
        published_port: container.endpoint[0].published_port,
        protocol: container.endpoint[0].protocol as any,
      },
    ],
  };

  const addForm = useForm<z.infer<typeof addContainerSchema>>({
    resolver: zodResolver(addContainerSchema),
    defaultValues: addContainerDefaultValue,
  });

  async function onAddSubmit(values: z.infer<typeof addContainerSchema>) {
    startTransition(async () => {
      const data = await updateContainer(
        container.service_id,
        session.accessToken,
        values
      );
      if ("error" in data) {
        toast.error(data.error);
        return;
      } else {
        toast.success("Container modified successfully");
        await revalidatePathServer(
          "/dashboard/containers/" + container.service_id
        );
        addForm.reset(addContainerDefaultValue);
      }
    });
  }

  const handleStop = async () => {
    const data = await stopContainer(container.service_id, session.accessToken);
    if ("error" in data) {
      toast.error(data.error);
      return;
    } else {
      toast.success("Container stopped successfully");
      await revalidatePathServer(
        "/dashboard/containers/" + container.service_id
      );
    }
  };

  const handleStart = async () => {
    const data = await startContainer(
      container.service_id,
      session.accessToken
    );
    if ("error" in data) {
      toast.error(data.error);
      return;
    } else {
      toast.success("Container started successfully");
      await revalidatePathServer(
        "/dashboard/containers/" + container.service_id
      );
    }
  };

  const handleTerminate = async () => {
    const data = await terminateContainer(
      container.service_id,
      session.accessToken
    );
    if ("error" in data) {
      toast.error(data.error);
      return;
    } else {
      toast.success("Container terminated successfully");
      await revalidatePathServer(
        "/dashboard/containers/" + container.service_id
      );
      router.replace("/dashboard/containers");
    }
  };

  // const handleSchedule = async (action: string) => {
  //   const data = await scheduleContainerAction(
  //     container.service_id,
  //     session.accessToken,
  //     action
  //   );
  //   if ("error" in data) {
  //     toast.error(data.error);
  //     return;
  //   } else {
  //     toast.success("Container scheduled successfully");
  //   }
  // };

  return (
    <>
      {/* More Actions button */}
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center space-x-2" size={"xs"}>
              <span>More actions</span> <ChevronDown className="w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleStop}>Stop</DropdownMenuItem>
            <DropdownMenuItem onClick={handleStart}>Start</DropdownMenuItem>
            <DropdownMenuItem onClick={handleTerminate}>
              Terminate
            </DropdownMenuItem>
            <DialogTrigger className="w-full">
              <DropdownMenuItem>Modify</DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="max-h-[80vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Modify {container.name}</DialogTitle>
            <DialogDescription>
              Please fill in the form below to create a new container.
            </DialogDescription>
          </DialogHeader>
          <Form {...addForm}>
            <form
              onSubmit={addForm.handleSubmit(onAddSubmit)}
              className="space-y-4"
            >
              <FormInput
                label="Container Name"
                name="name"
                placeholder="Enter container name"
              />
              <FormInput
                label="Image"
                name="image"
                placeholder="Enter image name"
              />
              <FormInput
                label="CPUs (miliCPU)"
                name="limit.cpus"
                placeholder="Enter number of miliCPUs"
                type="number"
              />
              <FormInput
                label="Memory (MB)"
                name="limit.memory"
                placeholder="Enter memory in MB"
                type="number"
              />
              <FormInput
                label="Replicas"
                name="replica"
                placeholder="Enter number of replicas"
                type="number"
              />
              <FormInput
                label="Target Port"
                name="endpoint[0].target_port"
                placeholder="Enter target port"
                type="number"
              />
              <FormInput
                label="Published Port"
                name="endpoint[0].published_port"
                placeholder="Enter published port"
                type="number"
              />
              <FormSelect
                label="Protocol"
                name="endpoint[0].protocol"
                options={[
                  { value: "tcp", label: "TCP" },
                  { value: "udp", label: "UDP" },
                ]}
              />
              <Button disabled={loading} type="submit">
                {loading ? "Loading" : "Modify"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* TODO: Form untuk setiap schedule action masih belum dibuat */}
      {/* Schedule button */}
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="flex items-center space-x-2"
              variant={"secondary"}
              size={"xs"}
            >
              <span>Schedule</span> <ChevronDown className="w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Schedule actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem onClick={handleScheduleStop}>
              Stop
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleScheduleStart}>
              Start
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleScheduleTerminate}>
              Terminate
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="max-h-[80vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Modify </DialogTitle>
            <DialogDescription>
              Please fill in the form below to create a new container.
            </DialogDescription>
          </DialogHeader>
          <Form {...addForm}>
            <form
              onSubmit={addForm.handleSubmit(onAddSubmit)}
              className="space-y-4"
            >
              <FormInput
                label="Container Name"
                name="name"
                placeholder="Enter container name"
              />
              <FormInput
                label="Image"
                name="image"
                placeholder="Enter image name"
              />
              <FormInput
                label="CPUs (miliCPU)"
                name="limit.cpus"
                placeholder="Enter number of miliCPUs"
                type="number"
              />
              <FormInput
                label="Memory (MB)"
                name="limit.memory"
                placeholder="Enter memory in MB"
                type="number"
              />
              <FormInput
                label="Replicas"
                name="replica"
                placeholder="Enter number of replicas"
                type="number"
              />
              <FormInput
                label="Target Port"
                name="endpoint[0].target_port"
                placeholder="Enter target port"
                type="number"
              />
              <FormInput
                label="Published Port"
                name="endpoint[0].published_port"
                placeholder="Enter published port"
                type="number"
              />
              <FormSelect
                label="Protocol"
                name="endpoint[0].protocol"
                options={[
                  { value: "tcp", label: "TCP" },
                  { value: "udp", label: "UDP" },
                ]}
              />
              <Button type="submit">Modify</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ActionButtons;
