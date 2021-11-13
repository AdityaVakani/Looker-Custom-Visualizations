"use strict";
exports.__esModule = true;
exports.handleErrors = exports.formatType = void 0;
var d3 = require("d3");
var formatType = function (valueFormat) {
    if (!valueFormat)
        return undefined;
    var format = '';
    switch (valueFormat.charAt(0)) {
        case '$':
            format += '$';
            break;
        case '£':
            format += '£';
            break;
        case '€':
            format += '€';
            break;
    }
    if (valueFormat.indexOf(',') > -1) {
        format += ',';
    }
    var splitValueFormat = valueFormat.split('.');
    format += '.';
    format += splitValueFormat.length > 1 ? splitValueFormat[1].length : 0;
    switch (valueFormat.slice(-1)) {
        case '%':
            format += '%';
            break;
        case '0':
            format += 'f';
            break;
    }
    return d3.format(format);
};
exports.formatType = formatType;
var handleErrors = function (vis, res, options) {
    var check = function (group, noun, count, min, max) {
        if (!vis.addError || !vis.clearErrors)
            return false;
        if (count < min) {
            vis.addError({
                title: "Not Enough " + noun + "s",
                message: "This visualization requires " + (min === max ? 'exactly' : 'at least') + " " + min + " " + noun.toLowerCase() + (min === 1 ? '' : 's') + ".",
                group: group
            });
            return false;
        }
        if (count > max) {
            vis.addError({
                title: "Too Many " + noun + "s",
                message: "This visualization requires " + (min === max ? 'exactly' : 'no more than') + " " + max + " " + noun.toLowerCase() + (min === 1 ? '' : 's') + ".",
                group: group
            });
            return false;
        }
        vis.clearErrors(group);
        return true;
    };
    var _a = res.fields, pivots = _a.pivots, dimensions = _a.dimensions, measures = _a.measure_like;
    return (check('pivot-req', 'Pivot', pivots.length, options.min_pivots, options.max_pivots)
        && check('dim-req', 'Dimension', dimensions.length, options.min_dimensions, options.max_dimensions)
        && check('mes-req', 'Measure', measures.length, options.min_measures, options.max_measures));
};
exports.handleErrors = handleErrors;
