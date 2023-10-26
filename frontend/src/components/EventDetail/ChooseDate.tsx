import { useState } from "react";
import { Container, Button } from "@mui/material";
import { DatePicker } from "rsuite";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import isBefore from "date-fns/isBefore";
import isAfter from "date-fns/isAfter";
// Enable dark mode

import "rsuite/dist/rsuite-no-reset.min.css";
import "./date.css";

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
}

interface DateAndTimeSlots {
  date: Date;
  timeSlot: string;
}
export default function ChooseDate(props: ChooseDateProps) {
  const { eventStartDate, eventEndDate } = props;
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedDateAndTimeSlots, setSelectedDateAndTimeSlots] = useState<
    Array<DateAndTimeSlots>
  >([]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setDialogOpen(true);
  };

  const handleTimeSlotSelection = (timeSlot: string) => {
    if (!selectedDate) return;
    setDialogOpen(false);
    setSelectedDateAndTimeSlots([
      ...selectedDateAndTimeSlots,
      { date: selectedDate, timeSlot: timeSlot },
    ]);
    setSelectedDate(undefined); // Reset the selected date after choosing a time slot
  };

  const handleSave = () => {
    console.log("Data to be saved:", selectedDateAndTimeSlots);
  };

  const removeSelectedDate = (e) => {
    setSelectedDateAndTimeSlots(
      selectedDateAndTimeSlots.filter((item) => item !== e)
    );
  };

  return (
    <div className="rs-theme-dark">
      <Container>
        <div className="rs-theme-dark">
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
            onChange={handleDateChange}
          />
          <br />
          <div>
            <h2>All dates picked:</h2>
            <ul>
              {selectedDateAndTimeSlots.map((item, index) => (
                <div style={{ display: "flex" }}>
                  <li key={index}>
                    {`Date: ${item.date.toDateString()}, Session: ${
                      item.timeSlot
                    }`}
                  </li>
                  <Button onClick={() => removeSelectedDate(item)}>
                    Remove
                  </Button>
                </div>
              ))}
            </ul>
          </div>
          <Button variant="outlined" onClick={handleSave}>
            Save
          </Button>
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
