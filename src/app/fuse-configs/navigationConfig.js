import i18next from 'i18next';
import { authRoles } from 'app/auth';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'store',
    title: 'EXPLORER',
    translate: 'BLOCK EXPLORER',
    type: 'item',
    icon: 'store',
    url: '/explorer',
  },
];

export default navigationConfig;
