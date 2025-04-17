import { LS_KEY } from "../../config";
import { fetchAllReports } from "../../queries/all-reports/AllReports.fetch";
import { UserReport } from "../../types/Report";

type EditPayload = Pick<UserReport, "id"> &
  Partial<Pick<UserReport, "title" | "context">>;
export async function editReport({
  id,
  title,
  context,
}: EditPayload): Promise<UserReport> {
  const all = await fetchAllReports();
  const updated = all.map((r) =>
    r.id === id
      ? { ...r, title: title ?? r.title, context: context ?? r.context }
      : r
  );
  window.localStorage.setItem(LS_KEY, JSON.stringify(updated));
  const edited = updated.find((r) => r.id === id)!;
  return Promise.resolve(edited);
}
