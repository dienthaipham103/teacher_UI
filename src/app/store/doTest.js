import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Q1 from "assets/images/q1.png";
import Q2 from "assets/images/q2.png";

import { getTestAPI } from "app/api/doTest";

const initialState = {
    status: 'idle',
    allTest: 
        [
            {
                id: '5f8c46f96acf4b088c293dfc',
                data: {
                    testStatus: 'REGISTERED',
                    duration: 20,
                    remaining: 0,
                    total: 8, current: 1, finish: 0,
                    start: new Date(2020, 9, 18, 13, 55, 0, 0),
                    end: new Date(2020, 9, 18, 13, 59, 0, 0),
                    questions:
                        [
                            { image: 'https://wiiquiz.s3-ap-southeast-1.amazonaws.com/random/121465526_734092707146887_50571608537879281_n.png', number: 5, multiple: true },
                            { image: 'https://wiiquiz.s3-ap-southeast-1.amazonaws.com/random/121687869_2722988481363118_5156261255761536319_n.png', number: 4, multiple: true },
                            { image: 'https://wiiquiz.s3-ap-southeast-1.amazonaws.com/random/121792268_814256882671068_7460460419094529609_n.png', number: 3, multiple: false },
                            { image: 'https://wiiquiz.s3-ap-southeast-1.amazonaws.com/random/121810594_778396732705788_3352339647406267951_n.png', number: 5, multiple: true },
                            { image: 'https://wiiquiz.s3-ap-southeast-1.amazonaws.com/random/121813305_926426674548366_4672166165470831108_n.png', number: 2, multiple: false },
                            { image: 'https://wiiquiz.s3-ap-southeast-1.amazonaws.com/random/121821424_993458834487737_8035029409797976949_n.png', number: 5, multiple: false },
                            { image: 'https://wiiquiz.s3-ap-southeast-1.amazonaws.com/random/121966122_376936763351149_2761892260874199308_n.png', number: 3, multiple: true },
                            { image: 'https://wiiquiz.s3-ap-southeast-1.amazonaws.com/random/122018039_956961621481963_6485058152700708009_n.png', number: 4, multiple: true }
                        ],
                    answers:
                        [
                            [],
                            [],
                            [],
                            [],
                            [],
                            [],
                            [],
                            []
                        ]
                },
                status: 'idle',
            }
        ]
};

export const getTest = createAsyncThunk(
    "doTest/getTestSuccess",
    async id => {
        const response = await getTestAPI({ id: id });
        return response;
    }
);

// export const createNewStudent = createAsyncThunk(
//     "user/createNewStudentSuccess",
//     async ({ email, fullname }) => {
//         const response = await createNewStudentAPI({ email, fullname });
//         console.log(response)
//         return response;
//     }
// );

export const slice = createSlice({
    name: 'doTest',
    initialState,
    reducers: {
        increaseCurrent(state, action) {
            const total = state.allTest[action.payload.combinedId].total;
            const testId = action.payload.combinedId;
            const temp = state.allTest[testId].current + 1
            state.allTest[testId].current = temp > total ? 1 : temp;
        },
        decreaseCurrent(state, action) {
            const total = state.allTest[action.payload.combinedId].total;
            const testId = action.payload.combinedId;
            const temp = state.allTest[testId].current - 1
            state.allTest[testId].current = temp === 0 ? total : temp;
        },
        increaseFinish(state, action) {
            const testId = action.payload.combinedId;
            state.allTest[testId].finish += state.allTest[testId].finish;
        },
        decreaseFinish(state, action) {
            const testId = action.payload.combinedId;
            state.allTest[testId].finish -= state.allTest[testId].finish;
        },
        changeCurrent(state, action) {
            state.allTest[action.payload.combinedId].current = action.payload.value;
        },
        updateAnswer(state, action) {
            const testId = action.payload.combinedId;
            const current_ = action.payload.current;
            state.allTest[testId].answers[current_ - 1] = action.payload.value;
        },
        finishTest(state, action) {
            const testId = action.payload.combinedId;
            state.allTest[testId].testStatus = 'COMPLETED';
        }
    },
    extraReducers: {
        [getTest.pending]: (state, action) => {
            const combinedId = action.meta.arg;
            state.status = 'loading'

            let i = state.allTest.findIndex((x => x.id == combinedId));
            // if(i === -1){
            //     state.allTest.push({id: combinedId, data: {}, status: 'loading'})
            // }
            // else{
            // }
            
            console.log('PENDING', action.meta);
        },
        [getTest.fulfilled]: (state, action) => {
            state.status= 'succeeded'
            const combinedId = action.meta.arg;
           
            console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLll');
            let i = state.allTest.findIndex((x => x.id == combinedId));
          
            // if(i === -1){
            //     state.allTest.push({id: combinedId, data: {}, status: 'succeeded'})
            // }
            // else{
            //     state.allTest[i].status = 'succeeded';
            //     state.allTest[i].data = {
            //         duration: action.payload.data.duration,
            //         remaining: action.payload.data.remaining,
            //         start: action.payload.data.start,
            //         end: action.payload.data.end,
            //         total: action.payload.data.length,
            //         testStatus: action.payload.data.testStatus,
            //         questions: action.payload.data.questions,
            //         answers: action.payload.data.answers,
            //         current: 1
            //     }
            // }
        


            console.log('SUCCESS', action.payload);
        },
        [getTest.rejected]: (state, action) => {
            const combinedId = action.meta.arg;
            state.status = 'failed'
            let i = state.allTest.findIndex((x => x.id == combinedId));
            // if(i === -1){
            //     state.allTest.push({id: combinedId, data: {}, status: 'failed'})
            // }
            // else{
            // }
           
        }
    }
});

export const { changeCurrent, increaseCurrent, decreaseCurrent, updateAnswer, increaseFinish, decreaseFinish, finishTest } = slice.actions;

// export const selectAllStudent = state => state.student.studentList;

// export const selectKeyStatus = state => state.student.selectedKey;

// export const selectStudentById = (state, studentId) => 
// state.student.studentList.find(student => student._id == studentId);

// export const selectStudentById = (state, studentId) => 
// state.student.studentList.find(student => student._id == "5f51d23819ae66573a0cb01a");

export default slice.reducer;
