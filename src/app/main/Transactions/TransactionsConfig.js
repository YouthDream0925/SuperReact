
import Transactions from './Transactions';

const TransactionsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/transactions',
      component: Transactions,
    },
  ],
};

export default TransactionsConfig;
