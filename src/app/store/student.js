import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getAllStudentAPI, createNewStudentAPI } from "app/api/user";

const initialState = {studentList: [], 
    status: 'idle', 
    error: null, 
    firstLoading: true, 
    studentPracticeStatus: '1'
};

export const getAllStudent = createAsyncThunk(
    "user/getAllStudentSuccess",
    async ({ page, limit }) => {
        const response = await getAllStudentAPI({ page, limit });
        return response;
    }
);


export const slice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        addStudent(state, action) {
            state.studentList.push(action.payload);
        },
        editStudent(state, action) {
            const data = action.payload.data;
            const studentId = action.payload.id;
            const i = state.studentList.findIndex(e => e._id == studentId);
            for (const key in data) {
                state.studentList[i][key] = data[key];
            }
        },
        deleteStudent(state, action) {
            const studentId = action.payload;
            state.studentList = state.studentList.filter(e => e._id != action.payload);
        },
        changeFirstLoading(state, action){
            state.firstLoading = false;
        },
        changeStudentPracticeStatus(state, action) {
            state.studentPracticeStatus = action.payload
        }
       
    },
    extraReducers: {
        [getAllStudent.pending]: (state, {payload}) => {
            state.status = 'loading'
        },
        [getAllStudent.fulfilled]: (state, {payload}) => {
            state.status = 'succeeded'
            state.studentList = payload.data;
        },
        [getAllStudent.rejected]: (state, {payload}) => {
            state.status = 'failed'
            // state.error = action.error.message
        }
    }
});

export const { addStudent, editStudent, deleteStudent, changeSelectedKey, changeFirstLoading, changeStudentPracticeStatus } = slice.actions;

export const selectAllStudent = state => state.student.studentList;


export default slice.reducer;