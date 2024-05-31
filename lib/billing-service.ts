const apiUrl = process.env.NEXT_PUBLIC_BILLING_API_URL;

export const getDeposit = async (accessToken: string, depositId: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/deposits/${depositId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to get deposit: " + data.message);
    }

    return data as GetDepositResponse;
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

    return data as InitDepositResponse;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};

export const getMutations = async (accessToken: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/mutations`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to get mutations: " + data.message);
    }

    return data as GetMutationsResponse;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};

export const getMutation = async (accessToken: string, mutationId: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/mutations/${mutationId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to get mutation: " + data.message);
    }

    return data as GetMutationResponse;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};

export const getCharge = async (accessToken: string, chargeId: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/charges/${chargeId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to get charge: " + data.message);
    }

    return data as GetChargeResponse;
  } catch (error) {
    return { error: (error as any).message, ok: false };
  }
};
