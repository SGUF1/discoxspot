// store/discotecheSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Discoteca } from "@/type";
import getDiscoteche from "@/actions/getDiscoteche";

type InitialState = {
    userId: string
};

const initialState: InitialState = {
    userId: ""
};

const userIdSet = createSlice({
    name: "userIdSet",
    initialState,
    reducers: {
        setUserIdPlease: (state, action: PayloadAction<string>) => {
            state.userId = action.payload
        },
    },
});

export const { setUserIdPlease } = userIdSet.actions;
export default userIdSet.reducer;