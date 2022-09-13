import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { ru } from "date-fns/locale";

const DATE_TIME_SECOND = "yyyy-MM-dd'T'00:00:00.000+00:00"; // 2021-09-03T14:54:12

const FROM_TIME_ZONE = "Etc/UTC";
const TO_TIME_ZONE = "Europe/Moscow";

export const dateFormat = (date: string): string => {
  return format(
    utcToZonedTime(date, TO_TIME_ZONE, { timeZone: FROM_TIME_ZONE }),
    DATE_TIME_SECOND,
    { locale: ru }
  );
};
