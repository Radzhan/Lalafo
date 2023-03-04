import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axiosApi from "../axiosApi";
import { Categories, ItemCard, ProductMutation } from "../types";
interface lalafoInterface {
  addItem: ProductMutation;
  arrayWithItem: ItemCard[];
  arrayWithCategories: Categories[];
}

const initialState: lalafoInterface = {
  addItem: {
    category: "",
    title: "",
    description: "",
    price: "",
    image: null,
  },
  arrayWithItem: [],
  arrayWithCategories: [],
};

export const getAllItems = createAsyncThunk<ItemCard[]>(
  "lalafo/getAllItem",
  async () => {
    const response = await axiosApi.get("/items");

    return response.data;
  }
);

export const getCategories = createAsyncThunk<Categories[]>(
  "lalafo/getCategories",
  async () => {
    const response = await axiosApi.get("/categories");

    return response.data;
  }
);

export const createItem = createAsyncThunk<
  void,
  ProductMutation,
  { state: RootState }
>("products/create", async (productMutation, { getState }) => {
  const user = getState().users.user;
  const formData = new FormData();

  const keys = Object.keys(productMutation) as (keyof ProductMutation)[];

  keys.forEach((key) => {
    const value = productMutation[key];

    if (value !== null) {
      formData.append(key, value);
    }
  });

  if (user) {
    await axiosApi.post("/items", formData, {
      headers: { Authorization: user.token },
    });
  }
});

export const lalafoSlice = createSlice({
  name: "lalafo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllItems.fulfilled, (state, action) => {
      state.arrayWithItem = action.payload;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.arrayWithCategories = action.payload;
    });
  },
});

export const lalafoReducer = lalafoSlice.reducer;

export const arrayItems = (state: RootState) => state.lalafo.arrayWithItem;
export const arrayCategories = (state: RootState) =>
  state.lalafo.arrayWithCategories;
export const addItem = (state: RootState) => state.lalafo.addItem;
