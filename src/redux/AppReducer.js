import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";


  
  const appSlider = createSlice({
    name : 'Orders',
    initialState : {
      number: 10,
      startDate : dayjs('2022-01-01'),
      endDate : dayjs(),
      isAscending : false,
      duration : null
    },
    reducers : {
      setNumber : (state, action) => {
        state.number = action.payload
      },
      setStartDate : (state, action) => {
        state.startDate = action.payload
      },
      setEndDate : (state, action) => {
        state.endDate = action.payload
      },
      setIsAscending : (state, action) => {
        state.isAscending = action.payload
      },
      setDuration : (state, action) => {
        state.duration = action.payload
      }
    }
  })

  
  export const { setNumber, setStartDate, setEndDate, setIsAscending, setDuration } = appSlider.actions;
  export default appSlider.reducer;