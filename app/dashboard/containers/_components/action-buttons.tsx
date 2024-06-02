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
import {
  addContainerSchema,
  scheduleContainerRequestSchema,
  uploadContainerSchema,
} from "@/schema";
import {
  addContainerDefault,
  scheduleContainerRequestDefault,
  uploadContainerDefault,
} from "@/schema/default";
import FormInput from "@/components/form/input";
import FormSelect from "@/components/form/select";
import {
  createContainer,
  createContainerFromFile,
  scheduleCreateContainer,
} from "@/lib/container-service";
import { Session } from "next-auth";
import { toast } from "sonner";
import { useTransition } from "react";
import { revalidatePathServer } from "@/lib/action-utils";
import FormFile from "@/components/form/file";
import { convertToFormData } from "@/lib/utils";

type ActionButtonsProps = {
  session: Session;
};

const ActionButtons = ({ session }: ActionButtonsProps) => {
  const [addLoading, startAddTransition] = useTransition();
  const [scheduleLoading, startScheduleTransition] = useTransition();
  const [uploadLoading, startUploadTransition] = useTransition();

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

  const uploadForm = useForm<z.infer<typeof uploadContainerSchema>>({
    resolver: zodResolver(uploadContainerSchema),
    defaultValues: uploadContainerDefault,
  });

  async function onUploadSubmit(values: z.infer<typeof uploadContainerSchema>) {
    startUploadTransition(async () => {
      const data = await createContainerFromFile(values, session.accessToken);
      if ("error" in data) {
        toast.error(data.error);
        return;
      } else {
        toast.success(`Container created successfully`);
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
                label="Enviroment Variables (Comma-separated, optional)"
                name="env"
                placeholder="ENV1=value1,ENV2=value2"
              />
              <FormInput
                label="Volumes (Comma-separated, optional)"
                name="volumes"
                placeholder="/path/to/volume1,/path/to/volume2"
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

      {/* Upload container */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"} size={"xs"}>
            Upload container
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Upload container</DialogTitle>
            <DialogDescription>
              Please fill in the form below to upload a new container.
            </DialogDescription>
          </DialogHeader>
          <Form {...uploadForm}>
            <form
              onSubmit={uploadForm.handleSubmit(onUploadSubmit)}
              className="space-y-4"
            >
              <FormInput
                label="Container Name"
                name="name"
                placeholder="Enter container name"
              />
              <FormFile label="Image Source Code (.tar.gz)" name="image" />
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
                label="Enviroment Variables (Comma-separated, optional)"
                name="env"
                placeholder="ENV1=value1,ENV2=value2"
              />
              <FormInput
                label="Volumes (Comma-separated, optional)"
                name="volumes"
                placeholder="/path/to/volume1,/path/to/volume2"
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
              <Button disabled={uploadLoading} type="submit">
                {uploadLoading ? "Creating container" : "Create container"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {/* End Upload container */}

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
                label="Enviroment Variables (Comma-separated, optional)"
                name="container.env"
                placeholder="ENV1=value1,ENV2=value2"
              />
              <FormInput
                label="Volumes (Comma-separated, optional)"
                name="container.volumes"
                placeholder="/path/to/volume1,/path/to/volume2"
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
