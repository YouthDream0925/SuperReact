import Address from './Address';

const AddressConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/address/:hash',
      component: Address,
    },
  ],
};

export default AddressConfig;
