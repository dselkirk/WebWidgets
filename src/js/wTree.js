
;
(function ($, window, document, undefined) {

    var pluginName = 'wTree',
        defaults = {

        };

    wTree.prototype = {
        init: function () {
            switch (this.settings.renderer) {
                case 'kendoui':

                    break;
                default:
                    console.error(pluginName + ': Неверно указан renderer');
                    break;
            }
        }
    };

    // Some kind of singleton
    $.fn[ pluginName ] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new wTree(this, options));
            }
        });
    };

    function wTree(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    wWidgets.tree = wTree;
})(jQuery, window, document);

