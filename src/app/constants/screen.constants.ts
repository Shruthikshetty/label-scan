export const COLOR_INDICATORS = [
  {
    label: "Safe",
    color: "bg-success-500",
  },
  {
    label: "Processed",
    color: "bg-warning-500",
  },
  {
    label: "Red flag",
    color: "bg-error-500",
  },
];

export const MACRO_COLOR_MAPPING: Record<string, string> = {
  high: "text-red-500",
  medium: "text-yellow-500",
  low: "text-green-500",
  good: "text-green-500",
  bad: "text-red-500",
  average: "text-yellow-500",
};
