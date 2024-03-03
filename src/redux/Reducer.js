import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
    number: 10,
    startDate : dayjs('2022-01-01'),
    endDate : dayjs()
  };
  
  const appSlider = createSlice({
    name : 'Orders',
    initialState : {
      number: 10,
      startDate : dayjs('2022-01-01'),
      endDate : dayjs()
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
      }
    }
  })

  
  export const { setNumber, setStartDate, setEndDate } = appSlider.actions;
  export default appSlider.reducer;