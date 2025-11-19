import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_URL = "http://localhost:4002/api/v1/auth";
const USERS_URL = "http://localhost:4002/users"

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser", 
  async (formData, {rejectWithValue}) => { // pedimos el bearer al back con los datos y luego pedimos los datos del usuario con ese token
    try{
      const response = await axios.post(`${AUTH_URL}/authenticate`, formData);
      
      const token = response.data.access_token || response.data.token || response.data.tokenJwt;
      if (!token) return rejectWithValue("No se recibió token del servidor");
      
      const responseUser = await axios.get(`${USERS_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {token: token, userEnSesion: responseUser.data};
    }
    catch (err){
      return rejectWithValue(err.message || "Correo o contraseña incorrectos");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${AUTH_URL}/register`, formData); // registramos el usaurio

      const token = response.data.access_token || response.data.token || response.data.tokenJwt; // agarramos el token para agarrarlo
      if (!token) return rejectWithValue("No se recibió token del servidor");

      //Necesitamos el idUsuario
      const responseUser = await axios.get(`${USERS_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {token: token, userEnSesion: responseUser.data};

    }catch (err) {
      return rejectWithValue(err.message || "Correo o contraseña incorrectos");
    }
})

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    userEnSesion: null,
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userEnSesion = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.token = action.payload.token; // cargamos los datos del usuario en estado global
        state.userEnSesion = action.payload.userEnSesion;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.error = action.payload || "Error en la autenticación";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;