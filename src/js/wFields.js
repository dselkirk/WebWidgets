;
(function ($, window, document, undefined) {
    var pluginName = 'wField',
        defaults = {
            renderer: 'kendoui'
        },
        kendoMapping = {
            number: 'kendoNumericTextBox',
            date: 'kendoDatePicker',
            time: 'kendoTimePicker',
            datetime: 'kendoDateTimePicker',
            color: 'kendoColorPicker'
        };

    wField.prototype = {
        populate: function (settings) {
            var form = $('#' + this.settings.name),
                element = form.find('#' + settings.id);

            switch (this.settings.renderer) {
                case 'kendoui':
                    switch (settings.type) {
                        case 'text':
                        case 'email':
                        case 'password':
                            var defaults = {
                                value: null,
                                placeholder: '',
                                required: false
                            };
                            defaults = mergeExistingProperties(defaults, settings);
                            element.attr('placeholder', defaults.placeholder);

                            if (defaults.required) {
                                element.attr('required', defaults.required);
                            }
                            element.val(defaults.value);
                            break;
                        case 'number':
                            var defaults = {
                                decimals: null,
                                format: 'n',
                                min: null,
                                max: null,
                                step: 1,
                                value: null,
                                placeholder: '',
                                required: false
                            };
                            defaults = mergeExistingProperties(defaults, settings);
                            element.attr('placeholder', defaults.placeholder);
                            if (defaults.required) {
                                element.attr('required', defaults.required);
                            }
                            element.kendoNumericTextBox(defaults);
                            break;
                        case 'date':
                            var defaults = {
                                format: 'dd/MM/yyyy',
                                min: new Date(1900, 0, 1),
                                max: new Date(2099, 11, 31),
                                start: 'month',
                                value: null,
                                placeholder: '',
                                required: false
                            };
                            defaults = mergeExistingProperties(defaults, settings);
                            if (settings.value) {
                                defaults.value = new Date(settings.value);
                            }
                            element.attr('placeholder', defaults.placeholder);
                            if (defaults.required) {
                                element.attr('required', defaults.required);
                            }
                            element.kendoDatePicker(defaults);
                            break;
                        case 'time':
                            var defaults = {
                                format: 'HH:mm',
                                interval: '30',
                                min: new Date(1900, 0, 1, 8, 0, 0),
                                max: new Date(2099, 0, 1, 22, 0, 0),
                                value: null,
                                placeholder: '',
                                required: false
                            };
                            defaults = mergeExistingProperties(defaults, settings);
                            if (settings.value) {
                                defaults.value = new Date(settings.value);
                            }
                            element.attr('placeholder', defaults.placeholder);
                            if (defaults.required) {
                                element.attr('required', defaults.required);
                            }
                            element.kendoTimePicker(defaults);
                            break;
                        case 'datetime':
                            var defaults = {
                                format: 'dd/MM/yyyy HH:mm',
                                timeFormat: 'HH:mm',
                                interval: '30',
                                min: new Date(1900, 0, 1, 8, 0, 0),
                                max: new Date(2099, 0, 1, 22, 0, 0),
                                value: null,
                                placeholder: '',
                                required: false
                            };
                            defaults = mergeExistingProperties(defaults, settings);
                            if (settings.value) {
                                defaults.value = new Date(settings.value);
                            }
                            element.attr('placeholder', defaults.placeholder);
                            if (defaults.required) {
                                element.attr('required', defaults.required);
                            }
                            element.kendoDateTimePicker(defaults);
                            break;
                        case 'color':
                            var defaults = {
                                buttons: true,
                                messages: {
                                    apply: "Обновить",
                                    cancel: "Отменить"
                                },
                                value: null,
                                placeholder: '',
                                required: false
                            };
                            defaults = mergeExistingProperties(defaults, settings);
                            element.attr('placeholder', defaults.placeholder);
                            if (defaults.required) {
                                element.attr('required', defaults.required);
                            }
                            element.kendoColorPicker(defaults);
                            break;
                    }
                    break;
                default:
                    console.error(pluginName + ': Неверно указан renderer');
                    break;
            }
        },
        attachEvents: function (field) {
            var form = $('#' + this.settings.name),
                element = form.find('#' + field.id);

            if (field.events) {
                for (var e = 0; e < field.events.length; e++) {
                    var event = field.events[e];
                    switch (field.type) {
                        case 'text':
                        case 'password':
                        case 'email':
                            element.on(event.name, function () {
                                event.action.call(this);
                            })
                            break;
                        case 'number':
                        case 'date':
                        case 'time':
                        case 'datetime':
                        case 'color':
                            element
                                .data(kendoMapping[field.type])
                                .bind(event.name, function () {
                                    event.action.call(this);
                                })
                            break;
                        default:
                            console.error(pluginName + ': Неверно указан тип поля');
                            break;
                    }
                }
            }
        },
        update: function (settings, value) {
            var defValue = value != undefined ? value : null,
                form = $('#' + this.settings.name),
                element = form.find('#' + settings.id);

            switch (settings.type) {
                case 'text':
                case 'password':
                case 'email':
                    element.val(defValue);
                    break;
                case 'number':
                case 'date':
                case 'time':
                case 'datetime':
                case 'color':
                    element
                        .data(kendoMapping[settings.type])
                        .value(defValue);
                    break;
            }
        },
        generate: function (fieldSource) {
            var template = null;

            switch (fieldSource.type) {
                case 'text':
                case 'password':
                case 'email':
                    template = '<input class="k-textbox" data-field-type="' + fieldSource.type + '" type="' + fieldSource.type + '" name="' + fieldSource.name + '" id="' + fieldSource.id + '">';
                    break;
                case 'number':
                case 'date':
                case 'time':
                case 'datetime':
                case 'color':
                    template = '<input data-field-type="' + fieldSource.type + '" type="' + fieldSource.type + '" name="' + fieldSource.name + '" id="' + fieldSource.id + '">';
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

