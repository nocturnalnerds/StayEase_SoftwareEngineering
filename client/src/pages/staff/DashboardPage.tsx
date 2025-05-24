import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
}));

const DashboardPage: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Item>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="body1">1,234</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            <Typography variant="h6">Active Users</Typography>
            <Typography variant="body1">567</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            <Typography variant="h6">New Signups</Typography>
            <Typography variant="body1">89</Typography>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <Typography variant="h6">Recent Activity</Typography>
            <Typography variant="body1">
              User A logged in. User B updated profile. User C created a new
              post.
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6">Sales Overview</Typography>
            <Typography variant="body1">
              Sales data will be displayed here.
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6">Performance Metrics</Typography>
            <Typography variant="body1">
              Performance metrics will be displayed here.
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
