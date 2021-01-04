import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, loginFacebookAPI, loginGoogleAPI, signupAPI, logoutAPI } from 'app/api/auth';
import { history } from 'index';

export const login = createAsyncThunk(
  'auth/loginSuccess',
  async ({ email, password }) => {
    const response = await loginAPI({ email, password });
    return response;
  }
);

export const loginGoogle = createAsyncThunk(
  'auth/loginSuccess',
  async ({ oAuthAccessToken }) => {
    const response = await loginGoogleAPI({ oAuthAccessToken });
    return response;
  }
);

export const loginFacebook = createAsyncThunk(
  'auth/loginSuccess',
  async ({ oAuthAccessToken }) => {
    const response = await loginFacebookAPI({ oAuthAccessToken });
    return response;
  }
);

export const signup = createAsyncThunk(
  'auth/signupSuccess',
  async ({ email, password }) => {
    const response = await signupAPI({ email, password });
    return response;
  }
);

export const logout = createAsyncThunk('/auth/logoutSuccess', async () => {
  const res = await logoutAPI();
  return res;
});

const initialState = { isLogged: false || !!localStorage.getItem('accessToken') };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, { type, payload }) => {
      const { accessToken, refreshToken } = payload;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      history.push('/home');
      state.isLogged = true;
    },
    [login.rejected]: (_, { type, payload }) => {
      console.log(type, payload);
    },

    [signup.fulfilled]: (_, { payload }) => {
      console.log(payload);
      return payload;
    },
    [logout.fulfilled]: (state, { payload }) => {
      if (payload) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        state.isLogged = false;
      }
    }
  }
});

export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
