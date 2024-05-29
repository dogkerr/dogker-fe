import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const modifyLinks = (
  links: Record<string, any>,
  oldDomain: string,
  newDomain: string
): Record<string, string> => {
  const modifiedLinks = { ...links };

  Object.keys(modifiedLinks).forEach((key) => {
    if (typeof modifiedLinks[key] === "string") {
      modifiedLinks[key] = modifiedLinks[key].replace(oldDomain, newDomain);
    }
  });

  if (typeof modifiedLinks.dashboard === "object") {
    // Skip the dashboard object as it does not contain URLs
  }

  return modifiedLinks;
};
