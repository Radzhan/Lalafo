import { createSlice } from "@reduxjs/toolkit";
interface controlWorkInterface {
}

const initialState: controlWorkInterface = {
};



export const controlWorkSlice = createSlice({
  name: "controlWork",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  },
});

export const controlWorkReducer = controlWorkSlice.reducer;