import { lazy } from 'react';
import {authRoles} from '../../auth';


const RegisterPageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false
        },
        footer: {
          display: false
        },
      },
    },
    theme: {
      main: 'default',
      navbar: 'greyDark',
      toolbar: 'mainThemeLight',
      footer: 'mainThemeDark',
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/register',
      component: lazy(() => import('./RegisterPage')),
    },
  ],
};

export default RegisterPageConfig;
