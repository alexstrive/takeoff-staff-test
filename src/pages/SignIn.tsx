import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { login, mockUser } from '@/store/user.slice';

function checkCredentials(login: string, password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // in real app:
    // fetch to the real API
    // return JWT token (success) or Error (fail to authonticate)
    setTimeout(() => {
      if (login === mockUser.login && password === mockUser.password) {
        resolve(mockUser.mockToken);
      } else {
        resolve('');
      }
    }, 1500); // 1.5s delay
  });
}

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );

  // redirect when person is authorized
  useEffect(() => {
    if (isAuthorized) {
      navigate('/account/contacts');
    }
  }, [isAuthorized]);

  const dispatch = useDispatch();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setIsLoading(true);
    const data = new FormData(e.currentTarget);
    const userLogin = data.get('login') as string;
    const userPassword = data.get('password') as string;
    const token = await checkCredentials(userLogin, userPassword);

    if (token) {
      dispatch(login({ login: userLogin, token }));
    } else {
      setError(true);
    }
    setIsLoading(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login"
            name="login"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          {error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Invalid login or password. Try alex | 1234
            </Alert>
          )}
          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}
