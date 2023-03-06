
import Storeboard from '../Storeboard/Storeboard';
import {authRoles} from '../../auth';

const DashboardConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/dashboard',
      component: Storeboard,
    },
  ],
};

export default DashboardConfig;
