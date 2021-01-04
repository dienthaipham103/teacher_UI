import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getAccountAPI } from "app/api/account";

const initialState = { info: {}, status: 'idle', error: null, firstLoading: true };

export const getAccount = createAsyncThunk(
  "account/getAccountSuccess",
  async () => {
    const response = await getAccountAPI();
    return response;
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    changeFirstLoading(state, action) {
      state.firstLoading = false;
    },
    changeUsername(state, action) {
      state.info.username = action.payload;
    }
  },
  extraReducers: {
    [getAccount.pending]: (state, { payload }) => {
      state.status = 'loading'
    },
    [getAccount.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded'
      state.info = payload.data;
    },
    [getAccount.rejected]: (state, { payload }) => {
      state.status = 'failed'
      // state.error = action.error.message
    }
  }
});

export const { changeFirstLoading, changeUsername } = accountSlice.actions;

export const selectAccount = state => state.account.info;
export const selectAccountStatus = state => state.account.status;

export default accountSlice.reducer;
