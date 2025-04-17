import { Box } from "@mui/material";
import React from "react";

export const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box
    sx={{
      margin: { xs: "5px", sm: "100px" },
    }}
  >
    {children}
  </Box>
);
