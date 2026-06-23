// get the score tier based on score
export const getScoreTier = (
  score: number,
): "success" | "warning" | "error" => {
  if (score >= 7) {
    return "success";
  } else if (score >= 4) {
    return "warning";
  } else {
    return "error";
  }
};

// get badge color token based on score (e.g. "success-500")
export const getBadgeColorPerScore = (score: number) =>
  `${getScoreTier(score)}-500`;

// get HEX color based on score
const HEX_MAP: Record<string, string> = {
  success: "#348352",
  warning: "#E77828",
  error: "#E63535",
};
export const getHexColorPerScore = (score: number) =>
  HEX_MAP[getScoreTier(score)];
