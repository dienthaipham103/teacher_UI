import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getListQuizAPI, getNotRegisterChildAPI } from "app/api/quiz";

const initialState = { quizList: [], status: 'idle', notRegisterChild: {}, status1: 'idle', currentNumOfReg: 0 };

export const getQuizzes = createAsyncThunk(
  "quizzes/getQuizzesSuccess",
  async ({ page = 1, limit = 10 }) => {
    const response = await getListQuizAPI({ page, limit });
    return response;
  }
);

export const getNotRegisterChild = createAsyncThunk(
  "quizzes/getNotRegisterChildSuccess",
  async () => {
    const response = await getNotRegisterChildAPI();
    return response;
  }
);

const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    register(state, action) {
      const quizId = action.payload.quizId;
      const childList = action.payload.childList;
      console.log('++++++++++++++++++++++');
      state.notRegisterChild[quizId] = state.notRegisterChild[quizId].filter(e => !(childList.includes(e._id)));
      console.log('+++++++++++++');
    },
    updateNotRegisterByAddStudent(state, action) {
      const student = action.payload;
      console.log('++++++++++++++++++++++');
      for (let k in state.notRegisterChild) {
        state.notRegisterChild[k].push(student);
      }
      console.log('+++++++++++++');
    },
    updateNotRegisterByRemoveStudent(state, action) {
      const studentId = action.payload.studentId;
      console.log('++++++++++++++++++++++');
      for (let k in state.notRegisterChild) {
        state.notRegisterChild[k] = state.notRegisterChild[k].filter(e => e._id !== studentId);
      }
      console.log('+++++++++++++');
    },
    initialCurrentNumOfReg(state, action) {
      state.currentNumOfReg = action.payload
    },
    changeCurrentNumOfReg(state, action) {
      state.currentNumOfReg = state.currentNumOfReg + action.payload
    }
  },
  extraReducers: {
    [getQuizzes.pending]: (state, { payload }) => {
      state.status = 'loading'
    },
    [getQuizzes.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      state.quizList = payload.data;
    },
    [getQuizzes.rejected]: (state, { payload }) => {
      state.status = 'failed'
      // state.error = action.error.message
    },
    [getNotRegisterChild.pending]: (state, { payload }) => {
      state.status1 = 'loading'
    },
    [getNotRegisterChild.fulfilled]: (state, { payload }) => {
      state.status1 = 'succeeded';
      state.notRegisterChild = payload.data;
    },
    [getNotRegisterChild.rejected]: (state, { payload }) => {
      state.status1 = 'failed'
      // state.error = action.error.message
    }
  }
});

export const { register, updateNotRegisterByAddStudent, updateNotRegisterByRemoveStudent, changeCurrentNumOfReg, initialCurrentNumOfReg } = quizSlice.actions;

export const selectAllQuiz = state => state.quizzes.quizList;
export const selectNotRegisterChild = state => state.quizzes.notRegisterChild;

// other purpose
export const selectCurrentNumOfReg = state => state.quizzes.currentNumOfReg;

export default quizSlice.reducer;
