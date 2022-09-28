import { RootState } from '@/store';
import { logout } from '@/store/user.slice';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';

export default function Account() {
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );
  let location = useLocation();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  if (!isAuthorized) {
    return <Navigate to="/" />;
  }

  if (location.pathname === '/account/') {
    return <Navigate to="contacts" />;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Contact App
          </Typography>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}
