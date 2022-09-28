import { createBrowserRouter, redirect } from 'react-router-dom';
import Contacts from '@/pages/Contacts';
import Index from '@/pages/Index';
import SignIn from '@/pages/SignIn';
import { store } from '@/store';
import { mockUser } from '@/store/user.slice';
import ContactViewer from '@/components/ContactViewer';
import Account from '@/pages/Account';

export const ROUTES = [
  {
    path: '',
    element: <Index />,
  },
  {
    path: 'sign-in',
    element: <SignIn />,
  },
  {
    path: 'account',
    loader: protectLoader,
    element: <Account />,
    children: [
      {
        path: 'contacts',
        element: <Contacts />,
        children: [
          {
            path: ':contactId',
            element: <ContactViewer />,
            errorElement: <div>Not found</div>,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(ROUTES);

function protectLoader() {
  const user = store.getState().user;

  if (user.mockToken !== mockUser.mockToken) {
    return redirect('/sign-in');
  }
}
