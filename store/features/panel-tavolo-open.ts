// store/discotecheSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Discoteca } from "@/type";
import getDiscoteche from "@/actions/getDiscoteche";

type InitialState = {
    open: boolean
};

const initialState: InitialState = {
    open: false
};

const openTavolo = createSlice({
  name: "opentavolo",
  initialState,
  reducers: {
    openTavoloPlease: (state, action: PayloadAction<boolean>) => {
        state.open = action.payload
    },
  },
});

export const { openTavoloPlease } = openTavolo.actions;
export default openTavolo.reducer;