// store/discotecheSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Discoteca } from "@/type";
import getDiscoteche from "@/actions/getDiscoteche";

// Simula una funzione che esegue la richiesta per ottenere i dati delle discoteche dall'API
const fetchDiscotecheData = async () => {
  // Codice per ottenere i dati delle discoteche dall'API
  // Supponiamo che i dati vengano restituiti come un array di oggetti di tipo Discoteca
  const discotecheData: Discoteca[] = await getDiscoteche();
  return discotecheData;
};

// Crea un'azione asincrona utilizzando createAsyncThunk
export const loadDiscoteche = createAsyncThunk("discoteche/load", async () => {
  const discotecheData = await fetchDiscotecheData();
  return discotecheData;
});

type InitialState = {
  discoteche: Discoteca[];
  loading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  discoteche: [],
  loading: false,
  error: null,
};

const discotecheSlice = createSlice({
  name: "discoteche",
  initialState,
  reducers: {
    searchDisco: (state, action: PayloadAction<string>) => {
      state.discoteche.filter((item) => item.name.toLowerCase().includes(action.payload.toLowerCase()))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDiscoteche.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadDiscoteche.fulfilled,
        (state, action: PayloadAction<Discoteca[]>) => {
          state.loading = false;
          state.error = null;
          state.discoteche = action.payload;
        }
      )
      .addCase(loadDiscoteche.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Errore durante il caricamento delle discoteche.";
      });
  },
});

export const {searchDisco} = discotecheSlice.actions
export default discotecheSlice.reducer;
