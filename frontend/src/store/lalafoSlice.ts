import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axiosApi from "../axiosApi";
import { Categories, Item, ItemCard, ItemMutation } from "../types";
interface lalafoInterface {
  item: Item;
  addItem: ItemMutation;
  forCreating: boolean;
  arrayWithItem: ItemCard[];
  arrayWithItemBoolean: boolean;
  oneItemBoolean: boolean;
  categoriItems: boolean;
  arrayWithCategoryItem: ItemCard[];
  arrayWithCategories: Categories[];
}

const initialState: lalafoInterface = {
  arrayWithItemBoolean: false,
  forCreating: false,
  oneItemBoolean: false,
  categoriItems: false,
  item: {
    displayname: '',
    number: '',
    _id: "",
    title: "",
    description: "",
    price: 0,
    image: null,
    category: "",
    user: "",
  },
  addItem: {
    category: "",
    title: "",
    description: "",
    price: "",
    image: null,
  },
  arrayWithItem: [],
  arrayWithCategoryItem: [],
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
  ItemMutation,
  { state: RootState }
>("products/create", async (productMutation, { getState }) => {
  const user = getState().users.user;
  const formData = new FormData();

  const keys = Object.keys(productMutation) as (keyof ItemMutation)[];

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

export const item = createAsyncThunk<Item, string>(
  "lalafo/getItem",
  async (arg) => {
    const request = await axiosApi.get("/items/" + arg);

    return request.data;
  }
);

export const getByItemGategory = createAsyncThunk<ItemCard[], string>(
  "lalafo/getByIdItem",
  async (arg) => {
    const request = await axiosApi.get("/categories/" + arg);
    return request.data;
  }
);

export const deleteItem = createAsyncThunk<void, string, { state: RootState }>(
  "lalafo/deleteItem",
  async (arg, { getState }) => {
    const token = getState().users.user?.token;

    await axiosApi.delete("/items/" + arg, {headers: {'Authorization': token}});
  }
);

export const lalafoSlice = createSlice({
  name: "lalafo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllItems.fulfilled, (state, action) => {
      state.arrayWithItem = action.payload;
      state.arrayWithItemBoolean = false;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.arrayWithCategories = action.payload;
    });
    builder.addCase(item.fulfilled, (state, action) => {
      state.item = action.payload;
      state.oneItemBoolean = false;
    });
    builder.addCase(item.pending, (state) => {
      state.oneItemBoolean = true;
    });
    builder.addCase(item.rejected, (state) => {
      state.oneItemBoolean = false;
    });
    builder.addCase(createItem.pending, (state) => {
      state.forCreating = true;
    });
    builder.addCase(createItem.fulfilled, (state) => {
      state.forCreating = false;
    });
    builder.addCase(createItem.rejected, (state) => {
      state.forCreating = false;
    });
    builder.addCase(getAllItems.pending, (state) => {
      state.arrayWithItemBoolean = true;
    });
    builder.addCase(getAllItems.rejected, (state) => {
      state.arrayWithItemBoolean = false;
    });
    builder.addCase(getByItemGategory.pending, (state) => {
      state.arrayWithItemBoolean = true;
    });
    builder.addCase(getByItemGategory.rejected, (state) => {
      state.arrayWithItemBoolean = false;
    });
    builder.addCase(getByItemGategory.fulfilled, (state, action) => {
      state.arrayWithItemBoolean = false;
      state.arrayWithCategoryItem = action.payload;
    });
  },
});

export const lalafoReducer = lalafoSlice.reducer;

export const arrayItems = (state: RootState) => state.lalafo.arrayWithItem;
export const arrayCategories = (state: RootState) =>
  state.lalafo.arrayWithCategories;
export const addItem = (state: RootState) => state.lalafo.addItem;
export const getOneItem = (state: RootState) => state.lalafo.item;
export const forCreating = (state: RootState) => state.lalafo.forCreating;
export const oneItemBoolean = (state: RootState) => state.lalafo.oneItemBoolean;
export const categoriItems = (state: RootState) => state.lalafo.categoriItems;
export const forItem = (state: RootState) => state.lalafo.arrayWithItemBoolean;
export const categoryArray = (state: RootState) =>
  state.lalafo.arrayWithCategoryItem;
