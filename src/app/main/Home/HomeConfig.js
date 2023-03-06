import i18next from 'i18next';
import Home from './Home';
import {authRoles} from '../../auth';


const HomeConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false
        }
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/home',
      component: Home,
    },
  ],
};

export default HomeConfig;
