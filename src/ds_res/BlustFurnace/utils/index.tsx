const STOPPED = "stopped";
const LOW = "low";
const QUIET = "quiet";
const NORM = "norm";
const FULL = "full";

const getColorMoveFurnace = (data) => {
  return data?.map((item) => {
    if (item.value >= 0 && item.value <= 0.1) {
      return STOPPED;
    }

    if (item.dp === "ДП-3" && item.value > 0.1 && item.value < 1.65)
      return QUIET;
    if (item.dp === "ДП-4" && item.value > 0.1 && item.value < 1.75)
      return QUIET;
    if (item.dp === "ДП-5" && item.value > 0.1 && item.value < 1.85)
      return QUIET;
    if (item.dp === "ДП-6" && item.value > 0.1 && item.value < 1.9)
      return QUIET;
    if (item.dp === "ДП-7" && item.value > 0.1 && item.value < 2) return QUIET;

    if (item.dp === "ДП-3" && item.value > 1.65 && item.value < 1.75)
      return NORM;
    if (item.dp === "ДП-4" && item.value > 1.75 && item.value < 1.85)
      return NORM;
    if (item.dp === "ДП-5" && item.value > 1.85 && item.value < 1.95)
      return NORM;
    if (item.dp === "ДП-6" && item.value === 1.9) return NORM;
    if (item.dp === "ДП-7" && item.value == 2) return NORM;

    if (item.dp === "ДП-3" && item.value > 1.75 && item.value < 3) return LOW;
    if (item.dp === "ДП-4" && item.value > 1.85 && item.value < 3.4) return LOW;
    if (item.dp === "ДП-5" && item.value > 1.95 && item.value < 3.7) return LOW;
    if (item.dp === "ДП-6" && item.value > 1.9 && item.value < 4) return LOW;
    if (item.dp === "ДП-7" && item.value > 2 && item.value < 4.1) return LOW;

    if (item.dp === "ДП-3" && item.value > 3 && item.value <= 3.2) return FULL;
    if (item.dp === "ДП-4" && item.value > 3.4 && item.value <= 3.7)
      return FULL;
    if (item.dp === "ДП-5" && item.value > 3.7 && item.value <= 4) return FULL;
    if (item.dp === "ДП-6" && item.value > 4 && item.value <= 4.3) return FULL;
    if (item.dp === "ДП-7" && item.value > 4.1 && item.value <= 4.4)
      return FULL;
  });
};

export default getColorMoveFurnace;
