;
(function ($, window, document, undefined) {
    var pluginName = "wField",
        defaults = {
            renderer: "kendoui"
        };

    wField.prototype = {
        populate: function (settings) {
            switch (this.settings.renderer) {
                case 'kendoui':
                    switch (settings.type) {
                        case 'text':
                            break;
                        case 'number':
                            var defaults = {
                                decimals: null,
                                format: 'n',
                                min: null,
                                max: null,
                                step: 1,
                                value: null
                            };
                            defaults = $.extend(true, defaults, settings);
                            $('#' + settings.name).kendoNumericTextBox(defaults);
                            break;
                    }
                    break;
                default:
                    console.error(pluginName + ': Неверно указан renderer');
                    break;
            }
        },
        clear: function () {
        },
        generate: function (type, id) {
            var template = null;

            switch (type) {
                case 'text':
                    template = '<input class="k-textbox" data-field-type="' + type + '" type="' + type + '" name="' + id + '" id="' + id + '">';
                    break;
                case 'number':
                    template = '<input data-field-type="' + type + '" type="' + type + '" name="' + id + '" id="' + id + '">';
                    break;
                default:
                    console.error(pluginName + ': Неверно указан тип поля');
                    break;
            }

            return template;
        }
    };

    // Some kind of singleton
    $.fn[ pluginName ] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new wField(this, options));
            }
        });
    };

    function wField(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
    }

    wWidgets.field = wField;
})(jQuery, window, document);

