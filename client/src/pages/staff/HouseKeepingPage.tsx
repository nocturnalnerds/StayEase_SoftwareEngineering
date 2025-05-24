import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";

const HouseKeepingPage = () => {
  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%", // Ensure paper fills the grid height
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }));

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Housekeeping Management
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Room Status */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Room Status
            </Typography>
            <Typography variant="body1">
              View and manage the status of each room.
            </Typography>
          </StyledPaper>
        </Grid>

        {/* Cleaning Schedules */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Cleaning Schedules
            </Typography>
            <Typography variant="body1">
              Create and manage cleaning schedules for rooms.
            </Typography>
          </StyledPaper>
        </Grid>

        {/* Inventory Management */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Inventory Management
            </Typography>
            <Typography variant="body1">
              Manage cleaning supplies and inventory levels.
            </Typography>
          </StyledPaper>
        </Grid>

        {/* Staff Assignments */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Staff Assignments
            </Typography>
            <Typography variant="body1">
              Assign cleaning tasks to staff members.
            </Typography>
          </StyledPaper>
        </Grid>

        {/* Reports and Analytics */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Reports and Analytics
            </Typography>
            <Typography variant="body1">
              Generate reports on cleaning performance and efficiency.
            </Typography>
          </StyledPaper>
        </Grid>

        {/* Settings */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>
            <Typography variant="body1">
              Configure housekeeping settings and preferences.
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HouseKeepingPage;
