module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};

// module.exports = {
//   presets: ['babel-preset-expo'],
//   plugins: ['react-native-reanimated/plugin'],
// };
