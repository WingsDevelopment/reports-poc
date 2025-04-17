import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEditReport } from "../../data/reports/mutations/edit-report/EditReport.hook";
import { useReportById } from "../../data/reports/queries/report/Report.hook";
import {
  EditorAIWrapper,
  EditorAIWrapperHandle,
} from "../../components/EditorAIWrapper";

// Edit Report page without internal content state
export const EditReportPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: report, isLoading } = useReportById(id);
  const editReport = useEditReport();
  const editorRef = useRef<EditorAIWrapperHandle>(null);
  const [title, setTitle] = useState<string>("");

  // Populate title and initial content
  useEffect(() => {
    if (report) {
      setTitle(report.title);
      // set content via ref once editor init
      if (editorRef.current) {
        editorRef.current.setContent(report.context);
      }
    }
  }, [report]);

  if (isLoading) return <CircularProgress />;
  if (!report)
    return (
      <Container>
        <Typography variant="h6">Report not found</Typography>
      </Container>
    );

  const handleSave = () => {
    const context = editorRef.current?.getContent() || "";
    editReport.mutate(
      { id: report.id, title, context },
      { onSuccess: () => navigate("/") }
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Report
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      {/* AI-enhanced editor without binding to state */}
      <EditorAIWrapper ref={editorRef} initialContent={report.context} />
      <Button
        variant="contained"
        onClick={handleSave}
        sx={{ mt: 3 }}
        disabled={editReport.isPending}
      >
        Save Changes
      </Button>
    </Container>
  );
};
