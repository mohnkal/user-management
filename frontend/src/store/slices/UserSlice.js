import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    addedUser:0
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updateTeam(state, action) {
            state.userTeam = action.payload;
        },
   
    },
});

export const {updateTeam} = userSlice.actions;
export default userSlice.reducer;