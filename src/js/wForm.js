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
     * @property {object[]}  defaults.fields         - Массив объектов полей. <br/> Объект поля включает в себя следующие аттрибуты:
     * @property {string}  defaults.fields.name      - Имя поля. Передается на сервер
     * @property {string}  defaults.fields.type      - Тип поля. Возможны следующие значения:<br/>
     *                                                  text - текстовое поле<br/>
     *
     * @property {boolean}  defaults.readonly        - wForm только в режиме просмотра.
     * @property {Object[]}  defaults.actions        - Действия с wForm
     */
    var pluginName = "wForm",
        defaults = {
            renderer: "kendoui",
            name: 'wForm',
            url: '#',
            fields: [],
            actions: {},
            readonly: false,
            type: 'aligned'
        },
        formType = {
            aligned: {

            },
            stacked: {}

        };

    wForm.prototype = {
        init: function () {
            switch (this.settings.renderer) {
                case 'kendoui':
                    this.generateHTML();
                    break;
                default:
                    console.error(pluginName + ': Не верно указан renderer');
                    break;
            }
        },
        clear: function () {
        },
        save: function () {
        },
        render: function () {
        },
        destroy: function () {
        },
        populate: function (formData) {
        },
        validate: function () {
        },
        validateField: function () {
        },
        generateHTML: function () {
            var field,
                label,
                fieldSource,
                form = $("<form></form>")
                    .addClass("wForm-" + this.settings.type)
                    .attr('name', this.settings.name);

            for (var f = 0; f < this.settings.fields.length; f++) {
                fieldSource = this.settings.fields[f];
                field = this.generateField(fieldSource);
                label = $("<label></label>").attr('for', fieldSource.name).text(fieldSource.caption);

                $(label).appendTo(form);
                $(field).appendTo(form);
            }

            form.appendTo(this.element);
        },
        generateField: function (fieldSource) {
            if (fieldSource.type || fieldSource.name) {
                return wWidgets.field.prototype.generate.call(this, fieldSource.type, fieldSource.name);
            } else {
                console.error(pluginName + ': Не хватает данных для генерации поля');
            }
        },
        readonly: function () {
        },
        readonlyField: function (fieldId) {
        }
    };

    // Some kind of singleton
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

    wWidgets.form = wForm;
})(jQuery, window, document);


