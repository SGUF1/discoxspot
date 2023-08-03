import { configureStore } from "@reduxjs/toolkit";
import discotecheSlice from "./features/search-discoteca";
import openTavolo from "./features/panel-tavolo-open";
import userIdSet from "./features/user-id";
import { useSelector, TypedUseSelectorHook } from "react-redux";


export const store = configureStore({
  reducer: {
    discoteche: discotecheSlice,
    open: openTavolo,
    userId: userIdSet,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
