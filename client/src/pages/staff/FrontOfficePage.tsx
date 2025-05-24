import type React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const FrontOfficePage: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Front Office Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6">Total Bookings</Typography>
            <Typography variant="h5">150</Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6">Available Rooms</Typography>
            <Typography variant="h5">25</Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6">Occupancy Rate</Typography>
            <Typography variant="h5">85%</Typography>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6">Arrivals Today</Typography>
            <Typography variant="body1">John Doe - Room 101</Typography>
            <Typography variant="body1">Jane Smith - Room 202</Typography>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6">Departures Today</Typography>
            <Typography variant="body1">Peter Jones - Room 303</Typography>
            <Typography variant="body1">Alice Brown - Room 404</Typography>
          </StyledPaper>
        </Grid>

        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6">Recent Activity</Typography>
            <Typography variant="body1">
              Booking confirmed for John Doe
            </Typography>
            <Typography variant="body1">
              Check-in completed for Jane Smith
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FrontOfficePage;
