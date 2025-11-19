import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:4002/products";


export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const { data } = await axios.get(URL);
  return data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    filtrosAplicar: null, // estado para almacenar los filtros aplicados
    busqueda: "",
  },
  reducers: {        
    setFiltrosAplicar: (state, action) => { // agregamos una accion de filtros q llene la variable con los datos
    state.filtrosAplicar = action.payload;
    },
    setBusqueda: (state, action) => { // agregamos una accion de busqueda q llene la variable con los datos
    state.busqueda = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { setFiltrosAplicar } = productSlice.actions;
export const { setBusqueda } = productSlice.actions;
export default productSlice.reducer;