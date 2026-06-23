// get badge color based on score
export const getBadgeColorBaPerScore = (score: number) => {
  if (score <= 3) {
    return "success-500";
  } else if (score <= 6) {
    return "warning-500";
  } else {
    return "error-500";
  }
};

// get HEX color based on score (
export const getHexColorPerScore = (score: number) => {
  if (score <= 3) {
    return "#348352"; // success-500
  } else if (score <= 6) {
    return "#E77828"; // warning-500
  } else {
    return "#E63535"; // error-500
  }
};
