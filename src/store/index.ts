import { configureStore } from '@reduxjs/toolkit';
import userReducer, { hydrateUser, mockUser, UserState } from './user.slice';
import contactsReducer from './contacts.slice';

export const store = configureStore({
  reducer: { user: userReducer, contacts: contactsReducer },
});

store.subscribe(() => {
  localStorage.setItem('user', JSON.stringify(store.getState().user));
});

function getCachedUserState() {
  const cachedUserState = localStorage.getItem('user');

  if (cachedUserState) {
    const parsedState: UserState = JSON.parse(cachedUserState);
    // in real app we need to check
    // whether token is still valid at the server
    if (parsedState.mockToken === mockUser.mockToken) {
      return parsedState;
    }
  }

  return false;
}

const userState = getCachedUserState();
if (userState) {
  store.dispatch(hydrateUser(userState));
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
