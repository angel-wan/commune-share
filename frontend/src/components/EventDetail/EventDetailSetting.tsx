import { Button, Container,  } from "@mui/material";


const EventDetailSetting = () => {

    return (
      <div>
        <Container>
          <Button variant="outlined" sx={{margin: "10px"}}>  Delete Event </Button>
          <Button variant="outlined" sx={{margin: "10px"}}> Remove participant(s)</Button>
        </Container>
      </div>
    );

};

export default EventDetailSetting;
