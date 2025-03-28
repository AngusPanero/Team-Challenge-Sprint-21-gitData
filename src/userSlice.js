import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    users: []
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
        }
    }
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;