import { useQuery } from "@tanstack/react-query";
import { ReportQueryKeys } from "../../query-keys/ReportQueryKeys";
import { fetchAllReports } from "./AllReports.fetch";

export function useAllReports() {
  return useQuery({
    queryKey: ReportQueryKeys.all,
    queryFn: fetchAllReports,
    staleTime: 5 * 60 * 1000,
  });
}
