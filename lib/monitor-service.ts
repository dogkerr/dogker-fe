const apiUrl = process.env.NEXT_PUBLIC_MONITOR_API_URL;

export const getMonitor = async (accessToken: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/monitors/dashboards/monitors`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch monitor data");
    }

    return data as MonitoringLinks;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};

export const getLogs = async (accessToken: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/monitors/dashboards/logs`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch logs data");
    }

    return data as LogsLink;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};
