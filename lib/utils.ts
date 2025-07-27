import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const getFirstName = (name: string): string => {
  const username = name.split(" ");
  const firstName = username[0];
  return firstName;
};

export const applyTransparency = (
  hexColor: string,
  transparencyPercent: number
) => {
  // Remove '#' if present
  hexColor = hexColor.replace("#", "");

  // Expand short hex (e.g., 'abc') to full (e.g., 'aabbcc')
  if (hexColor.length === 3) {
    hexColor = hexColor
      .split("")
      .map((c) => c + c)
      .join("");
  }

  // Clamp transparencyPercent between 0 and 100
  transparencyPercent = Math.max(0, Math.min(100, transparencyPercent));

  // Calculate alpha as a value between 0 and 255
  const alpha = Math.round((1 - transparencyPercent / 100) * 255);
  const alphaHex = alpha.toString(16).padStart(2, "0");

  return `#${hexColor}${alphaHex}`;
};
