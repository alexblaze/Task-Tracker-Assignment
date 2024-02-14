import { Box, Button, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import React from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const TaskPage = () => {
  return (
    <Box p={4} sx={{ background: "#f5f5f5" }} height={"100dvh"}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TaskForm />
        </Grid>
        <Grid item xs={12}>
          <TaskList />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskPage;
