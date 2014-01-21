/**
 *  wGrid widget
 * */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function ($, window, document, undefined) {

    // Create the defaults once
    var pluginName = "wGrid",
        defaults = {
            renderer: "kendoui", // widget renderer library
            columns: [],
            dataSource: []
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

    // The actual plugin constructor
    function wGrid(element, options) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
})(jQuery, window, document);


