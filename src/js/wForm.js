/**
* wForm Widget
*/

;
(function ($, window, document, undefined) {

    var pluginName = "wForm",
        defaults = {
            renderer: "custom"
        };

    wForm.prototype = {
        init: function () {
            switch (this.settings.renderer) {
                case 'custom':
                    break;
                default:
                    console.error('Не верно указан renderer');
                    break;
            }
        }
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


