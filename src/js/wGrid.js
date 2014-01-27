/**
 * wGrid Widget
 */

;
(function ($, window, document, undefined) {

    /**
     * Пример инициализации плагина
     *  <pre><code>
     * &lt;div class=&quot;js-grid-example-container&quot;&gt;&lt;/div&gt;
     $('.js-grid-example-container').wGrid({
         renderer: 'kendoui',
         columns: [
            {
                field: "id",
                title: "ID",
                sortable: true
            },
            {
                field: "firstName",
                title: "First Name",
                sortable: false
            }
         ],
        groupable: true,
        groupableMessage: "Переместите сюда колонки для группировки"
        dataSource: [
            {
                id: '1', firstName: 'Mike'
            },
            {
                id: '2', firstName: 'Helena'
            }
        ],
        sortable: true
    });
     </code></pre>
     *
     * @namespace wGrid
     * @property {object}  defaults                       - Настройки для wGrid.
     * @property {string}  defaults.renderer              - Движок рендеринга. Возможные значения: <br/>"kendoui" - за рендеринг отвечает библиотека Kendo UI, необходимо подключить саму библиотеку и стили
     * @property {object[]}  defaults.columns             - Массив объектов колонок. <br/> Объект колонки включает в себя следующие аттрибуты:
     * @property {string} defaults.columns.field          - Идентификатор колонки wGrid.
     * @property {string} defaults.columns.title          - Заголовок колонки wGrid.
     * @property {boolean} defaults.columns.sortable      - Разрешена ли сортировка конкретной колонки. Работает, только если разрешена сортировка всех колонок
     * @property {object[]}  defaults.dataSource          - Массив объектов данных. <br/> Объект данных включают в себя пары "ключ-значение", где ключами являются идентификаторы колонок.
     * @property {boolean}  defaults.sortable             - Разрешена ли сортировка всех колонок.
     * @property {boolean}  defaults.groupable            - Разрешена ли группировка по колонкам.
     * @property {string}  defaults.groupableMessage      - Сообщение, выводимое в пустой панели группировки колонок.
     * @property {boolean}  defaults.resizable            - Разрешено ли изменение размера колонок.

     */
    var pluginName = "wGrid",
        defaults = {
            renderer: "kendoui",
            columns: [],
            dataSource: [],
            sortable: true,
            groupable: true,
            groupableMessage: "Переместите сюда колонки для группировки",
            resizable: true
        };

    wGrid.prototype = {
        init: function () {
            switch (this.settings.renderer) {
                case 'kendoui':

                    if (this.settings.groupable) {
                        this.settings.groupable = {};
                        this.settings.groupable.messages = {};
                        this.settings.groupable.messages.empty = this.settings.groupableMessage;
                    }

                    $(this.element).kendoGrid(this.settings);
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
                $.data(this, "plugin_" + pluginName, new wGrid(this, options));
            }
        });
    };

    function wGrid(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
})(jQuery, window, document);


