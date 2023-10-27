import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import { DatePicker } from "rsuite";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import isBefore from "date-fns/isBefore";
import isAfter from "date-fns/isAfter";
import { TimeSlotType, Period } from "../../feature/event/eventSlice";
// Enable dark mode
import { getEventById } from "../../feature/event/eventActions";

import "rsuite/dist/rsuite-no-reset.min.css";
import "./date.css";
import { updateEvent } from "../../feature/event/eventActions";
import { useAppDispatch, useAppSelector } from "../../app/hook";

const Label = (props) => {
  return (
    <label
      style={{ width: 120, display: "inline-block", marginTop: 10 }}
      {...props}
    />
  );
};

interface ChooseDateProps {
  eventStartDate: Date;
  eventEndDate: Date;
  event_id: string;
  schedule: {
    slots: Array<TimeSlotType>;
    user: string;
  }[];
  selectedTimeSlots: Array<TimeSlotType>;
}

export default function ChooseDate(props: ChooseDateProps) {
  const {
    eventStartDate,
    eventEndDate,
    event_id,
    schedule,
    selectedTimeSlots,
  } = props;
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedDateAndTimeSlots, setSelectedDateAndTimeSlots] =
    useState<Array<TimeSlotType>>(selectedTimeSlots);

  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setDialogOpen(true);
  };

  const handleTimeSlotSelection = (timeSlot: Period) => {
    if (!selectedDate) return;
    setDialogOpen(false);
    setSelectedDateAndTimeSlots([
      ...selectedDateAndTimeSlots,
      { date: selectedDate, period: timeSlot },
    ]);
    setSelectedDate(undefined); // Reset the selected date after choosing a time slot
  };

  const handleSave = () => {
    console.log("Data to be saved:", selectedDateAndTimeSlots);
    dispatch(
      updateEvent({
        eventId: event_id,
        slots: selectedDateAndTimeSlots,
      })
    ).then(() => {
      dispatch(getEventById(event_id));
    });
  };

  const removeSelectedDate = (e: {
    date: Date;
    period: Period;
    _id: string;
  }) => {
    setSelectedDateAndTimeSlots(
      selectedDateAndTimeSlots.filter((item) => item !== e)
    );
  };

  return (
    <div className="rs-theme-dark">
      <Grid
        sx={{
          backgroundColor: "#1a1d24",
          alignItems: "center",
          border: "0.5px solid",
          borderRadius: 4,
          spacing: 0,
          p: 1,
          cursor: "pointer",
        }}
      >
        <Grid sx={{ padding: "10px" }}>
          <Label style={{ display: "flex", marginTop: 10 }}>
            Select date that you available:{" "}
          </Label>
          <DatePicker
            value={selectedDate} // Set the value prop to control the selected date
            style={{ width: 200 }}
            shouldDisableDate={(date) =>
              isBefore(date, new Date(eventStartDate)) ||
              isAfter(date, new Date(eventEndDate))
            }
            className="rs-theme-dark"
            onChange={(date) => handleDateChange(date!)}
          />
          <br />
          <div>
            <h2>All dates picked:</h2>
            <ul>
              {selectedDateAndTimeSlots.map((item, index) => (
                <div
                  key={`${item.date} - ${index}`}
                  style={{
                    display: "flex",
                    marginTop: "10px",
                    alignItems: "center",
                  }}
                >
                  <li key={index}>
                    {`Date: ${new Date(item.date).toLocaleString()}, Session: ${
                      item.period
                    }`}
                  </li>
                  <Button
                    variant="outlined"
                    sx={{ marginLeft: "10px" }}
                    onClick={() => removeSelectedDate(item)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </ul>
            <h2>Your dates picked:</h2>

            <ul>
              {selectedTimeSlots.map((item, index) => (
                <li key={index}>
                  {`Date: ${new Date(item.date).toLocaleString()}, Session: ${
                    item.period
                  }`}
                </li>
              ))}
            </ul>
            <h2>Dates picked by others:</h2>
            <ul>
              {schedule.map((item) => {
                if (item.user.toString() !== userInfo!.id.toString()) {
                  return item.slots.map((slot, index) => (
                    <li key={index}>
                      {`Date: ${new Date(
                        slot.date
                      ).toLocaleString()}, Session: ${slot.period}`}
                    </li>
                  ));
                }
              })}
            </ul>
            <h2>Common Date</h2>
            {/* {schedule.map((item, index) => (

            )} */}
            {/* TODO: ANGEL */}
            <Button variant="outlined" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Grid>
      </Grid>
      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Select Time Slot</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please choose a time slot for the selected date.
          </DialogContentText>
          <Button onClick={() => handleTimeSlotSelection(Period.MORNING)}>
            Morning
          </Button>
          <Button onClick={() => handleTimeSlotSelection(Period.AFTERNOON)}>
            Afternoon
          </Button>
          <Button onClick={() => handleTimeSlotSelection(Period.NIGHT)}>
            Night
          </Button>
          <Button onClick={() => handleTimeSlotSelection(Period.ALL_DAY)}>
            FULL DAY
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
