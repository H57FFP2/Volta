import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function round(value: number, decimals = 2) {
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
}

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}
