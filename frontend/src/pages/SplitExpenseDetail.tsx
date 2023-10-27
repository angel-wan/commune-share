import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  getExpenseById,
  removeExpense,
  listExpense,
} from "../feature/expense/expenseActions";
import { getUsergroupCode } from "../feature/usergroup/usergroupActions";

import SplitExpense from "../components/SplitExpense/SplitExpense";

const SplitExpenseDetail = () => {
  const navigate = useNavigate();
  const { expenseId } = useParams<{ expenseId: string }>();
  const { loading, selectedExpense, success } = useAppSelector(
    (state) => state.expense
  );
  const { code } = useAppSelector((state) => state.usergroup);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickRemove = () => {
    dispatch(removeExpense(expenseId ?? "")).then(() => {
      dispatch(listExpense());
      navigate(-1);
    });
  };

  useEffect(() => {
    if (expenseId) {
      dispatch(getExpenseById(expenseId)).then(() => {});
    }
  }, []);

  useEffect(() => {
    if (success) {
      if (selectedExpense?.userGroup) {
        dispatch(getUsergroupCode(selectedExpense!.userGroup));
      }
    }
  }, [success]);
  return (
    <Grid container marginTop={2} spacing={4} direction="column">
      <Grid item container direction="row">
        <Grid item container direction="column" spacing={1} sx={{ flex: 1 }}>
          <Grid item>
            <Typography variant="h5">
              {selectedExpense?.title} Expense
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">Invite code: {code}</Typography>
          </Grid>
        </Grid>

        <Grid item>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MoreVertOutlinedIcon />
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
              <MenuItem onClick={handleClickRemove}>Remove Expense</MenuItem>
            </Menu>
          </div>
        </Grid>
      </Grid>

      <Grid item sx={{ width: "100%" }}>
        <SplitExpense expenseId={expenseId ?? ""} />
      </Grid>
    </Grid>
  );
};

export default SplitExpenseDetail;
