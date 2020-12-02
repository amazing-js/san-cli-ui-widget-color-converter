/**
 * @file 颜色转换器组件
 * @author Lohoyo <824591872@qq.com>
 */

import './color-converter.less';

export default {
    template: /* html */`
        <div class="color-converter">
            <div class="input-wrap">
                <s-input placeholder="16 进制颜色" value="{= hex =}" on-change="convertToRGB"></s-input>
                <s-tooltip title="复制成功" visible="{{isShowCopyHexTips}}" s-if="canCopy">
                    <s-icon type="copy" on-click="copyColor(hex, 'isShowCopyHexTips')"></s-icon>
                </s-tooltip>
            </div>
            <div class="input-wrap">
                <s-input placeholder="RGB 颜色" value="{= rgb =}" on-change="convertToHex"></s-input>
                <s-tooltip title="复制成功" visible="{{isShowCopyRGBTips}}" s-if="canCopy">
                    <s-icon type="copy" on-click="copyColor(rgb, 'isShowCopyRGBTips')"></s-icon>
                </s-tooltip>
            </div>
            <div class="preview" style="{{'background-color: ' + preview}}"></div>
        </div>
    `,

    initData() {
        return {
            hex: '',
            rgb: '',
            preview: '',
            isShowCopyHexTips: false,
            isShowCopyRGBTips: false,
            canCopy: false
        };
    },

    attached() {
        // 防止 locales.json 加载过慢，主动 set
        this.dispatch('Widget:title', this.$t(this.data.get('data.definition.title')));
        this.data.set('canCopy', window.isSecureContext);
    },

    convertToRGB(e) {
        let hex = e;
        if (hex[0] === '#') {
            hex = hex.slice(1);
        }
        if (!/^[A-fa-f0-9]{3}$|^[A-fa-f0-9]{6}$/.test(hex)) {
            this.data.set('rgb', '');
            return;
        }
        let rgb = '';
        for (let i = 0; i < 3; i++) {
            if (hex.length === 3) {
                rgb += parseInt(hex[i] + hex[i], 16) + ', ';
            } else {
                rgb += parseInt(hex[2 * i] + hex[2 * i + 1], 16) + ', ';
            }
        }
        rgb = 'rgb(' + rgb.slice(0, -2) + ')';
        this.data.set('rgb', rgb);
        this.data.set('preview', rgb);
    },

    convertToHex(e) {
        const rgbArray = e.match(/\d+/g);
        if (!rgbArray || rgbArray.length !== 3 || rgbArray.some(item => item > 255)) {
            this.data.set('hex', '');
            return;
        }
        let hex = '#';
        rgbArray.forEach(item => {
            const partHex = (+item).toString(16);
            hex += partHex.length === 1 ? ('0' + partHex) : partHex;
        });
        this.data.set('hex', hex);
        this.data.set('preview', hex);
    },

    async copyColor(color, variableName) {
        await navigator.clipboard.writeText(color);
        this.data.set(variableName, true);
        setTimeout(() => {
            this.data.set(variableName, false);
        }, 1000);
    }
};
