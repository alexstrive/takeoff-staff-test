import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from '@/store';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { router } from './routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App>
        <RouterProvider router={router}></RouterProvider>
      </App>
    </ReduxProvider>
  </React.StrictMode>
);
