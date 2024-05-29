const apiUrl = process.env.NEXT_PUBLIC_CONTAINER_API_URL;

export const createContainer = async (
  containerDetail: CreateContainerRequest,
  accessToken: string
) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/containers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(containerDetail),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to create container");
    }

    return data;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};

export const getContainers = async (accessToken: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/containers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch containers");
    }

    return data;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};

export const getContainer = async (serviceId: string, accessToken: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/containers/${serviceId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch container with id: " + serviceId);
    }

    return data;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};

export const startContainer = async (
  serviceId: string,
  accessToken: string
) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/containers/${serviceId}/start`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to start container with id: " + serviceId);
    }

    return data;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};

export const stopContainer = async (serviceId: string, accessToken: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/containers/${serviceId}/stop`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to stop container with id: " + serviceId);
    }

    return data;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};

export const scaleContainer = async (
  serviceId: string,
  replica: number,
  accessToken: string
) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/containers/${serviceId}/scale`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ replica }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to scale container with id: " + serviceId);
    }

    return data;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};

export const deleteContainer = async (
  serviceId: string,
  accessToken: string
) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/containers/${serviceId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to delete container with id: " + serviceId);
    }

    return data;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};

export const updateContainer = async (
  serviceId: string,
  accessToken: string,
  body: CreateContainerRequest
) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/containers/${serviceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to update container with id: " + serviceId);
    }

    return data;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};

export const scheduleContainerAction = async (
  serviceId: string,
  accessToken: string,
  body: ScheduleContainerActionRequest
) => {
  try {
    const res = await fetch(
      `${apiUrl}/api/v1/containers/${serviceId}/schedule`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        `Failed to ${body.action} container with id: ${serviceId}`
      );
    }

    return data;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};

export const scheduleCreateContainer = async (
  accessToken: string,
  body: ScheduleCreateContainerRequest
) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/containers/schedule`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to schedule create container");
    }

    return data;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};
