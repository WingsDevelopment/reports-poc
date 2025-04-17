import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useCreateReport } from "../../data/reports/mutations/create-report/CreateReport.hook";
import {
  EditorAIWrapper,
  EditorAIWrapperHandle,
} from "../../components/EditorAIWrapper";

// Create New Report page without internal content state
export const CreateReportPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const navigate = useNavigate();
  const createReport = useCreateReport();
  const editorRef = useRef<EditorAIWrapperHandle>(null);

  const handleCreate = () => {
    // Retrieve content directly from editor
    const context = editorRef.current?.getContent() || "";
    createReport.mutate({ title, context }, { onSuccess: () => navigate("/") });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        New Report
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* AI-enhanced editor without binding to state */}
      <EditorAIWrapper ref={editorRef} initialContent={""} />

      <Button
        variant="contained"
        onClick={handleCreate}
        sx={{ mt: 3 }}
        disabled={!title.trim()}
      >
        Create
      </Button>
    </Container>
  );
};
