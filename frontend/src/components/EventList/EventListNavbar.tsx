import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";

const EventListNavbar = (props) => {
  const { setBarStatus, barStatus } = props;
  const [navbar_1, setNavbar_1] = useState(0);
  const [navbar_2, setNavbar_2] = useState(10);

  const handleChangeNavbar_1 = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    // setNavbar_1(newValue);
    setBarStatus(newValue);
    console.log(newValue);
    console.log(event);
  };
  const handleChangeNavbar_2 = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setNavbar_2(newValue);
    console.log(newValue);
    console.log(event);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={barStatus}
          onChange={handleChangeNavbar_1}
          aria-label="Event List Nav Bar"
          variant="fullWidth"
        >
          <Tab label="Upcoming Events" value={"UPCOMING"} />
          <Tab label="Pending Events" value={"PENDING"} />
          <Tab label="Past Events" value={"PAST"} />
        </Tabs>
      </Box>
      {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={navbar_2}
          onChange={handleChangeNavbar_2}
          aria-label="Event List Nav Bar"
          variant="fullWidth"
        >
          <Tab label="All Events" value={10} />
          <Tab label="Joining Events" value={11} />
          <Tab label="Hosting Events" value={12} />
        </Tabs>
      </Box> */}
    </Box>
  );
};

export default EventListNavbar;
