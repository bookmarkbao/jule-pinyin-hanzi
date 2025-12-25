module.exports = {
  plugins: {
    'postcss-px-to-viewport-8-plugin': {
      viewportWidth: 375,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.van-hairline'],
      minPixelValue: 1,
      mediaQuery: false,
      include: [/src/, /node_modules\/vant/],
    },
  },
};
