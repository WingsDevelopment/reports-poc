import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link
          to="/"
          type="h6"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          All reports 👈
        </Link>
      </Toolbar>
    </AppBar>
  );
};
