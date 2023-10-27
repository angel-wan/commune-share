import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector } from "../app/hook";
import Logout from "./Auth/Logout";

const Navbar = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickHome = () => {
    handleClose();
    navigate("/", {});
  };

  const handleClickUserProfile = () => {
    handleClose();
    navigate("/user-profile", {});
  };

  const handleClickSplitExpense = () => {
    handleClose();
    navigate("/split-expense", {});
  };

  return (
    <Container maxWidth="lg" style={{ margin: "auto" }}>
      <AppBar
        position="static"
        style={{
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              component="a"
              onClick={handleClickHome}
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              GatherGuru
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <AccountCircleIcon />
            <Typography variant="h6" px={0.5}>
              {userInfo?.username}
            </Typography>
          </Box>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* <MenuItem onClick={handleClickUserProfile}>User Profile</MenuItem> */}
              <MenuItem onClick={handleClickHome}>My Events</MenuItem>
              <MenuItem onClick={handleClickSplitExpense}>
                Split Expense
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Logout />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Container>
  );
};

export default Navbar;
