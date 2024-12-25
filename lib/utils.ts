import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow, isAfter, subHours } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
  
    const isWithin24Hours = isAfter(date, subHours(now, 24));
  
    if (isWithin24Hours) {
      const distance = formatDistanceToNow(date, { addSuffix: true });
      return distance.replace("about ", "").replace("less than ", "");
    }
  
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  