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
            fields:[],
            actions: {},
            readonly: false
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
                    break;
                default:
                    console.error(pluginName + ': Не верно указан renderer');
                    break;
            }
        },
        clear: function(){},
        save: function(){},
        render: function(){},
        destroy: function(){},
        populate: function(formData){},
        validate: function(){},
        validateField: function(){},
        generateHTML: function(){},
        generateField: function(fieldSource){},
        readonly: function(){},
        readonlyField: function(fieldId){}
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
})(jQuery, window, document);


