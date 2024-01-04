// store/discotecheSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Discoteca } from "@/type";
import getDiscoteche from "@/actions/getDiscoteche";

type InitialState = {
    openLeft: boolean
};

const initialState: InitialState = {
    openLeft: false
};

const openLeftBar = createSlice({
    name: "leftBar",
    initialState,
    reducers: {
        openLeftPlease: (state, action: PayloadAction<boolean>) => {
            state.openLeft = action.payload
        },
    },
});

export const { openLeftPlease } = openLeftBar.actions;
export default openLeftBar.reducer;