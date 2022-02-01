const path = require('path');

// module.exports = {
//     server: {
//         proxy: {
//             '/api': {
//                 target: process.env.PORT
//             }
//         }
//     },
// };


module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    }
};