import { parseISO, format } from "date-fns";

export function formatDate(mysqlDatetime: string): string {
  const isoDate = mysqlDatetime.replace(" ", "T");
  return format(parseISO(isoDate), "dd/MM/yyyy HH:mm a");
}
