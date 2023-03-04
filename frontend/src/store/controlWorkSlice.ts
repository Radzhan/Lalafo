import { createSlice } from "@reduxjs/toolkit";
interface lalafoInterface {
}

const initialState: lalafoInterface = {
};



export const lalafoSlice = createSlice({
  name: "lalafo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  },
});

export const lalafoReducer = lalafoSlice.reducer;