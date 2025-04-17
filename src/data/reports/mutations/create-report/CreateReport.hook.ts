import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ReportQueryKeys } from "../../query-keys/ReportQueryKeys";
import { createReport } from "./CreateReport.function";

export function useCreateReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReport,
    onMutate: (data) => {
      // Activity log
      console.log(`Activity log: Creating report: - ${data.title}...`);
    },
    onSuccess: (data) => {
      // Invalidate list to refetch
      queryClient.invalidateQueries({ queryKey: ReportQueryKeys.all });
      // Activity log
      console.log(
        `Activity log: Report created: ${data.id} - ${data.title}...`
      );
    },
  });
}
