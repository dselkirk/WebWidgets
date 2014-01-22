/**
 * wGrid Widget
 */

;
/**
 * @namespace wGrid
 */
(function ($, window, document, undefined) {

    /**
     * @namespace wGrid
     * @property {object}  defaults                       - Настройки для wGrid.
     * @property {string}  defaults.renderer              - Движок рендеринга. Возможные значения: <br/>"kendoui" - за рендеринг отвечает библиотека Kendo UI, необходимо подключить саму библиотеку и стили
     * @property {Object[]}  defaults.columns             - Массив объектов колонок. <br/> Объект колонки включает в себя следующие поля:
     * @property {string} defaults.columns.field          - ID колонки wGrid.
     * @property {string} defaults.columns.title          - Заголовок колонки wGrid.
     * @property {boolean} defaults.columns.sortable      - Разрешена ли сортировка конкретной колонки. Работает, только если разрешена сортировка всех колонок
     * @property {Object[]}  defaults.dataSource          - Массив объектов данных. <br/> Объект данных включают в себя следующие поля:
     * @property {boolean}  defaults.sortable             - Разрешена ли сортировка всех колонок.
     */
    var pluginName = "wGrid",
        defaults = {
            renderer: "kendoui",
            columns: [],
            dataSource: [],
            sortable: true
        };

    wGrid.prototype = {
        init: function () {
            switch (this.settings.renderer) {
                case 'kendoui':
                    $(this.element).kendoGrid(this.settings);
                    break;
                default:
                    console.error('Не верно указан renderer');
                    break;
            }
        }
    };

    // Some king of singleton
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


