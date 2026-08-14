import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ACCESS_ENUM from "../access/accessEnum";

export const DEFAULT_USER: API.UserVO = {
  userName: "未登录",
  userAvatar: "",
  userProfile: "暂无简介",
  userRole: ACCESS_ENUM.NOT_LOGIN,
};

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: DEFAULT_USER,
  reducers: {
    setLoginUser: (state, action: PayloadAction<API.UserVO>) => {
      return {
        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoginUser } = loginUserSlice.actions;

export default loginUserSlice.reducer;
