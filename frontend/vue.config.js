module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    }
};
module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/scss/global.scss";`
            }
        }
    }
};