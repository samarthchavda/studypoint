import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  items: localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [],
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const course = action.payload;
      const index = state.items.findIndex((item) => item._id === course._id);
      if (index === -1) {
        state.total += course.price;
        state.totalItems += 1;
        state.items.push(course);
        localStorage.setItem("items", JSON.stringify(state.items));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

        toast.success("course added to cart");
      } else toast.error("course is already in  cart");
    },
    removeItem(state, action) {
      const course = action.payload;
      const index = state.items.findIndex((item) => item._id === course._id);
      if (index > -1) {
        state.total -= course.price;
        state.totalItems -= 1;
        state.items.splice(index, 1);
        localStorage.setItem("items", JSON.stringify(state.items));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

        toast.success("course removed from cart");
      } else toast.error("course is already removed from cart");
    },
    resetCart(state, action) {
      state.items = [];
      state.total = 0;
      state.totalItems = 0;
      localStorage.setItem("items", JSON.stringify(state.items));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },
  },
});

export const { addItem ,removeItem,resetCart} = cartSlice.actions;
export default cartSlice.reducer;