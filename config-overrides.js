const { override } = require("customize-cra");

module.exports = override((config) => {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    vm: require.resolve("vm-browserify"),
    process: require.resolve("process/browser.js"),
    buffer: require.resolve("buffer/"),
  };
  // Find and modify the existing DefinePlugin
  const definePlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === "DefinePlugin"
  );
  if (definePlugin) {
    definePlugin.definitions["process.env"] = JSON.stringify({
      ...process.env,
      REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL,
      REACT_APP_TEST_VAR: process.env.REACT_APP_TEST_VAR,
    });
  }
  return config;
});