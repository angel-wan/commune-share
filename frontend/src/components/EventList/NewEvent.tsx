import { useState, Fragment, useCallback } from "react";
import { DateRange, DateRangeProps } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { createEvent, EventData } from "../../feature/event/eventActions";

const NewEvent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.userInfo);
  const { loading, success } = useAppSelector((state) => state.event);

  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selection, setSelection] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const initialEventData: EventData = {
    title: "",
    description: "",
    location: "",
    creator: user?.id ?? "",
    eventStartDate: new Date(),
    eventEndDate: new Date(),
  };
  const [eventData, setEventData] = useState(initialEventData);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrorMsg("");
    setEventData(initialEventData);
    setOpen(false);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventData({ ...eventData, [event.target.id]: event.target.value });
  };

  const handleDateRange = (item: DateRangeProps) => {
    setSelection([item.selection]);
  };

  const handleClickCreate = () => {
    setErrorMsg("");
    eventData.eventStartDate = selection[0].startDate;
    eventData.eventEndDate = selection[0].endDate;

    if (
      !eventData.title ||
      !eventData.eventStartDate ||
      !eventData.eventEndDate
    ) {
      setErrorMsg("Title or day range is missing.");
      return;
    }

    console.log("Create Event ", eventData);
    dispatch(createEvent(eventData));
    handleClose();
  };

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Event
      </Button>
      <Dialog fullWidth={true} maxWidth={"lg"} open={open}>
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={eventData.title}
            onChange={handleInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={eventData.description}
            onChange={handleInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="location"
            label="Location"
            type="text"
            fullWidth
            variant="standard"
            value={eventData.location}
            onChange={handleInput}
          />
          <DialogContentText pt={2}>Possible Day Range:</DialogContentText>
          <DateRange ranges={selection} onChange={handleDateRange} />
          {errorMsg && (
            <DialogContentText
              sx={{
                color: "#f14444",
                width: "100%",
                mt: "10px",
              }}
            >
              {errorMsg}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Grid container px={4} pb={3} spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth={true}
                onClick={handleClickCreate}
                disabled={loading}
              >
                Create
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth={true}
                color="error"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default NewEvent;
