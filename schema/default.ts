export const addContainerDefault = {
  name: "",
  image: "",
  limit: {
    cpus: 0,
    memory: 0,
  },
  env: "" as any,
  volumes: "" as any,
  replica: 1,
  endpoint: [
    {
      target_port: 0,
      published_port: 0,
      protocol: "" as "tcp", // Assuming "tcp" as a common default protocol
    },
  ],
};

export const scheduleContainerRequestDefault = {
  action: "CREATE",
  scheduled_time: 0,
  time_format: "" as "SECOND",
  container: addContainerDefault,
};

export const scheduleSmallContainerRequestDefault = {
  action: "" as "START",
  scheduled_time: 0,
  time_format: "" as "SECOND",
};

export const initDepositDefault = {
  amount: 0,
};
