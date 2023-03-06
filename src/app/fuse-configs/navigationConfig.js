import i18next from 'i18next';
import { authRoles } from 'app/auth';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  // {
    // id: 'applications',
    // title: 'Applications',
    // translate: 'APPLICATIONS',
    // type: 'group',
    // icon: 'apps',
    // children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        translate: 'DASHBOARDS',
        type: 'item',
        icon: 'dashboard',
        url: '/dashoboard',
      },
      {
        id: 'store',
        title: 'Store',
        translate: 'STORE',
        type: 'item',
        icon: 'store',
        url: '/storeboard',
      },
      {
        id: 'orders',
        title: 'Orders',
        translate: 'ORDERS',
        type: 'item',
        icon: 'shopping_basket',
        url: '/e-commerce/orders',
      },
      {
        id: 'wallet',
        title: 'Wallet',
        translate: 'WALLET',
        type: 'item',
        icon: 'account_balance_wallet',
        url: '/wallet',
      }
    // ],
  // }
];

export default navigationConfig;
