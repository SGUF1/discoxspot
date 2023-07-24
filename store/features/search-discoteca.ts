// store/discotecheSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Discoteca } from "@/type";
import getDiscoteche from "@/actions/getDiscoteche";

type InitialState = {
  ricerca: string
  loading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  ricerca: "",
  loading: false,
  error: null,
};

const discotecheSlice = createSlice({
  name: "discoteche",
  initialState,
  reducers: {
    searchDisco: (state, action: PayloadAction<string>) => {
      state.ricerca = action.payload
    }
  },
  
});

export const {searchDisco} = discotecheSlice.actions
export default discotecheSlice.reducer;
