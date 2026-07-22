const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Blocklist non-source directories to prevent Metro EMFILE open-files watcher errors
config.resolver.blocklist = [
  /node_modules\/.*\/node_modules/,
  /\.git\/.*/
];

module.exports = config;
