import React, { useState } from "react";
<<<<<<< Updated upstream
import { Container, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
=======
import { Container } from "@mui/material";
import { DatePicker } from "rsuite";
import isBefore from "date-fns/isBefore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

// Enable dark mode
import "rsuite/dist/rsuite-no-reset.min.css";

const Label = (props) => {
  return (
    <label
      style={{ width: 120, display: "inline-block", marginTop: 10 }}
      {...props}
    />
  );
};
>>>>>>> Stashed changes

export default function ChooseDate() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedDateAndTimeSlots, setSelectedDateAndTimeSlots] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDialogOpen(true);
  };

<<<<<<< Updated upstream
=======
  const handleTimeSlotSelection = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setDialogOpen(false);
    setSelectedDateAndTimeSlots([
      ...selectedDateAndTimeSlots,
      { date: selectedDate, timeSlot: timeSlot },
    ]);
  };

>>>>>>> Stashed changes
  return (
    <div className="rs-theme-dark">
      <Container>
<<<<<<< Updated upstream
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {timeslots.map((timeslot, index) => (
            <DateTimePicker
              key={index}
              ampm={false}
              label={`Pick timeslot #${index + 1}`}
              value={timeslot}
              onChange={(newValue) => {
                const newTimeslots = [...timeslots];
                newTimeslots[index] = newValue;
                setTimeslots(newTimeslots);
              }}
            />
          ))}
          <Button
            sx={{ display: "flex", margin: "10px" }}
            variant="outlined"
            onClick={handleAddTimeslot}
            disabled={timeslots.length >= maxTimeslots}
          >
            Add More Timeslot
          </Button>
        </LocalizationProvider>
      </Container>
      <p>
        Selected Date and Time:
        {timeslots.map((timeslot, index) => (
          <span key={index}>{timeslot.format("YYYY-MM-DD HH:mm")}, </span>
        ))}
      </p>
=======
        <div className="rs-theme-dark">
          <Label style={{ display: "flex", marginTop: 10 }}>
            Select date that you want:{" "}
          </Label>
          <DatePicker
            disabledDate={(date) => isBefore(date, new Date())}
            style={{ width: 200 }}
            onChange={handleDateChange}
          />
          <br />
        </div>
      </Container>
      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Select Time Slot</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please choose a time slot for the selected date.
          </DialogContentText>
          <Button onClick={() => handleTimeSlotSelection("AM 10:00-14:00")}>
            AM 10:00-14:00
          </Button>
          <Button onClick={() => handleTimeSlotSelection("PM 14:00-18:00")}>
            PM 14:00-18:00
          </Button>
          <Button onClick={() => handleTimeSlotSelection("NIGHT 18:00-22:00")}>
            NIGHT 18:00-22:00
          </Button>
          <Button onClick={() => handleTimeSlotSelection("FULL DAY")}>
            FULL DAY
          </Button>
        </DialogContent>
      </Dialog>
      <div>
        <h2>All dates picked:</h2>
        <ul>
          {selectedDateAndTimeSlots.map((item, index) => (
            <li key={index}>
              {`Date: ${item.date.toDateString()}, Time Slot: ${item.timeSlot}`}
            </li>
          ))}
        </ul>
      </div>
>>>>>>> Stashed changes
    </div>
  );
}
