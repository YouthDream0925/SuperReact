
import Storeboard from './Storeboard';
import {authRoles} from '../../auth';


const StoreboardConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/storeboard',
      component: Storeboard,
    },
  ],
};

export default StoreboardConfig;
