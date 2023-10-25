import React, { useState } from "react";
import { Container, Button } from "@mui/material";
import { DatePicker } from "rsuite";
import isBefore from "date-fns/isBefore";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

export default function ChooseDate() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedDateAndTimeSlots, setSelectedDateAndTimeSlots] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDialogOpen(true);
  };

  const handleTimeSlotSelection = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setDialogOpen(false);
    setSelectedDateAndTimeSlots([
      ...selectedDateAndTimeSlots,
      { date: selectedDate, timeSlot: timeSlot },
    ]);
    setSelectedDate(null); // Reset the selected date after choosing a time slot
  };

    const handleSave = () => {
      console.log("Data to be saved:", selectedDateAndTimeSlots);
    };

  return (
    <div className="rs-theme-dark">
      <Container>
        <div className="rs-theme-dark">
          <Label style={{ display: "flex", marginTop: 10 }}>
            Select date that you want:{" "}
          </Label>
          <DatePicker
            value={selectedDate} // Set the value prop to control the selected date
            disabledDate={(date) => isBefore(date, new Date())}
            style={{ width: 200 }}
            onChange={handleDateChange}
          />
          <br />
          <div>
            <h2>All dates picked:</h2>
            <ul>
              {selectedDateAndTimeSlots.map((item, index) => (
                <li key={index}>
                  {`Date: ${item.date.toDateString()}, Session: ${
                    item.timeSlot
                  }`}
                </li>
              ))}
            </ul>
          </div>
          <Button variant="outlined" onClick={handleSave}>Save</Button>
        </div>
      </Container>
      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Select Time Slot</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please choose a time slot for the selected date.
          </DialogContentText>
          <Button onClick={() => handleTimeSlotSelection("Morning")}>
            Morning
          </Button>
          <Button onClick={() => handleTimeSlotSelection("Afternoon")}>
            Afternoon
          </Button>
          <Button onClick={() => handleTimeSlotSelection("Night")}>
            Night
          </Button>
          <Button onClick={() => handleTimeSlotSelection("Full Day")}>
            FULL DAY
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
