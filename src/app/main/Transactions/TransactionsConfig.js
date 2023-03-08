
import TransactionDetail from '../TransactionDetail/TransactionDetail';
import Transactions from './Transactions';

const TransactionsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/transactions/:transactionId',
      component: TransactionDetail,
    },
    {
      path: '/transactions',
      component: Transactions,
    },
  ],
};

export default TransactionsConfig;
