import { useMutation } from "@tanstack/react-query";
import { createDraftFromPrompt } from "./CreateDraft.function";

export function useCreateDraft() {
  return useMutation({
    mutationFn: createDraftFromPrompt,
    onMutate: (data) => {
      console.log(`Activity Log: Draft created for prompt "${data}"`);
    },
    onSuccess: (data, variables) => {
      console.log(
        `Activity Log: Draft created for prompt "${variables}" with length ${data.length}`
      );
    },
  });
}
