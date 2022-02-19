"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
var shallow_equal_object_1 = require("shallow-equal-object");
var ValueObject = /** @class */ (function () {
    function ValueObject(props) {
        this.props = Object.freeze(props);
    }
    ValueObject.prototype.equals = function (vo) {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.props === undefined) {
            return false;
        }
        return (0, shallow_equal_object_1.shallowEqual)(this.props, vo.props);
    };
    return ValueObject;
}());
exports.ValueObject = ValueObject;
