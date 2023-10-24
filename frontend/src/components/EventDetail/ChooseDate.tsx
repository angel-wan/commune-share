import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React from "react";
import { Container } from "@mui/material";

export default function ChooseDate() {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2023-04-17T15:30")
  );

  return (
    <div>
      <Container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            sx={{ display: "flex", padding: "5px" , marginBottom:'20px',}}
            ampm={false}
            label="Pick your date and time for the event"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
          <DateTimePicker
            ampm={false}
            label="Pick your date and time for the event"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
          <DateTimePicker
            ampm={false}
            label="Pick your date and time for the event"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
          <DateTimePicker
            ampm={false}
            label="Pick your date and time for the event"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </LocalizationProvider>
      </Container>
      <p> newValue </p>
    </div>
  );
}
''