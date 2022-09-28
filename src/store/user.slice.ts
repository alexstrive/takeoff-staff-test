import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  login?: string;
  isAuthorized: boolean;
  mockToken?: string;
}

export const initialUserState: UserState = {
  isAuthorized: false,
};

export const mockUser = {
  login: 'alex',
  password: '1234',
  mockToken: 'MOCK_TOKEN',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    hydrate: (_state, action) => {
      return action.payload;
    },
    login: (state, action: PayloadAction<{ login: string; token: string }>) => {
      state.login = action.payload.login;
      state.mockToken = action.payload.token;
      state.isAuthorized = true;
    },
    logout: (state) => {
      state.login = undefined;
      state.mockToken = undefined;
      state.isAuthorized = false;
    },
  },
});

export const { login, logout, hydrate: hydrateUser } = userSlice.actions;

export default userSlice.reducer;
