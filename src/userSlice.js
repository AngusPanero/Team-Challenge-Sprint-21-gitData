import { createSlice } from "@reduxjs/toolkit"; 

const downloadUsersLocal = () => {
    const savedUsers = localStorage.getItem("users")
    return savedUsers ? JSON.parse(savedUsers) : []
}

const saveLocalStage = (users) => {
    const savedUser = localStorage.setItem("users", JSON.stringify(users))
}

const initialState = {
    users: downloadUsersLocal()
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
            saveLocalStage(state.users)
        },
        removeUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
            saveLocalStage(state.users)
        }
    }
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;