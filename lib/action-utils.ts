"use server";

import { revalidatePath } from "next/cache";

export const revalidatePathServer = async (path: string) => {
  revalidatePath(path);
};
