import { createSlice } from "@reduxjs/toolkit";

const initialState = {
//   fullName: "",
//   firstName: "",
//   lastName: "",
//   token: "",
//   id: "",
//   email: "",
//   phone: "",
//   address: "",
//   accountType: "",
//   currency: "",
//   gender: "",
//   username: "",
//   active: "",
//   verified: "",
//   accountBalance: "",
//   role: "rrrrr",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, {payload}) => {
        // console.log(payload, 'ogini')
        // console.log(state, 'state')
        // console.log(state.role, 'state2')
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based on those changes
    return state = {
        ...state,
        ...payload,
        fullName: `${payload.firstName} ${payload.lastName}`,
        isLoggedIn: true,
    }
    },
    updateUser: (state, {payload}) => {
    return state = {
        ...state,
        ...payload,
    }
    },
    logout: (state, {payload}) => {
      payload('/auth/login')
      return state = {};
      // return redirect("/auth/verify");
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

export const { loginUser, logout, updateUser } = userSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched


// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user;

export default userSlice.reducer;
