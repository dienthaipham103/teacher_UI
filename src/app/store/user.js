import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import { getUserChildAPI } from "app/api/user";

const initialState = { account: {}, child: [] };

// export const getChild = createAsyncThunk(
//   "user/getChildSuccess",
//   async ({ page, limit }) => {
//     const response = await getUserChildAPI({ page, limit });
//     return response;
//   }
// );

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  // extraReducers: {
  //   [getChild.fulfilled]: (state, { payload }) => {
  //     state.child = payload.data;
  //   }
  // }
});

export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
