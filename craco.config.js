const CracoLessPlugin = require("craco-less");

module.exports = {
  style: {
    css: {
      loaderOptions: (cssLoaderOptions, { env, paths }) => {
        return {
          ...cssLoaderOptions,
          modules: true,
        };
      },
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
