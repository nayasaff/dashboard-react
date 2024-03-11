import { configureStore } from '@reduxjs/toolkit';
import appReducer from './AppReducer';
import userReducer from './UserReducer';

const store = configureStore({
    reducer : {
        app : appReducer,
        users : userReducer
    }
  });

export default store;