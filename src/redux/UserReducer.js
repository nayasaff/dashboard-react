import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : 'User',
    initialState : {
        users : [],
        vendors : []
    },
    reducers : {
        setUsers : (state, action) => {
        state.users = action.payload
        },
        updateUser : (state, action) => {
        state.users = state.users.map((u) => (u._id === action.payload._id ? action.payload : u))
        },
        deleteUser : (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload)
        },
        addUser : (state, action) => {
        state.users = [...state.users, action.payload]
        },
        setVendors : (state,action) =>{
            state.vendors = action.payload
        }
    }
})

export const {setUsers, updateUser, deleteUser, addUser, setVendors} = userSlice.actions;
export default userSlice.reducer;