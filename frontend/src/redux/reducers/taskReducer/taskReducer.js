import * as actionTypes from "../../types/types";

const initialState = {
  data: [],
  isLoading: false,
  success: false,
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_START:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
      };

    case actionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        success: true,
        error: null,
      };

    case actionTypes.FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.error,
      };

    case actionTypes.DELETE_ROW:
      return deleteRow(state, action.payload);

    case actionTypes.COMPLETE_TASK:
      return updateRowStatus(state, action.payload);

    case actionTypes.CLEAR_DATA:
      return {
        ...state,
        data: [],
      };

    default:
      return state;
  }
};

const deleteRow = (state, id) => {
  const newData = state.data.filter((item) => item.id !== id);

  return {
    ...state,
    data: newData,
  };
};

const updateRowStatus = (state, id) => {
  const newData = state.data.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        completed: true,
      };
    }
    return item;
  });

  return {
    ...state,
    data: newData,
  };
};

export default taskReducer;
