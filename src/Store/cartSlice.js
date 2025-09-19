// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {
    // productId: { id, name, price, quantity, thumbnail }
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const existing = state.items[product.id];
      if (!existing) {
        state.items[product.id] = { ...product, quantity: 1 };
      }
      // if already exists, we are asked to disable Add after selecting,
      // so we don't auto-increment here (add behavior only when not present)
    },
    increaseItem: (state, action) => {
      const id = action.payload;
      if (state.items[id]) state.items[id].quantity += 1;
    },
    decreaseItem: (state, action) => {
      const id = action.payload;
      if (!state.items[id]) return;
      state.items[id].quantity -= 1;
      if (state.items[id].quantity <= 0) {
        delete state.items[id];
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      delete state.items[id];
    },
    clearCart: (state) => {
      state.items = {};
    }
  }
});

export const { addItem, increaseItem, decreaseItem, removeItem, clearCart } = cartSlice.actions;

export const selectCartItemsArray = (state) => Object.values(state.cart.items);

export const selectTotalCount = (state) =>
  Object.values(state.cart.items).reduce((sum, i) => sum + i.quantity, 0);

export const selectTotalPrice = (state) =>
  Object.values(state.cart.items).reduce((sum, i) => sum + i.quantity * i.price, 0);

export default cartSlice.reducer;
