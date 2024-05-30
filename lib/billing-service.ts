const apiUrl = process.env.NEXT_PUBLIC_BILLING_API_URL;

export const getDeposits = async (accessToken: string, userId: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/deposits?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to get deposits: " + data.message);
    }

    return data;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};

export const initDeposit = async (accessToken: string, amount: number) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/deposits/init`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to init deposit: " + data.message);
    }

    return data;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};
