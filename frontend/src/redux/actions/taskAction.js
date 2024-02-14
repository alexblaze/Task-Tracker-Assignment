import toast from "react-hot-toast";
import axiosInstance from "../../apis/axiosInterceptor";
import * as actionTypes from "../types/types";

export const fetchTask = (path, params) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_DATA_START });
    try {
      const response = await axiosInstance.get(path, { params: params });
      dispatch({
        type: actionTypes.FETCH_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: actionTypes.FETCH_DATA_FAILURE, error: err.message });
      toast.error(err.message);
    }
  };
};

export const postTask = (formData) => {
  return async (dispatch) => {
    try {
      await axiosInstance.post("/", formData);
      dispatch(fetchTask(""));
      toast.success("Task created successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };
};

export const deleteTask = (id) => {
  return async (dispatch) => {
    try {
      await axiosInstance.delete(`/${id}`);
      dispatch(removeItem(id));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };
};

export const completeTask = (id) => {
  return async (dispatch) => {
    try {
      await axiosInstance.put(`/${id}`);
      dispatch(updateStatus(id));
      toast.success("Task completed successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };
};

export const removeItem = (key) => {
  return { type: actionTypes.DELETE_ROW, payload: key };
};

export const updateStatus = (key) => {
  return { type: actionTypes.COMPLETE_TASK, payload: key };
};

export const clearData = () => {
  return {
    type: actionTypes.CLEAR_DATA,
  };
};
