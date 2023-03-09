
import GasTracker from './GasTracker';

const GasTrackerConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/gasTracker',
      component: GasTracker,
    },
  ],
};

export default GasTrackerConfig;
