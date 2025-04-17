import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box, Button, TextField } from "@mui/material";
import { useCreateDraft } from "../data/ai/mutations/create-draft/CreateDraft.hook";
import { useSummarize } from "../data/ai/mutations/summerize/Summarize.hook";

// Props for EditorAIWrapper
export interface EditorAIWrapperProps {
  initialContent?: string;
}

// Handle interface for parent via ref
export interface EditorAIWrapperHandle {
  getContent(format?: { format: "text" }): string;
  setContent(html: string): void;
}

// Editor wrapper with AI buttons, exposing editor methods via ref
export const EditorAIWrapper = forwardRef<
  EditorAIWrapperHandle,
  EditorAIWrapperProps
>(({ initialContent = "" }, ref) => {
  // Define only the methods we use
  const editorInstanceRef = useRef<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getContent: (opt?: any) => string;
    setContent: (html: string) => void;
  } | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const summarize = useSummarize();
  const createDraft = useCreateDraft();

  // Expose methods to parent via ref
  useImperativeHandle(
    ref,
    () => ({
      getContent: (opt) => editorInstanceRef.current?.getContent(opt) || "",
      setContent: (html: string) => editorInstanceRef.current?.setContent(html),
    }),
    []
  );

  // Summarize action
  const handleSummarize = () => {
    const rawText =
      editorInstanceRef.current?.getContent({ format: "text" }) || "";
    summarize.mutate(rawText, {
      onSuccess: (data: string) => {
        const currentHtml = editorInstanceRef.current?.getContent() || "";
        const updated = `${currentHtml}<p>${data}</p>`;
        editorInstanceRef.current?.setContent(updated);
      },
    });
  };

  // Create draft action
  const handleCreateDraft = () => {
    createDraft.mutate(prompt, {
      onSuccess: (data: string) => {
        const draftHtml = `<p>${data}</p>`;
        editorInstanceRef.current?.setContent(draftHtml);
      },
    });
  };

  return (
    <Box>
      <Box mb={2} display="flex" alignItems="center" gap={2}>
        <TextField
          label="Draft Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          fullWidth
        />
        <Button
          onClick={handleCreateDraft}
          variant="contained"
          disabled={!prompt || createDraft.isPending}
        >
          Create Draft
        </Button>
      </Box>
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_EDITOR_API_KEY}
        onInit={(_evt, editor) => {
          editorInstanceRef.current = editor;
        }}
        initialValue={initialContent}
        init={{
          height: 300,
          menubar: false,
          plugins: ["link", "lists", "code"],
          toolbar:
            "undo redo | bold italic underline | bullist numlist outdent indent | code",
        }}
      />
      <Box mt={2}>
        <Button
          onClick={handleSummarize}
          variant="outlined"
          disabled={summarize.isPending}
        >
          Summarize
        </Button>
      </Box>
    </Box>
  );
});
