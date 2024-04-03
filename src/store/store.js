import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import eventReducer from './event/eventSlice';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    event: eventReducer,
    auth: authReducer
  },
});
