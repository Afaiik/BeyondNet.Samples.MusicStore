"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var custom_error_1 = __importDefault(require("./custom.error"));
var NotAuthorizeError = /** @class */ (function (_super) {
    __extends(NotAuthorizeError, _super);
    function NotAuthorizeError() {
        var _this = _super.call(this, "Not authroized.") || this;
        _this.statusCode = 401;
        Object.setPrototypeOf(_this, NotAuthorizeError.prototype);
        return _this;
    }
    NotAuthorizeError.prototype.serializeErrors = function () {
        return [{ message: this.message }];
    };
    return NotAuthorizeError;
}(custom_error_1.default));
exports.default = NotAuthorizeError;
//# sourceMappingURL=not-authorize.error.js.map