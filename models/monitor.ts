type DashboardMetadata = {
  id: string;
  owner: string;
  uid: string;
  type: string;
};

type MonitoringLinks = {
  dashboard: DashboardMetadata;
  received_network_link: string;
  send_network_link: string;
  cpu_usage_link: string;
  memory_swap_per_container_link: string;
  memory_usage_per_container_link: string;
  memory_usage_not_graph: string;
  overall_cpu_usage: string;
  total_container: string;
};
