import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';

import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';

import ExploreConfig from 'app/main/Explorer/ExplorerConfig';
import BlocksConfig from 'app/main/Blocks/BlocksConfig';
import TransactionsConfig from 'app/main/Transactions/TransactionsConfig';
import AddressConfig from 'app/main/Address/AddressConfig';
import LoginPageConfig from 'app/main/login/LoginPageConfig';
import RegisterPageConfig from 'app/main/register/RegisterPageConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';

const routeConfigs = 
[
  ExploreConfig,
  BlocksConfig,
  TransactionsConfig,
  AddressConfig,
  LoginPageConfig,
  RegisterPageConfig,
  LogoutConfig
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
