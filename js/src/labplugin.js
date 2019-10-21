const base = require('@jupyter-widgets/base');
const jupyterGraphql = require('./index');

module.exports = {
    id: 'jupyter-graphql',
    requires: [base.IJupyterWidgetRegistry],
    activate(app, widgets) {
        widgets.registerWidget({
            name: 'jupyter-graphql',
            version: jupyterGraphql.version,
            exports: jupyterGraphql,
        });
    },
    autoStart: true,
};
