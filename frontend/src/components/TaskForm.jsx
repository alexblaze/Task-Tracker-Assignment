import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { useDispatch, useSelector } from "react-redux";
import { postTask } from "../redux/actions/taskAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TaskForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [validationError, setValidationError] = useState({
    title: "",
    description: "",
  });

  const isMobile = useMediaQuery("(max-width:600px)");
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const isLoading = useSelector((state) => state.task.isLoading);
  const isSuccess = useSelector((state) => state.task.success);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    setValidationError((prevValidationError) => ({
      ...prevValidationError,
      [name]: "",
    }));
  };

  const resetForm = () => {
    setFormData({ title: "", description: "" });
    setValidationError({ title: "", description: "" });
  };

  const handleSubmit = () => {
    if (!formData.title) {
      setValidationError((prevValidationError) => ({
        ...prevValidationError,
        title: "Title is required!",
      }));
    }
    if (!formData.description) {
      setValidationError((prevValidationError) => ({
        ...prevValidationError,
        description: "Description is required!",
      }));
    }

    // Check if any field is empty
    if (!formData.title || !formData.description) {
      return;
    }

    // Dispatch the postTask action if validation passes
    dispatch(postTask(formData));
    if (isSuccess) {
      resetForm();
    }
  };

  return (
    <Box>
      <Box
        display={"flex"}
        gap={"16px"}
        textAlign={isMobile && "center"}
        flexDirection={isMobile ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <Typography variant='h5' fontWeight={700}>
          Task Tracker Assignment
        </Typography>
        <Button variant='contained' onClick={handleOpen}>
          Add Task
        </Button>
      </Box>
      {modalOpen && (
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={modalOpen}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalOpen}>
            <Box sx={style}>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant='h6'>Add Task Form</Typography>
                <IconButton onClick={handleClose}>
                  <svg
                    width='25'
                    height='25'
                    viewBox='0 0 25 25'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M7.06641 17.7428L12.3094 12.4998L17.5524 17.7428M17.5524 7.25684L12.3084 12.4998L7.06641 7.25684'
                      stroke='#1E1E1E'
                      stroke-width='1.5'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </IconButton>
              </Grid>

              <Divider />
              <Grid container spacing={3} mt={1}>
                <Grid item xs={12}>
                  <TextField
                    name='title'
                    label='Task Title'
                    fullWidth
                    value={formData.title}
                    onChange={handleChange}
                    error={!!validationError.title}
                    helperText={validationError.title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='description'
                    label='Task Description'
                    fullWidth
                    multiline={true}
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    error={!!validationError.description}
                    helperText={validationError.description}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "12px",
                  }}
                >
                  <Button onClick={resetForm} variant='outlined' color='error'>
                    Clear
                  </Button>
                  <Button
                    variant='contained'
                    onClick={handleSubmit}
                    disabled={isLoading}
                    color='success'
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      )}
    </Box>
  );
};

export default TaskForm;
