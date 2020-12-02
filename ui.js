/**
 * @file 插件配置
 * @author Lohoyo <824591872@qq.com>
 *
 */

module.exports = api => {
    if (process.env.SAN_CLI_UI_DEV) {
        api.registerAddon({
            id: 'san.widgets.client-addon.dev4',
            url: 'http://localhost:8894/index.js'
        });
    } else {
        api.registerAddon({
            id: 'san.widgets.color-converter.client-addon',
            path: 'san-cli-ui-widget-color-converter/dist'
        });
    }

    api.registerWidget({
        id: 'san.widgets.color-converter',
        title: 'san-cli-ui-widget-color-converter.title',
        description: 'san-cli-ui-widget-color-converter.description',
        icon: 'retweet',
        component: 'san.widgets.components.color-converter',
        minWidth: 2,
        minHeight: 1,
        maxWidth: 2,
        maxHeight: 1,
        maxCount: 1
    });
}
