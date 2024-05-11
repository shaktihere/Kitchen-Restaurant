import { createSlice, current } from "@reduxjs/toolkit";
import React from "react";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      let a = 0;
      state.items.map((item) => {
        if (item.card.info.name === action.payload.card.info.name) {
          item.card.info.count++;
          a = 1;
          return;
        }
      });
      if (a == 0) {
        action.payload.card.info.count++;
        state.items.push(action.payload);
      }
      <div
        role={alert}
        className="relative block w-full p-4 mb-4 text-base leading-5 text-white bg-blue-500 rounded-lg opacity-100 font-regular"
      >
        An info alert for showing message.
      </div>;
    },
    removeItem: (state, action) => {
      state.items.map((item) => {
        if (item.card.info.name === action.payload.card.info.name) {
          if (item.card.info.count === 1) {
            state.items = state.items.filter(
              (item) => item.card.info.name !== action.payload.card.info.name
            );
            return;
          }
          item.card.info.count--;
          return;
        }
      });
    },
    clearCart: (state, action) => {
      state.items.length = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
