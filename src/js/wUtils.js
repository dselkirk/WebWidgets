var wWidgets = wWidgets || {};

// merge only existing properties in javascript objects
var mergeExistingProperties = function mergeExistingProperties(a, b) {
    for (var i in b) {
        if (a.hasOwnProperty(i)) {
            if (typeof a[i] == 'object' && typeof b[i]== 'object')
                mergeExistingProperties(a[i], b[i]);
            else
                a[i] = b[i]
        }
    }
    return a;
};