import { LS_KEY } from "../../config";
import { UserReport } from "../../types/Report";

export async function fetchAllReports(): Promise<UserReport[]> {
  const data = window.localStorage.getItem(LS_KEY);
  const items: UserReport[] = data ? JSON.parse(data) : [];
  return Promise.resolve(items);
}
