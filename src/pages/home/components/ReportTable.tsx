import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import dragIcon from "/public/drag-icon.svg";
import { UserReport } from "../../../data/reports/types/Report";
import { useAllReports } from "../../../data/reports/queries/all-reports/AllReports.hook";

// Draggable row component
const SortableRow: React.FC<{ report: UserReport }> = ({ report }) => {
  const navigate = useNavigate();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: report.id });

  const rowStyle: React.CSSProperties = {
    backgroundColor: isDragging ? "#f0f0f0" : undefined,
    cursor: isDragging ? "grabbing" : "pointer",
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleStyle: React.CSSProperties = {
    cursor: "move",
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={rowStyle}
      onClick={() => {
        if (!isDragging) {
          navigate(`/reports/${report.id}`);
        }
      }}
    >
      <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
        <img
          src={dragIcon}
          alt="Drag handle"
          width={24}
          height={24}
          {...attributes}
          {...listeners}
          style={handleStyle}
        />
      </TableCell>
      <TableCell>{report.order + 1}</TableCell>
      <TableCell>{report.title}</TableCell>
    </TableRow>
  );
};

// Main table component
export const ReportTable: React.FC = () => {
  const { data: reports, isLoading, error } = useAllReports();
  const [localReports, setLocalReports] = useState<UserReport[]>([]);
  const [filter, setFilter] = useState<string>("");
  const sensors = useSensors(useSensor(PointerSensor));

  // Initialize local state when reports load
  useEffect(() => {
    if (reports) setLocalReports(reports);
  }, [reports]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active?.id || !over?.id) return;
    if (active.id !== over.id) {
      setLocalReports((current) => {
        const oldIndex = current.findIndex((r) => r.id === active.id);
        const newIndex = current.findIndex((r) => r.id === over.id);
        return arrayMove(current, oldIndex, newIndex).map((item, idx) => ({
          ...item,
          order: idx,
        }));
      });
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Failed to load reports</Typography>;

  // Filter reports
  const filtered = localReports.filter((r) =>
    r.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Search Reports"
          variant="outlined"
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button
          component={Link}
          to="/reports/new"
          variant="contained"
          sx={{ ml: 2 }}
        >
          New Report
        </Button>
      </Box>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filtered.map((r) => r.id)}
          strategy={verticalListSortingStrategy}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Order</TableCell>
                  <TableCell>Title</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((report) => (
                    <SortableRow key={report.id} report={report} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </SortableContext>
      </DndContext>
    </>
  );
};
