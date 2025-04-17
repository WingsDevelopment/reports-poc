import { LS_KEY } from "../../config";
import { fetchAllReports } from "../../queries/all-reports/AllReports.fetch";
import { UserReport } from "../../types/Report";

export async function createReport({
  title,
  context,
}: Omit<UserReport, "id" | "order">): Promise<UserReport> {
  const all = await fetchAllReports();
  const newReport: UserReport = {
    id: crypto.randomUUID(),
    title,
    context,
    order: all.length,
  };
  const updated = [...all, newReport];
  window.localStorage.setItem(LS_KEY, JSON.stringify(updated));
  return Promise.resolve(newReport);
}
