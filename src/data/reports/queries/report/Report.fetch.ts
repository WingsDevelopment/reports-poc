import { UserReport } from "../../types/Report";
import { fetchAllReports } from "../all-reports/AllReports.fetch";

export async function fetchReportById(
  id: string
): Promise<UserReport | undefined> {
  const all = await fetchAllReports();
  return all.find((r) => r.id === id);
}
