;
(function ($, window, document, undefined) {
    var pluginName = "wField",
        defaults = {
            renderer: "kendoui"
        };

    wField.prototype = {
        populate: function (settings) {
            var form = $('#' + this.settings.name),
                element =  form.find('#' + settings.id);
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
                            element.val(defaults.value);
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
                            element.kendoNumericTextBox(defaults);
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
                            element.kendoDatePicker(defaults);
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
                            element.kendoTimePicker(defaults);
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
                            element.kendoDateTimePicker(defaults);
                            break;
                        case 'color':
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
                            element.kendoColorPicker(defaults);
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
                form = $('#' + this.settings.name),
                element =  form.find('#' + settings.id);

            switch (settings.type) {
                case 'text':
                case 'password':
                case 'email':
                    element.val(defValue);
                    break;
                case 'number':
                    element
                        .data('kendoNumericTextBox')
                        .value(defValue);
                    break;
                case 'date':
                    element
                        .data('kendoDatePicker')
                        .value(defValue);
                    break;
                case 'time':
                    element
                        .data('kendoTimePicker')
                        .value(defValue);
                    break;
                case 'datetime':
                    element
                        .data('kendoDateTimePicker')
                        .value(defValue);
                    break;
                case 'color':
                    element
                        .data('kendoColorPicker')
                        .value(defValue);
                    break;
            }
        },
        generate: function (type, id, name) {
            var template = null;

            switch (type) {
                case 'text':
                case 'password':
                case 'email':
                    template = '<input class="k-textbox" data-field-type="' + type + '" type="' + type + '" name="' + name + '" id="' + id + '">';
                    break;
                case 'number':
                case 'date':
                case 'time':
                case 'datetime':
                case 'color':
                    template = '<input data-field-type="' + type + '" type="' + type + '" name="' + name + '" id="' + id + '">';
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

