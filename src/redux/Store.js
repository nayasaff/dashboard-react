import { configureStore } from '@reduxjs/toolkit';
import appReducer from './Reducer';

const store = configureStore({
    reducer: appReducer, 
  });

export default store;