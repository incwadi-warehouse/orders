module.exports = {
  pwa: {
    workboxOptions: {
      importWorkboxFrom: 'local',
    },
    name: 'incwadi',
    themeColor: '#d7621d',
  },
  pluginOptions: {
    i18n: {
      locale: 'en-US',
      fallbackLocale: 'en-US',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: undefined,
    },
  },
  publicPath: process.env.VUE_APP_BASE_URL,
}
