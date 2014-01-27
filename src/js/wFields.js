;
(function ($, window, document, undefined) {

    var pluginName = "wFields",
        defaults = {
            renderer: ""
        };

    wFields.prototype = {
        initField: function (selector, settings) {
            switch (this.settings.renderer) {
                case 'kendoui':
                    switch (settings.type) {
                        case 'text':
                            var defaults = {
                                name: '',
                                required: false
                            }
                            break;
                    }
                    break;
                default:
                    console.error(pluginName + ': Не верно указан renderer');
                    break;
            }
        }
    };

    // Some kind of singleton
    $.fn[ pluginName ] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new wFields(this, options));
            }
        });
    };

    function wFields(element, options) {
        this.element = element;
        this._defaults = defaults;
        this._name = pluginName;
        this.initField(element, options);
    }
})(jQuery, window, document);

