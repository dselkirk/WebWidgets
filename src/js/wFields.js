;
(function ($, window, document, undefined) {
    var pluginName = "wField",
        defaults = {
            renderer: "kendoui"
        };

    wField.prototype = {
        populate: function (settings) {
            var form = $('#' + this.settings.name);

            switch (this.settings.renderer) {
                case 'kendoui':
                    switch (settings.type) {
                        case 'text':
                        case 'email':
                        case 'password':
                            var defaults = {
                                value: null
                            };
                            defaults = $.extend(true, defaults, settings);
                            form
                                .find('#' + settings.name)
                                .val(defaults.value)
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
                            form
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
                            form
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
                            form
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
                            form
                                .find('#' + settings.name)
                                .kendoDateTimePicker(defaults);
                            break;
                        case 'picker':
                            var defaults = {
                                    buttons: true,
                                    messages: {
                                        apply: "Обновить",
                                        cancel: "Отменить"
                                    },
                                    value: null
                                }
                                ;
                            defaults = $.extend(true, defaults, settings);
                            form
                                .find('#' + settings.name)
                                .kendoColorPicker(defaults);
                            break;
                    }
                    break;
                default:
                    console.error(pluginName + ': Неверно указан renderer');
                    break;
            }
        },
        update: function (settings, value) {
            var defValue = value != undefined ? value : null,
                form = $('#' + this.settings.name);

            switch (settings.type) {
                case 'text':
                case 'password':
                case 'email':
                    form
                        .find('#' + settings.name)
                        .val(defValue);
                    break;
                case 'number':
                    form
                        .find('#' + settings.name)
                        .data('kendoNumericTextBox')
                        .value(defValue);
                    break;
                case 'date':
                    form
                        .find('#' + settings.name)
                        .data('kendoDatePicker')
                        .value(defValue);
                    break;
                case 'time':
                    form
                        .find('#' + settings.name)
                        .data('kendoTimePicker')
                        .value(defValue);
                    break;
                case 'datetime':
                    form
                        .find('#' + settings.name)
                        .data('kendoDateTimePicker')
                        .value(defValue);
                    break;
                case 'color':
                    form
                        .find('#' + settings.name)
                        .data('kendoColorPicker')
                        .value(defValue);
                    break;
            }
        },
        generate: function (type, id) {
            var template = null;

            switch (type) {
                case 'text':
                case 'password':
                case 'email':
                    template = '<input class="k-textbox" data-field-type="' + type + '" type="' + type + '" name="' + id + '" id="' + id + '">';
                    break;
                case 'number':
                case 'date':
                case 'time':
                case 'datetime':
                case 'color':
                    template = '<input data-field-type="' + type + '" name="' + id + '" id="' + id + '">';
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
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new wField(this, options));
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

