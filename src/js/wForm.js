/**
 * wForm Widget
 */

;
(function ($, window, document, undefined) {

    /**
     * @namespace wForm
     * @property {object}  defaults                  - Настройки для wForm.
     * @property {string}  defaults.renderer         - Движок рендеринга. Возможные значения: <br/>'kendoui' - за рендеринг отвечает библиотека Kendo UI, необходимо подключить саму библиотеку и стили.
     * @property {string}  defaults.name             - Имя wForm.
     * @property {string}  defaults.url              - Url, куда отправлять данные, при submit'e wForm.
     * @property {object[]}  defaults.fields         - Массив объектов полей. <br/> Объект поля включает в себя следующие аттрибуты:
     * @property {string}  defaults.fields.name      - Имя поля. Передается на сервер
     * @property {string}  defaults.fields.type      - Тип поля. Возможны следующие значения:<br/>
     *                                                  text - текстовое поле,<br/>
     *                                                  password - поле для пароля,<br/>
     *                                                  email - поле для электронного адреса,<br/>
     *                                                  number - числовое поле,<br />
     *                                                  date - поле даты,<br />
     *                                                  time - поле времени,<br />
     *                                                  datetime - поле даты и времени,<br />
     *                                                  color - выбор цвета
     *
     * @property {boolean}  defaults.readonly        - wForm только в режиме просмотра.
     * @property {object[]}  defaults.actions        - Действия с wForm
     */
    var pluginName = 'wForm',
        defaults = {
            renderer: 'kendoui',
            name: 'wForm',
            url: '#',
            fields: [],
            actions: [],
            readonly: false,
            type: 'aligned'
        };

    wForm.prototype = {
        settings: {},
        init: function () {
            switch (this.settings.renderer) {
                case 'kendoui':
                    // Рендерим HTML-шаблон
                    this.generateHTML();

                    // Делаем форму красивой
                    this.prettify();

                    // Инициализируем поля
                    this.populateFields(this.settings.fields);

                    // Инициализируем кнопки
                    this.populateActions(this.settings.actions);
                    break;
                default:
                    console.error(pluginName + ': Неверно указан renderer');
                    break;
            }
        },
        clear: function () {
            for (var f = 0; f < this.settings.fields.length; f++) {
                wWidgets.field.prototype.update.call(this, this.settings.fields[f]);
            }
        },
        save: function () {
            console.log('item saved');
        },
        prettify: function () {
        },
        populateFields: function (fields) {
            for (var f = 0; f < fields.length; f++) {
                wWidgets.field.prototype.populate.call(this, fields[f]);
            }
        },
        populateActions: function (actions) {
            var self = this;

            for (var a = 0; a < actions.length; a++) {
                var action = actions[a],
                    defaults = {
                        enable: true,
                        icon: null,
                        imageUrl: null
                    };
                defaults = mergeExistingProperties(defaults, action);

                if (action.click == null) {
                    defaults.click = self.attachActionEvent(action);
                }

                var button = $(this.element)
                    .find('#' + action.name)
                    .kendoButton(defaults)
                    .data("kendoButton");

                if (action.click != null) {
                    (function(action) {
                        button.bind("click", function () {
                        action.click.call(wForm.prototype);
                    });
                    }(action));
                }
            }
        },
        validate: function () {
        },
        validateField: function () {
        },
        generateHTML: function () {
            var field,
                label,
                fieldSource,
                fieldContainer,
                form = $('<form></form>')
                    .addClass('wForm--' + this.settings.type)
                    .attr('action', this.settings.url)
                    .attr('id', this.settings.name)
                    .attr('name', this.settings.name);

            for (var f = 0; f < this.settings.fields.length; f++) {
                // Объект поля
                fieldSource = this.settings.fields[f];

                // HTML-поле
                field = this.generateField(fieldSource);
                // Контейнер для label и поля
                fieldContainer = $('<div></div>').addClass('wForm-field');

                // Label
                label = $('<label></label>')
                    .attr('for', fieldSource.name)
                    .text(fieldSource.caption)
                    .addClass('wForm-label');

                // Добавляем к DOM
                label.appendTo(fieldContainer);
                $(field).appendTo(fieldContainer);
                fieldContainer.appendTo(form);
            }

            if (this.settings.actions.length > 0) {
                var actionsContainer = $('<div></div>')
                    .addClass('wForm-actions');

                for (var a = 0; a < this.settings.actions.length; a++) {
                    var option = this.settings.actions[a],
                        template = this.generateActionHTML(option);
                    $(template).appendTo(actionsContainer)
                }
                actionsContainer.appendTo(form);
            }

            form.appendTo($(this.element));
        },
        generateActionHTML: function (actionSource) {
            return '<button id="' + actionSource.name + '" type="button">' + actionSource.caption + '</button>';
        },
        generateField: function (fieldSource) {
            if (fieldSource.type || fieldSource.name || fieldSource.id) {
                return wWidgets.field.prototype.generate.call(this, fieldSource.type, fieldSource.id, fieldSource.name);
            } else {
                console.error(pluginName + ': Не хватает данных для генерации поля');
            }
        },
        attachActionEvent: function (source) {
            var event = null;

            switch (source.name) {
                case 'save':
                    event = function () {
                        wForm.prototype.save();
                    }
                    break;
                case 'reset':
                    event = function () {
                        wForm.prototype.clear();
                    }
                    break;
                default:
                    event = function () {
                        console.error(pluginName + ': Для кнопки с таким именем событие не реализовано. Реализуйте сами');
                    }
                    break;
            }
            return event;
        },
        readonly: function () {
        },
        readonlyField: function (fieldId) {
        }
    };

    // Some kind of singleton
    $.fn[ pluginName ] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new wForm(this, options));
            }
        });
    };

    function wForm(element, options) {
        this.element = element;
        this.settings = wForm.prototype.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    wWidgets.form = wForm;
})(jQuery, window, document);


