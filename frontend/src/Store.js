import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  cart: {
    shoppingAddress: localStorage.getItem("shoppingAddress")
      ? JSON.parse(localStorage.getItem("shoppingAddress"))
      : {},
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
    case "USER_LOGIN":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shoppingAddress: [] },
      };
    case "SAVE_ADD_ADDRESS":
      return {
        ...state,
        cart: { ...state.cart, shoppingAddress: action.payload },
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
