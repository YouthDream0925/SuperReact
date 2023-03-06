import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';

import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';

import ExploreConfig from 'app/main/Explorer/ExplorerConfig'
import HomeConfig from 'app/main/Home/HomeConfig';
import DashboardConfig from 'app/main/Dashboard/DashboardConfig';
import StoreboardConfig from 'app/main/Storeboard/StoreboardConfig';
import LoginPageConfig from 'app/main/login/LoginPageConfig';
import RegisterPageConfig from 'app/main/register/RegisterPageConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import ECommerceAppConfig from 'app/main/e-commerce/ECommerceAppConfig';

const routeConfigs = 
[
  ExploreConfig,
  HomeConfig,
  DashboardConfig,
  StoreboardConfig,
  LoginPageConfig,
  RegisterPageConfig,
  LogoutConfig,
  ECommerceAppConfig,
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: '/404',
    component: () => <Error404Page />,
  },
  {
    component: () => <Redirect to="/404" />,
  },
];

export default routes;
