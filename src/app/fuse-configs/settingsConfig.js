const settingsConfig = {
  layout: {
    style: 'layout1', // layout1 layout2 layout3
    config: {
      toolbar: {
        display: true
      },
      footer: {
        display: false
      },
    }, // checkout default layout configs at app/fuse-layouts for example  app/fuse-layouts/layout1/Layout1Config.js
  },
  customScrollbars: true,
  direction: 'ltr', // rtl, ltr
  theme: {
    main: 'defaultDark',
    navbar: 'greyDark',
    toolbar: 'mainThemeDark',
    footer: 'mainThemeDark',
  },
};

export default settingsConfig;
