import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearData,
  completeTask,
  deleteTask,
  fetchTask,
} from "../redux/actions/taskAction";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  fontSize: "15px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const TaskList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.task.data);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleCompleted = (id) => {
    dispatch(completeTask(id));
  };

  useEffect(() => {
    dispatch(fetchTask(""));

    return () => {
      dispatch(clearData());
    };
  }, [dispatch]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h6' fontWeight={700}>
            Task List
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size='small'>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='left'>Title</StyledTableCell>
                  <StyledTableCell align='left'>Description</StyledTableCell>
                  <StyledTableCell align='center'>Status</StyledTableCell>
                  <StyledTableCell align='center'>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.length === 0 ? (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align='right' sx={{ fontWeight: 700 }}>
                      No Record Found
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.map((row) => (
                    <StyledTableRow key={row.id}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell align='center'>
                        {row.completed ? "Completed" : "Pending"}
                      </TableCell>
                      <TableCell align='center'>
                        <Grid>
                          <IconButton onClick={() => handleDelete(row.id)}>
                            <Tooltip title='Delete Task'>
                              <svg
                                width='32'
                                height='32'
                                viewBox='0 0 32 32'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <rect
                                  width='32'
                                  height='32'
                                  rx='16'
                                  fill='#F0D4D2'
                                />
                                <path
                                  d='M10.7 8C10.8657 8 11 7.86569 11 7.7V6.3C11 6.13431 11.1343 6 11.3 6H20.7C20.8657 6 21 6.13431 21 6.3V7.7C21 7.86569 21.1343 8 21.3 8H25.7C25.8657 8 26 8.13431 26 8.3V9.7C26 9.86569 25.8657 10 25.7 10H24.3C24.1343 10 24 10.1343 24 10.3V25C24 25.2652 23.8946 25.5196 23.7071 25.7071C23.5196 25.8946 23.2652 26 23 26H9C8.73478 26 8.48043 25.8946 8.29289 25.7071C8.10536 25.5196 8 25.2652 8 25V10.3C8 10.1343 7.86569 10 7.7 10H6.3C6.13431 10 6 9.86569 6 9.7V8.3C6 8.13431 6.13431 8 6.3 8H10.7ZM10.3 10C10.1343 10 10 10.1343 10 10.3V23.7C10 23.8657 10.1343 24 10.3 24H21.7C21.8657 24 22 23.8657 22 23.7V10.3C22 10.1343 21.8657 10 21.7 10H10.3ZM13 13.3C13 13.1343 13.1343 13 13.3 13H14.7C14.8657 13 15 13.1343 15 13.3V20.7C15 20.8657 14.8657 21 14.7 21H13.3C13.1343 21 13 20.8657 13 20.7V13.3ZM17 13.3C17 13.1343 17.1343 13 17.3 13H18.7C18.8657 13 19 13.1343 19 13.3V20.7C19 20.8657 18.8657 21 18.7 21H17.3C17.1343 21 17 20.8657 17 20.7V13.3Z'
                                  fill='#B3261E'
                                />
                              </svg>
                            </Tooltip>
                          </IconButton>
                          <IconButton
                            onClick={() => handleCompleted(row.id)}
                            disabled={row.completed}
                          >
                            <Tooltip title='Mark as Completed'>
                              {row.completed ? (
                                <svg
                                  width='32'
                                  height='32'
                                  viewBox='0 0 32 32'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <g opacity='0.4'>
                                    <rect
                                      width='32'
                                      height='32'
                                      rx='16'
                                      fill='#CEE7D2'
                                    />
                                    <path
                                      d='M16 7.66699C11.4166 7.66699 7.66663 11.417 7.66663 16.0003C7.66663 20.5837 11.4166 24.3337 16 24.3337C20.5833 24.3337 24.3333 20.5837 24.3333 16.0003C24.3333 11.417 20.5833 7.66699 16 7.66699ZM16 22.667C12.325 22.667 9.33329 19.6753 9.33329 16.0003C9.33329 12.3253 12.325 9.33366 16 9.33366C19.675 9.33366 22.6666 12.3253 22.6666 16.0003C22.6666 19.6753 19.675 22.667 16 22.667ZM19.825 12.317L14.3333 17.8087L12.175 15.6587L11 16.8337L14.3333 20.167L21 13.5003L19.825 12.317Z'
                                      fill='#088720'
                                    />
                                  </g>
                                </svg>
                              ) : (
                                <svg
                                  width='32'
                                  height='32'
                                  viewBox='0 0 32 32'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <rect
                                    width='32'
                                    height='32'
                                    rx='16'
                                    fill='#CEE7D2'
                                  />
                                  <path
                                    d='M16 7.66699C11.4166 7.66699 7.66663 11.417 7.66663 16.0003C7.66663 20.5837 11.4166 24.3337 16 24.3337C20.5833 24.3337 24.3333 20.5837 24.3333 16.0003C24.3333 11.417 20.5833 7.66699 16 7.66699ZM16 22.667C12.325 22.667 9.33329 19.6753 9.33329 16.0003C9.33329 12.3253 12.325 9.33366 16 9.33366C19.675 9.33366 22.6666 12.3253 22.6666 16.0003C22.6666 19.6753 19.675 22.667 16 22.667ZM19.825 12.317L14.3333 17.8087L12.175 15.6587L11 16.8337L14.3333 20.167L21 13.5003L19.825 12.317Z'
                                    fill='#088720'
                                  />
                                </svg>
                              )}
                            </Tooltip>
                          </IconButton>
                        </Grid>
                      </TableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskList;
