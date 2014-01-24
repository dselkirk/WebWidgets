/**
 * wForm Widget
 */

;
(function ($, window, document, undefined) {

    /**
     * @namespace wForm
     * @property {object}  defaults                  - Настройки для wForm.
     * @property {string}  defaults.renderer         - Движок рендеринга. Возможные значения: <br/>"kendoui" - за рендеринг отвечает библиотека Kendo UI, необходимо подключить саму библиотеку и стили.
     * @property {string}  defaults.name             - Имя wForm.
     * @property {string}  defaults.url              - Url, куда отправлять данные, при submit'e wForm.
     */
    var pluginName = "wForm",
        defaults = {
            renderer: "kendoui",
            name: 'wForm',
            url: '#'
        };

    wForm.prototype = {
        init: function () {
            switch (this.settings.renderer) {
                case 'kendoui':
                    break;
                default:
                    console.error('Не верно указан renderer');
                    break;
            }
        },
        validate: function(){},
        validateField: function(){},
        clear: function(){},
        save: function(){},
        generateHTML: function(){}
    };

    // Some king of singleton
    $.fn[ pluginName ] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new wForm(this, options));
            }
        });
    };

    function wForm(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
})(jQuery, window, document);


