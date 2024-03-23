import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const updatedItems = [...state.cart.cartItems];
      const existingItem = updatedItems.find(
        (item) => item._id === newItem._id
      );
      existingItem
        ? (existingItem.quantity = newItem.quantity)
        : updatedItems.push(newItem);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedItems,
        },
      };
    case "CART_DELETE_ITEM":
      const deleteItem = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: deleteItem,
        },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
