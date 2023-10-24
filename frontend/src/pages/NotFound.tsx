import { Container, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container sx={{ marginTop: '50px', display:'flex', alignItems: "center", justifyContent: "center", }}>
      <Typography variant="h2">404 - Page NotFound</Typography>
    </Container>
  );
};

export default NotFound;
