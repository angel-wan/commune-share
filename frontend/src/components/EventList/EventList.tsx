import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
} from "@mui/material";
import EventItem from "./EventItem";

const EventList = () => {
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      justifyContent="flex-start"
      alignItems="center"
      sx={{ p: 1, width: "1", maxWidth: 1200 }}
    >
      <Grid
        item
        sx={{
          width: 1,
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            bgcolor: "#111111",
            color: "grey.300",
            border: "1px solid",
            borderColor: "grey.800",
            borderRadius: 2,
            width: 1,
          }}
        >
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                {/* {todos.map((todo) => ( */}
                <EventItem />
                {/* ))} */}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default EventList;
