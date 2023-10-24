import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import {
  Container,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function ChooseDate() {
  const maxTimeslots = 10;
  const initialTimeslots = Array(4).fill(dayjs("2023-04-17T15:30"));

  const [timeslots, setTimeslots] = useState<Dayjs[]>(initialTimeslots);
  const [value, setValue] = useState<Dayjs | null>(dayjs("2023-04-17T15:30"));

  const handleAddTimeslot = () => {
    if (timeslots.length < maxTimeslots) {
      setTimeslots([...timeslots, value]);
      setValue(dayjs("2023-04-17T15:30")); // Reset the date picker
    } else {
      return null;
    }
  };


  return (
    <div>
      <Container>
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
            sx={{display:'flex', margin:'10px',}}
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

    </div>
  );
}
