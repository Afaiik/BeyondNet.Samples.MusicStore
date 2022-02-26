"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = void 0;
var isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
exports.isNumber = isNumber;
//# sourceMappingURL=isNumber.js.map