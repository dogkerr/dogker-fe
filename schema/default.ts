export const addContainerDefault = {
  name: "",
  image: "",
  limit: {
    cpus: 0,
    memory: 0,
  },
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
  container: {
    name: "",
    image: "",
    limit: {
      cpus: 0,
      memory: 0,
    },
    replica: 1,
    endpoint: [
      {
        target_port: 0,
        published_port: 0,
        protocol: "" as "tcp",
      },
    ],
  },
};
