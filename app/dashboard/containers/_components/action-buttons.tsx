"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addContainerSchema, scheduleContainerRequestSchema } from "@/schema";
import {
  addContainerDefault,
  scheduleContainerRequestDefault,
} from "@/schema/default";
import FormInput from "@/components/form/input";
import FormSelect from "@/components/form/select";
import {
  createContainer,
  scheduleCreateContainer,
} from "@/lib/container-service";
import { Session } from "next-auth";
import { toast } from "sonner";
import { useTransition } from "react";
import { revalidatePathServer } from "@/lib/action-utils";

type ActionButtonsProps = {
  session: Session;
};

const ActionButtons = ({ session }: ActionButtonsProps) => {
  const [addLoading, startAddTransition] = useTransition();
  const [scheduleLoading, startScheduleTransition] = useTransition();

  const addForm = useForm<z.infer<typeof addContainerSchema>>({
    resolver: zodResolver(addContainerSchema),
    defaultValues: addContainerDefault,
  });

  async function onAddSubmit(values: z.infer<typeof addContainerSchema>) {
    startAddTransition(async () => {
      const data = await createContainer(values, session.accessToken);
      if ("error" in data) {
        toast.error(data.error);
        return;
      } else {
        toast.success("Container created successfully");
        await revalidatePathServer("/dashboard/containers");
        addForm.reset(addContainerDefault);
      }
    });
  }

  const scheduleForm = useForm<z.infer<typeof scheduleContainerRequestSchema>>({
    resolver: zodResolver(scheduleContainerRequestSchema),
    defaultValues: scheduleContainerRequestDefault,
  });

  async function onScheduleSubmit(
    values: z.infer<typeof scheduleContainerRequestSchema>
  ) {
    startScheduleTransition(async () => {
      const data = await scheduleCreateContainer(session.accessToken, values);
      if ("error" in data) {
        toast.error(data.error);
        return;
      } else {
        toast.success(
          `Container scheduled for creation ${values.scheduled_time} ${values.time_format} from now`
        );
        await revalidatePathServer("/dashboard/containers");
        scheduleForm.reset(scheduleContainerRequestDefault);
      }
    });
  }

  return (
    <>
      {/* Add container */}
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"xs"}>Add container</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Create a new container</DialogTitle>
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
              <Button disabled={addLoading} type="submit">
                {addLoading ? "Creating container" : "Create container"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {/* End add container */}

      {/* Schedule add container */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"} size={"xs"}>
            Schedule add container
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Schedule a container</DialogTitle>
            <DialogDescription>
              Please fill in the form below to schedule a new container.
            </DialogDescription>
          </DialogHeader>
          <Form {...scheduleForm}>
            <form
              onSubmit={scheduleForm.handleSubmit(onScheduleSubmit)}
              className="space-y-4"
            >
              <FormInput label="Action" name="action" readonly />
              <FormInput
                label="Scheduled Time"
                name="scheduled_time"
                placeholder="Enter scheduled time"
                type="number"
              />
              <FormSelect
                label="Time Format"
                name="time_format"
                options={[
                  { value: "SECOND", label: "Second" },
                  { value: "MINUTE", label: "Minute" },
                  { value: "HOUR", label: "Hour" },
                  { value: "DAY", label: "Day" },
                ]}
              />
              <FormInput
                label="Container Name"
                name="container.name"
                placeholder="Enter container name"
              />
              <FormInput
                label="Image"
                name="container.image"
                placeholder="Enter image name"
              />
              <FormInput
                label="CPUs (miliCPU)"
                name="container.limit.cpus"
                placeholder="Enter number of miliCPUs"
                type="number"
              />
              <FormInput
                label="Memory (MB)"
                name="container.limit.memory"
                placeholder="Enter memory in MB"
                type="number"
              />
              <FormInput
                label="Replicas"
                name="container.replica"
                placeholder="Enter number of replicas"
                type="number"
              />
              <FormInput
                label="Target Port"
                name="container.endpoint[0].target_port"
                placeholder="Enter target port"
                type="number"
              />
              <FormInput
                label="Published Port"
                name="container.endpoint[0].published_port"
                placeholder="Enter published port"
                type="number"
              />
              <FormSelect
                label="Protocol"
                name="container.endpoint[0].protocol"
                options={[
                  { value: "tcp", label: "TCP" },
                  { value: "udp", label: "UDP" },
                ]}
              />
              <Button disabled={scheduleLoading} type="submit">
                {scheduleLoading ? "Scheduling container" : "Schedule"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {/* End schedule add container */}
    </>
  );
};
export default ActionButtons;
