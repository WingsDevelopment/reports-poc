import { useQuery } from "@tanstack/react-query";
import { ReportQueryKeys } from "../../query-keys/ReportQueryKeys";
import { fetchReportById } from "./Report.fetch";

export const useReportById = (id?: string) => {
  return useQuery({
    queryKey: ReportQueryKeys.single(id!),
    queryFn: () => fetchReportById(id!),
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(id),
  });
};
