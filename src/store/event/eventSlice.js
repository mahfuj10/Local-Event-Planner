import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    event: [
      {
        title: 'Travel to Bangladesh',
        description:'Bangladesh is an',
        location:{
          lat:23,
          long:90,
          location:'Dhaka, Bangladesh'
        },
        time:'20:20',
        date:'2023-10-20',
        id: 'wyz_939_hss'
      }
    ],
  },
  reducers: {
    deleteEvent: (state, { payload }) => {
      state.event = state.event.filter(event => event.id !== payload);      
    },
    add: (state, payload) => {
      state.event.push(payload.payload);
      console.log(payload);
    },
  },
});

export const { deleteEvent, add } = eventSlice.actions;

export const selectEvent = (state) => state.event?.event;

export default eventSlice.reducer;
