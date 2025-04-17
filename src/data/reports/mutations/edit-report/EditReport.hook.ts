import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ReportQueryKeys } from "../../query-keys/ReportQueryKeys";
import { editReport } from "./EditReport.function";

export function useEditReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editReport,
    onMutate: (data) => {
      // Activity log
      console.log(`Editing report: - ${data.title}...`);
    },
    onSuccess: (data, variables) => {
      // Invalidate list to refetch
      queryClient.invalidateQueries({ queryKey: ReportQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: ReportQueryKeys.single(variables.id),
      });

      // Activity log
      console.log(`Report edited: ${data.id} - ${data.title}...`);
    },
  });
}
