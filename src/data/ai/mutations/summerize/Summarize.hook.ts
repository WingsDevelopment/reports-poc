import { useMutation } from "@tanstack/react-query";
import { summarizeText } from "./Sumarize.function";

export function useSummarize() {
  return useMutation<string, Error, string>({
    mutationFn: summarizeText,
    onMutate: (data) => {
      console.log(`Activity Log: Summarize started, length ${data.length}`);
    },
    onSuccess: (summary) => {
      console.log(
        `Activity Log: Summarize succeeded, length ${summary.length}`
      );
    },
  });
}
