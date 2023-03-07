import BlockDetail from './BlockDetail';

const BlockDetailConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/blocks/:blockId',
      component: BlockDetail,
    },
  ],
};

export default BlockDetailConfig;
