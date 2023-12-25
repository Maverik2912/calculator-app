const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@client': path.resolve(process.cwd()),
            '@src': path.resolve(process.cwd(), 'src'),
            '@App': path.resolve(process.cwd(), 'App'),
            '@common-enums': path.resolve(process.cwd(), 'src', 'common-enums', 'index'),
            '@common-interfaces': path.resolve(process.cwd(), 'src', 'common-interfaces', 'index'),
            '@modules': path.resolve(process.cwd(), 'src', 'modules', 'index'),
        },
    },
};