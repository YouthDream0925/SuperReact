
import { lazy } from 'react';
import BlockDetail from '../BlcokDetail/BlockDetail';
import Blocks from './Blocks';

const BlocksConfig = {
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
    {
      path: '/blocks',
      component: Blocks,
    },
  ],
};

export default BlocksConfig;
