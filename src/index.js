/**
 * @file 入口文件
 * @author Lohoyo <824591872@qq.com>
 *
 */

import ColorConverter from './components/color-converter';
import locales from './locales.json';

/* global ClientAddonApi */
if (window.ClientAddonApi) {
    ClientAddonApi.addLocales(locales);
    ClientAddonApi.defineComponent('san.widgets.components.color-converter', ColorConverter);
}
