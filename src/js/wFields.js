;
(function ($, window, document, undefined) {
    var pluginName = "wField",
        defaults = {
            renderer: "kendoui"
        };

    wField.prototype = {
        populate: function (form, settings) {
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
                            $('#' + form)
                                .find('#' + settings.name)
                                .kendoNumericTextBox(defaults);
                            break;
                        case 'date':
                            var defaults = {
                                format: 'dd/MM/yyyy',
                                min: new Date(1900, 0, 1),
                                max: new Date(2099, 11, 31),
                                start: 'month',
                                value: null
                            };
                            defaults = $.extend(true, defaults, settings);
                            $('#' + form)
                                .find('#' + settings.name)
                                .kendoDatePicker(defaults);
                            break;
                        case 'time':
                            var defaults = {
                                format: 'HH:mm',
                                interval: '30',
                                min: new Date(1900, 0, 1, 8, 0, 0),
                                max: new Date(2099, 0, 1, 22, 0, 0),
                                value: null
                            };
                            defaults = $.extend(true, defaults, settings);
                            $('#' + form)
                                .find('#' + settings.name)
                                .kendoTimePicker(defaults);
                            break;
                        case 'datetime':
                            var defaults = {
                                format: 'dd/MM/yyyy HH:mm',
                                timeFormat: 'HH:mm',
                                interval: '30',
                                min: new Date(1900, 0, 1, 8, 0, 0),
                                max: new Date(2099, 0, 1, 22, 0, 0),
                                value: null
                            };
                            defaults = $.extend(true, defaults, settings);
                            $('#' + form)
                                .find('#' + settings.name)
                                .kendoDateTimePicker(defaults);
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
                case 'date':
                case 'time':
                case 'datetime':
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
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new wField(this, options));
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

