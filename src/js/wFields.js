;
(function ($, window, document, undefined) {
    var pluginName = "wField",
        defaults = {
            renderer: ""
        };

    wField.prototype = {
        init: function (selector, settings) {
            switch (this.settings.renderer) {
                case 'kendoui':
                    switch (settings.type) {
                        case 'text':
                            var defaults = {
                                name: '',
                                required: false,
                                caption: ''
                            }

                            this.options = $.extend({}, defaults, settings);
                            break;
                    }
                    break;
                default:
                    console.error(pluginName + ': Не верно указан renderer');
                    break;
            }
        },
        generate: function (type, id) {
            var template = null;

            switch (type) {
                case 'text':
                    template = '<input class="k-textbox" data-field-type="' + type + '" type="' + type + '" name="' + id + '" id="' + id + '">';
                    break;
                default:
                    console.error(pluginName + ': Не верно указан тип поля');
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
        this.init(element, options);
    }

    wWidgets.field = wField;
})(jQuery, window, document);

