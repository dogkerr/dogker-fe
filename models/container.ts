/**
 * Request and response types for container service
 */

type ContainerAction = "START" | "STOP" | "TERMINATE";

type ContainerScheduleTimeFormat =
  | "SECOND"
  | "MINUTE"
  | "HOUR"
  | "DAY"
  | "WEEK"
  | "MONTH"
  | "YEAR";

type ScheduleContainerActionRequest = {
  action: ContainerAction;
  scheduled_time: number;
  time_format: ContainerScheduleTimeFormat;
};

type CreateContainerRequest = {
  name: string;
  image: string;
  limit: Limit;
  replica: number;
  env?: string[];
  volumes?: string[];
  endpoint: Endpoint[];
};

type ScheduleCreateContainerRequest = {
  action: string;
  scheduled_time: number;
  time_format: ContainerScheduleTimeFormat;
  container: CreateContainerRequest;
};

type ContainersResponse = {
  containers: Container[];
};

/**
 * Domain types for container service
 */

type ContainerLifecycle = {
  id: string;
  containerId: string;
  start_time: string;
  stop_time: string;
  replica: number;
  status: string;
};

type Endpoint = {
  target_port: number;
  published_port: number;
  protocol: string;
};

type Limit = {
  cpus: number;
  memory: number;
};

type Reservation = {
  cpus: number;
  memory: number;
};

type Labels = {
  user_id: string;
};

type Container = {
  id: string;
  user_id: string;
  status: string;
  name: string;
  container_port: number;
  public_port: number;
  created_at: string;
  terminated_time: string;
  all_container_lifecycles: ContainerLifecycle[];
  service_id: string;
  image: string;
  labels: Labels;
  env?: string[];
  volumes?: string[];
  replica: number;
  limit: Limit;
  reservation: Reservation;
  endpoint: Endpoint[];
  replica_available: number;
};
