/* config-overrides.js */

module.exports = function override(config, env) {
    //do stuff with the webpack config...

    // js in single file
    // config.optimization.splitChunks = {
    //     cacheGroups: {
    //         default: false,
    //     },
    // }
    // config.optimization.runtimeChunk = false

    return config;
}