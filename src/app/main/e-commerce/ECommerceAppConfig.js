import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ECommerceAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/e-commerce/products/:productId/:productHandle?',
      component: lazy(() => import('./product/Product')),
    },
    {
      path: '/e-commerce/products',
      component: lazy(() => import('./products/Products')),
    },
    {
      path: '/e-commerce/orders/:orderId',
      component: lazy(() => import('./order/Order')),
    },
    {
      path: '/e-commerce/orders',
      component: lazy(() => import('./orders/Orders')),
    },
    {
      path: '/e-commerce',
      component: () => <Redirect to="/apps/e-commerce/products" />,
    },
  ],
};

export default ECommerceAppConfig;
