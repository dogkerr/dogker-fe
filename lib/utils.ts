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

export const formatToRp = (number: number): string => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return formatter.format(number);
};

export function convertToFormData(data: Record<string, any>) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => {
        if (Object.prototype.toString.call(val) === "[object Object]") {
          formData.append(`${key}`, JSON.stringify(val));
        } else {
          formData.append(`${key}`, val);
        }
      });
    } else {
      if (Object.prototype.toString.call(value) === "[object Object]") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }
  });

  return formData;
}
