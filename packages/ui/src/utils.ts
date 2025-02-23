import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): ReturnType<typeof twMerge> {
  return twMerge(clsx(inputs))
}
