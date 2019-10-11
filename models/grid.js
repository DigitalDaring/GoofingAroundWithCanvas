"use strict";
exports.__esModule = true;
var Grid = /** @class */ (function () {
    function Grid() {
    }
    Grid.generate = function (width, height, spacing) {
        var allDots = [];
        var allConnectors = [];
        for (var x = 0; x < width; x += spacing) {
            for (var y = 0; y < height; y += spacing) {
                var newCoord = {
                    x: x,
                    y: y
                };
                var newDot = {
                    anchor: newCoord,
                    location: newCoord,
                    destination: newCoord
                };
                allDots = allDots.concat([newDot]);
            }
        }
        return {
            dots: allDots,
            connectors: allConnectors
        };
    };
    return Grid;
}());
exports.Grid = Grid;
