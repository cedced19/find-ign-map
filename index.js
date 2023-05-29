var inside = require('point-in-polygon');

var ign = require('./maps.json');

module.exports = function (point) {
    var result = []
    ign.forEach(function (el) {
        if(inside(point, el.coordinates)) {
            result.push(el);
        }
    });
    return result;
}